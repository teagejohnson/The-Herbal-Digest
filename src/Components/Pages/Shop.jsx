import {useEffect, useRef, useState} from 'react';
import {InView} from 'react-intersection-observer';
import {Fade} from 'react-awesome-reveal';
import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';

import {AppBar, Box, Button, Checkbox, FormControlLabel, Menu, MenuItem, TextField, Typography} from '@mui/material';
import {Close, FilterAltOutlined, SearchOutlined, Sort} from '@mui/icons-material';

import {doc, getDoc, onSnapshot, updateDoc} from 'firebase/firestore';

import db from '../../firebase.js';


const Shop = () => {
    const refFilter = useRef();
    const refSort = useRef();

    const width = useState(window.innerWidth)[0];
    const height = useState(window.innerHeight)[0];

    const [data, setData] = useState('loading');
    const [clicks, setClicks] = useState('loading');

    const [line, setLine] = useState(false);
    const [position, setPosition] = useState(0);

    const [openFilter, setOpenFilter] = useState(false);
    const [openSort, setOpenSort] = useState(false);

    const [filter, setFilter] = useState({'All': 0});
    const [search, setSearch] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [sort, setSort] = useState('popular');
    
    const handleOpenFilter = (event) => {
        event.preventDefault();

        setOpenFilter(true);
    };

    const handleOpenSort = (event) => {
        event.preventDefault();

        setOpenSort(true);
    };

    const handleCloseFilter = (event) => {
        event.preventDefault();

        setOpenFilter(false);
    };

    const handleCloseSearch = (event) => {
        event.preventDefault();

        setSearch('');
        setSearchValue('');
    };

    const handleCloseSort = (event) => {
        event.preventDefault();

        setOpenSort(false);
    };

    const handleClickFilter = (event, filter_key) => {
        event.preventDefault();

        var filter_new = {};

        if (filter_key === 'All') {
            if (filter['All'] === Object.keys(filter).length - 1) {
                Object.keys(filter).map((key, index) => (
                    filter_new[key] = false
                ));
            }
            
            else {
                Object.keys(filter).map((key, index) => (
                    filter_new[key] = true
                ));
            }
            
        }

        else {
            Object.entries(filter).map((i, index) => (
                i[0] === filter_key ?
                    filter_new[i[0]] = !i[1]
                :
                    filter_new[i[0]] = i[1]
            ));      
        }

        filter_new['All'] = 0;

        Object.entries(filter_new).map((i, index) => (
            i[0] !== 'All' ?
                filter_new['All'] += i[1]
            :
                null
        ));

        setFilter(filter_new);
    };

    const handleClickLink = async (event, key, href_block) => {
        event.preventDefault();

        var value = await (await getDoc(doc(db, 'clicks', 'count'))).data()[key] + 1;

        if (isNaN(value)) {
            value = 1;
        }

        await updateDoc(doc(db, 'clicks', 'count'), {[key]: value});

        const href = href_block.split('href="')[1].split('"')[0];

        window.open(href, '_blank');
    };

    const handleClickSearch = (event) => {
        event.preventDefault();

        setSearch(searchValue);
        
        Object.entries(data).map((i) => (
            i[1].categories.map((j) => (
                filter[j] = true
            ))
        ))

        filter['All'] = Object.keys(filter).length - 1;

        setSort('popular');
    };

    const handleClickSort = (event, sort_type) => {
        event.preventDefault();

        if (sort_type === 'popular') {
            setSort('popular');
        }

        else if (sort_type === 'az') {
            setSort('az');
        }

        else {
            setSort('za');
        }

        setOpenSort(false);
    };

    const handleFilter = (item) => {
        return item[1].categories.filter(x => Object.keys(filter).filter(key => filter[key]).includes(x)).length > 0;
    };

    const handleSearch = (item) => {
        const phrases = item[1].tags.concat(item[1].title, item[1].brand);

        var keywords = [];

        phrases.map((i) => (
            i.split(' ').map((j) => (
                keywords.push(j.trim().toLowerCase())
            ))
        ));

        var search_phrase = [];
        
        search.split(' ').map((i) => (
            search_phrase.push(i.trim().toLowerCase())
        ));

        return search_phrase.filter(x => keywords.includes(x)).length === search_phrase.length;
    };

    const handleFilterSearch = (item) => {
        if (search === '') {
            if (filter['All'] === Object.keys(filter).length - 1) {
                return true;
            }

            else {
                return handleFilter(item);
            }
        }

        else {
            if (filter['All'] === Object.keys(filter).length - 1) {
                return handleSearch(item);
            }

            else {
                return handleSearch(item) && handleFilter(item);
            }
        }

    };

    const handleSortPopular = (a, b) => {
        var a_clicks = clicks[a[0]];
        var b_clicks = clicks[b[0]];

        if (isNaN(a_clicks)) {
            a_clicks = 0;
        }

        if (isNaN(b_clicks)) {
            b_clicks = 0;
        }

        if (a_clicks < b_clicks) {
            return 1;
         }
         
        else if (a_clicks > b_clicks) {
            return -1;
        }

        else {
            return handleSortAz(a, b)
        }
    };

    const handleSortAz = (a, b) => {
        if (a[1].title > b[1].title) {
            return 1;
         }
         
        else if (a[1].title < b[1].title) {
            return -1;
        }

        else {
            return 0;
        }
    };

    const handleSortZa = (a, b) => {
        if (a[1].title < b[1].title) {
            return 1;
         }
         
        else if (a[1].title > b[1].title) {
            return -1;
        }

        else {
            return 0;
        }
    };

    const handleSort = (a, b) => {
        if (sort === 'popular') {
            return handleSortPopular(a, b);
        }
            
        else if (sort === 'az') {
            return handleSortAz(a, b);
        }
        
        else {
            return handleSortZa(a, b);
        }
    };

    const handlePositionY = () => {
        setPosition(window.scrollY);
    };
    
    useEffect(() => {
        window.scrollTo({top: 0});
        
        window.addEventListener("scroll", handlePositionY);

        onSnapshot(doc(db, 'glossary', 'shop'), (doc) => {
            setData(doc.data());

            var filter_init = {}
            
            Object.entries(doc.data()).map((i) => (
                i[1].categories.map((j) => (
                    filter_init[j] = true
                ))
            ))

            filter_init['All'] = Object.keys(filter_init).length;

            setFilter(filter_init);
        });

        onSnapshot(doc(db, 'clicks', 'count'), (doc) => {
            setClicks(doc.data());
        });    

        return () => {
            window.removeEventListener("scroll", handlePositionY);
        };
    }, []);

    if (data === 'loading' || clicks === 'loading') {
        return null;
    };

    const data_filter_search = Object.entries(data).filter(x => handleFilterSearch(x))

    if (width < 750) {
        return (
            <>
                <Helmet>
                    <title>
                        Shop | The Herbal Digest
                    </title>
                    <meta name = 'description' content = 'Coming soon' />
                    <meta property = 'og:title' content = 'Shop | The Herbal Digest' />
                    <meta property = 'og:description' content = 'Coming soon' />
                    <meta name = 'twitter:title' content = 'Shop | The Herbal Digest' />
                    <meta name = 'twitter:description' content = 'Coming soon' />
                </Helmet>
                <div>
                    <Box style = {{width: width, height: height * 0.875, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688630582/Bottles_shop_ulcle7.avif'})`, backgroundSize: 'cover',  backgroundPosition: 'center'}}>
                        <Box style = {{width: width, height: height * 0.875, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                            <Box style = {{width: width, height: height * 0.75, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Fade duration = {1500}>
                                    <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        Shop
                                    </Typography>
                                </Fade>
                                <InView onChange = {(inView, entry) => setLine(!line)}>
                                    <Box style = {{width: line ? width * 0.40 : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '6%' mb = '6%' />
                                </InView>
                                <Fade duration = {3000}>
                                    <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' style = {{width: width * 0.80}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        products we recommend
                                    </Typography>
                                </Fade>
                            </Box>
                        </Box>
                    </Box>
                    <Box style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
                        <Typography variant = 'body1' fontSize = '1.5vh' fontStyle = 'italic' align = 'center' style = {{maxWidth: '80%'}} mt = '3%' mb = '3%'>
                            As an Amazon affiliate, we may earn a commission from qualifying purchases.
                        </Typography>
                    </Box>
                    <AppBar position = 'sticky' style = {{width: width, height: height * 0.10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(23, 23, 23, 0.90)', backdropFilter: 'blur(2.5px)'}} sx = {{zIndex: 1, top: height * 0.125}} >
                        <Box style = {{width: width * 0.97, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Box style = {{width: '35%', height: height * 0.10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                {search === '' ?
                                    <Box style = {{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                        <TextField variant = 'standard' value = {searchValue} placeholder = 'SEARCH…' autoComplete = 'off' onChange = {event => setSearchValue(event.target.value)} onKeyDown = {event => event.key === 'Enter' ? handleClickSearch(event) : null} inputProps = {{style: {color: 'white', fontSize: '1.5vh', width: width * 0.20}, sx: {'&::placeholder': {color: 'white', opacity: 1}}}} InputProps = {{disableUnderline: true, sx: {borderBottom: 1, borderTop: 1, borderBottomColor: 'white', borderTopColor: 'transparent', ':hover': {borderBottom: 2, borderTop: 2, borderBottomColor: 'white', borderTopColor: 'transparent'}, ':after': {borderBottom: 1.5, borderTop: 1.5, borderBottomColor: 'white', borderTopColor: 'transparent'}}}} />
                                        <Button onClick = {(event) => handleClickSearch(event)} style = {{color: 'white', minWidth: 0, margin: 0, padding: '0.50vh', borderRadius: 100}}>
                                            <SearchOutlined style = {{fontSize: '2vh'}}  />
                                        </Button>
                                    </Box>
                                :
                                    <Box style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} sx = {{border: 1, borderRadius: 25, borderColor: 'white', paddingLeft: '1vh', paddingBottom: '0.25vh'}}>
                                        <Typography variant = 'body1' sx = {{paddingRight: '0.25vh'}}>
                                            {search}
                                        </Typography>
                                        <Button onClick = {(event) => handleCloseSearch(event)} style = {{color: 'white', minWidth: 0, margin: 0, borderRadius: 100}}>
                                            <Close style = {{fontSize: '2vh'}} />
                                        </Button>
                                    </Box>
                                }
                            </Box>
                            <Box style = {{width: '30%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Box ref = {refFilter} style = {{height: height * 0.10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <Button onClick = {(event) => handleOpenFilter(event)} style = {{color: 'white'}}>
                                        <Typography variant = 'body1' style = {{fontSize: '1.5vh'}}>
                                            {filter['All'] === Object.keys(filter).length - 1 ?
                                                'ALL'    
                                            :
                                                filter['All'] > 0 ?
                                                    filter['All'] + ' Selected'
                                                :
                                                    'None'
                                            }
                                            &nbsp;
                                        </Typography>
                                        <FilterAltOutlined style = {{fontSize: '2vh'}} />
                                    </Button>
                                </Box>
                            </Box>
                            <Box style = {{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                                <Menu anchorEl = {refFilter.current} anchorOrigin = {{horizontal: 'center', vertical: 'bottom'}} transformOrigin = {{horizontal: 'center', vertical: 'top'}} open = {openFilter} onClose = {(event) => handleCloseFilter(event)} MenuListProps = {{style: {padding: 0}}} style = {{maxHeight: '49vh'}}>
                                    <MenuItem onClick = {(event) => handleClickFilter(event, 'All')} style = {{height: '7.5vh'}}>
                                        <FormControlLabel label = 'All' control = {<Checkbox checked = {filter['All'] === Object.keys(filter).length - 1} indeterminate = {filter['All'] > 0 && filter['All'] < Object.keys(filter).length - 1} />} />
                                    </MenuItem>
                                    {Object.keys(filter).sort().map((i, index) => (
                                        i !== 'All' ?
                                            <MenuItem key = {index} onClick = {(event) => handleClickFilter(event, i)} style = {{height: '7.5vh'}}>
                                                <FormControlLabel label = {i} control = {<Checkbox checked = {filter[i]} />} />
                                            </MenuItem>
                                        :
                                            null
                                    ))}
                                </Menu>
                            </Box>                            
                            <Box ref = {refSort} style = {{width: '35%', height: height * 0.10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Button onClick = {(event) => handleOpenSort(event)} style = {{color: 'white'}}>
                                    <Typography variant = 'body1' style = {{fontSize: '1.5vh'}}>
                                        {sort === 'popular' ?
                                            'MOST POPULAR'
                                        :
                                            sort === 'az' ?
                                                'A → Z'
                                            :
                                                'Z → A'
                                        }
                                        &nbsp;
                                    </Typography>
                                    <Sort style = {{fontSize: '2vh'}} />
                                </Button>
                            </Box>
                            <Menu anchorEl = {refSort.current} anchorOrigin = {{horizontal: 'center', vertical: 'bottom'}} transformOrigin = {{horizontal: 'center', vertical: 'top'}} open = {openSort} onClose = {(event) => handleCloseSort(event)} MenuListProps = {{style: {padding: 0}}}>
                                <MenuItem onClick = {(event) => handleClickSort(event, 'popular')} style = {{height: '7.5vh'}}>
                                    Most Popular
                                </MenuItem>
                                <MenuItem onClick = {(event) => handleClickSort(event, 'az')} style = {{height: '7.5vh'}}>
                                    A → Z
                                </MenuItem>
                                <MenuItem onClick = {(event) => handleClickSort(event, 'za')} style = {{height: '7.5vh'}}>
                                    Z → A
                                </MenuItem>
                            </Menu>
                        </Box>
                    </AppBar>
                    <Box style = {{width: width, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', backgroundColor: 'white'}}>
                        <Box style = {{height: data_filter_search.length > 0 ? height * 0.10 : '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Typography variant = 'body1' mt = {data_filter_search.length > 0 ? '2.5vh' : '-2.5vh'}>
                                {data_filter_search.length > 100 ?
                                    '100+ Products'
                                :
                                    data_filter_search.length > 0 ?
                                        data_filter_search.length + ' Products'
                                    :
                                        'No Products Found'
                                }
                            </Typography>
                        </Box>
                        <Box style = {{width: width * 0.90, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', backgroundColor: 'white'}} pb = {data_filter_search.length > 0 ? '4.5%': 0}>
                            {data_filter_search.sort((a, b) => handleSort(a, b)).map((i, index) => (   
                                <Box key = {index} style = {{width: width * 0.375, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} m = {`${width * 0.0375 + 'px'}`}>
                                    <Link to = {i[1].html_block.split('href="')[1].split('"')[0]} onClick = {(event) => handleClickLink(event, i[0], i[1].html_block)} style = {{color: 'black', textDecoration: 'none'}}>
                                        <Box sx = {{filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.15))'}}>
                                            <img src = {i[1].image} alt = {i[1].title} style = {{width: width * 0.375, height: width * 0.375, objectFit: 'cover', objectPosition: 'center', borderRadius: 25}} />
                                        </Box>
                                    </Link>
                                    <Box style = {{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                                        <Box style = {{width: '95%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}} >
                                            <Typography variant = 'body1' align = 'center' mt = '3%' mb = '3%'>
                                                {i[1].title}
                                            </Typography>
                                            <Typography variant = 'body2' align = 'center'>
                                                {i[1].brand}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </div>
            </>
        );
    };

    return (
        <>
            <Helmet>
                <title>
                    Shop | The Herbal Digest
                </title>
                <meta name = 'description' content = 'Coming soon' />
                <meta property = 'og:title' content = 'Shop | The Herbal Digest' />
                <meta property = 'og:description' content = 'Coming soon' />
                <meta name = 'twitter:title' content = 'Shop | The Herbal Digest' />
                <meta name = 'twitter:description' content = 'Coming soon' />
            </Helmet>
            <div>
                <Box style = {{width: '100vw', height: '115vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688630582/Bottles_shop_ulcle7.avif'})`, backgroundSize: 'cover',  backgroundPositionX: 'center', backgroundPositionY: -position * 0.5, backgroundAttachment: 'fixed'}}>
                        <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                            <Fade duration = {1500}>
                                <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px black'}}>
                                    Shop
                                </Typography>
                            </Fade>
                            <InView onChange = {(inView, entry) => setLine(!line)}>
                                <Box style = {{width: line ? '40vw' : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '3%' mb = '3%' />
                            </InView>
                            <Fade duration = {3000}>
                                <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' style = {{width: '75vw'}} sx = {{textShadow: '0px 0px 10px black'}}>
                                    products we recommend
                                </Typography>
                            </Fade>
                        </Box>
                    </Box>
                </Box>
                <Box style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'}} mt = '-15vh'>
                    <Typography variant = 'body1' fontStyle = 'italic' style = {{maxWidth: '75%'}} mt = '3%' mb = '3%'>
                        As an Amazon affiliate, we may earn a commission from qualifying purchases.
                    </Typography>
                </Box>
                <AppBar position = 'sticky' style = {{width: '100vw', height: '10vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', backgroundColor: 'rgba(23, 23, 23, 0.90)', backdropFilter: 'blur(2.5px)'}} sx = {{zIndex: 1, top: '15vh'}} >
                    <Box style = {{width: '88vw', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Box style = {{width: '33%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            {search === '' ?
                                <Box style = {{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                    <TextField variant = 'standard' value = {searchValue} placeholder = 'SEARCH…' autoComplete = 'off' onChange = {event => setSearchValue(event.target.value)} onKeyDown = {event => event.key === 'Enter' ? handleClickSearch(event) : null} inputProps = {{style: {color: 'white'}, sx: {'&::placeholder': {color: 'white', opacity: 1}}}} InputProps = {{disableUnderline: true, sx: {borderBottom: 1, borderTop: 1, borderBottomColor: 'white', borderTopColor: 'transparent', ':hover': {borderBottom: 2, borderTop: 2, borderBottomColor: 'white', borderTopColor: 'transparent'}, ':after': {borderBottom: 1.5, borderTop: 1.5, borderBottomColor: 'white', borderTopColor: 'transparent'}}}} />
                                    <Button onClick = {(event) => handleClickSearch(event)} style = {{color: 'white', minWidth: 0, margin: 0, padding: '0.50vw', borderRadius: 100}}>
                                        <SearchOutlined style = {{fontSize: '2vw'}}  />
                                    </Button>
                                </Box>
                            :
                                <Box style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} sx = {{border: 1, borderRadius: 25, borderColor: 'white', paddingLeft: '1vw', paddingRight: '0.25vw'}}>
                                    <Typography variant = 'body1' sx = {{paddingRight: '0.25vw'}}>
                                        {search}
                                    </Typography>
                                    <Button onClick = {(event) => handleCloseSearch(event)} style = {{color: 'white', minWidth: 0, margin: 0, borderRadius: 100}}>
                                        <Close style = {{fontSize: '2vw'}} />
                                    </Button>
                                </Box>
                            }
                        </Box>
                        <Box style = {{width: '34%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Box ref = {refFilter} style = {{height: '10vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Button onClick = {(event) => handleOpenFilter(event)} style = {{color: 'white'}}>
                                    <Typography variant = 'body1'>
                                        CATEGORIES:
                                    </Typography>
                                    <Typography variant = 'body1'>
                                        &nbsp;
                                        {filter['All'] === Object.keys(filter).length - 1 ?
                                            'ALL'    
                                        :
                                            filter['All'] > 0 ?
                                                filter['All'] + ' Selected'
                                            :
                                                'None'
                                        }
                                        &nbsp;
                                    </Typography>
                                    <FilterAltOutlined style = {{fontSize: '2vw'}} />
                                </Button>
                            </Box>
                        </Box>
                        <Box style = {{width: '33%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Menu anchorEl = {refFilter.current} anchorOrigin = {{horizontal: 'center', vertical: 'bottom'}} transformOrigin = {{horizontal: 'center', vertical: 'top'}} open = {openFilter} onClose = {(event) => handleCloseFilter(event)} MenuListProps = {{style: {padding: 0}}} style = {{maxHeight: '49vh'}}>
                                <MenuItem onClick = {(event) => handleClickFilter(event, 'All')} style = {{height: '7.5vh'}}>
                                    <FormControlLabel label = 'All' control = {<Checkbox checked = {filter['All'] === Object.keys(filter).length - 1} indeterminate = {filter['All'] > 0 && filter['All'] < Object.keys(filter).length - 1} />} />
                                </MenuItem>
                                {Object.keys(filter).sort().map((i, index) => (
                                    i !== 'All' ?
                                        <MenuItem key = {index} onClick = {(event) => handleClickFilter(event, i)} style = {{height: '7.5vh'}}>
                                            <FormControlLabel label = {i} control = {<Checkbox checked = {filter[i]} />} />
                                        </MenuItem>
                                    :
                                        null
                                ))}
                            </Menu>
                            <Box ref = {refSort} style = {{height: '10vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Button onClick = {(event) => handleOpenSort(event)} style = {{color: 'white'}}>
                                    <Typography variant = 'body1'>
                                        SORT BY:
                                    </Typography>
                                    <Typography variant = 'body1'>
                                        &nbsp;
                                        {sort === 'popular' ?
                                            'MOST POPULAR'
                                        :
                                            sort === 'az' ?
                                                'A → Z'
                                            :
                                                'Z → A'
                                        }
                                        &nbsp;
                                    </Typography>
                                    <Sort style = {{fontSize: '2vw'}} />
                                </Button>
                            </Box>
                            <Menu anchorEl = {refSort.current} anchorOrigin = {{horizontal: 'center', vertical: 'bottom'}} transformOrigin = {{horizontal: 'center', vertical: 'top'}} open = {openSort} onClose = {(event) => handleCloseSort(event)} MenuListProps = {{style: {padding: 0}}}>
                                <MenuItem onClick = {(event) => handleClickSort(event, 'popular')} style = {{height: '7.5vh'}}>
                                    Most Popular
                                </MenuItem>
                                <MenuItem onClick = {(event) => handleClickSort(event, 'az')} style = {{height: '7.5vh'}}>
                                    A → Z
                                </MenuItem>
                                <MenuItem onClick = {(event) => handleClickSort(event, 'za')} style = {{height: '7.5vh'}}>
                                    Z → A
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </AppBar>
                <Box style = {{width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', backgroundColor: 'white'}}>
                    <Box style = {{height: data_filter_search.length > 0 ? '10vh' : '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography variant = 'body1' mt = {data_filter_search.length > 0 ? '2.25vw' : '-2.25vw'}>
                            {data_filter_search.length > 100 ?
                                '100+ Products'
                            :
                                data_filter_search.length > 0 ?
                                    data_filter_search.length + ' Products'
                                :
                                    'No Products Found'
                            }
                        </Typography>
                    </Box>
                    <Box style = {{width: '88vw', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', backgroundColor: 'white'}} pb = {data_filter_search.length > 0 ? '4.5%': 0}>
                        {data_filter_search.sort((a, b) => handleSort(a, b)).map((i, index) => (   
                            <Fade key = {index} duration = {1500}>
                                <Box style = {{width: '17.5vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} m = '2.25vw'>
                                    <Link to = {i[1].html_block.split('href="')[1].split('"')[0]} onClick = {(event) => handleClickLink(event, i[0], i[1].html_block)} style = {{color: 'black', textDecoration: 'none'}}>
                                        <Box sx = {{filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.30))', ':hover': {filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.70))'}}}>
                                            <img src = {i[1].image} alt = {i[1].title} style = {{width: '17.5vw', height: '17.5vw', objectFit: 'cover', objectPosition: 'center', borderRadius: 25}} />
                                        </Box>
                                    </Link>
                                    <Box style = {{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                                        <Box style = {{width: '95%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}} >
                                            <Typography variant = 'body1' align = 'center' mt = '3%' mb = '3%'>
                                                {i[1].title}
                                            </Typography>
                                            <Typography variant = 'body2' align = 'center'>
                                                {i[1].brand}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Fade>
                        ))}
                    </Box>
                </Box>
            </div>
        </>
    );
};


export default Shop;