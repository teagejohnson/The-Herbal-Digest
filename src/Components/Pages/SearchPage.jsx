import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Fade} from 'react-awesome-reveal';
import {Helmet} from 'react-helmet-async';

import {Box, Button, Typography} from '@mui/material';
import {Close} from '@mui/icons-material';

import {doc, getDoc, onSnapshot, updateDoc} from 'firebase/firestore';

import db from '../../firebase.js';


const SearchPage = () => {
    const width = useState(window.innerWidth)[0];
    const height = useState(window.innerHeight)[0];

    const {search} = useParams();
    
    const [botanicals, setBotanicals] = useState('loading');
    const [remedies, setRemedies] = useState('loading');
    const [blog, setBlog] = useState('loading');
    const [shop, setShop] = useState('loading');
    const [clicks, setClicks] = useState('loading');

    const handleCloseSearch = (event) => {
        event.preventDefault();

        window.location.href = '/search';
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

    const handleFilterBotanicals = (item) => {
        const phrases = item[1].tags.concat(item[1].title, item[1].scientific_name);

        var keywords = [];

        phrases.map((i) => (
            i ?
                i.split(' ').map((j) => (
                    keywords.push(j.trim().toLowerCase())
                ))
            :
                null
        ));

        var search_phrase = [];
        
        search.split(' ').map((i) => (
            search_phrase.push(i.trim().toLowerCase())
        ));

        return search_phrase.filter(x => keywords.includes(x)).length === search_phrase.length;
    };

    const handleFilterRemedies = (item, category) => {
        const phrases = item[1].tags.concat(item[1].title, category[1].title);

        var keywords = [];

        phrases.map((i) => (
            i ?
                i.split(' ').map((j) => (
                    keywords.push(j.trim().toLowerCase())
                ))
            :
                null
        ));

        var search_phrase = [];
        
        search.split(' ').map((i) => (
            search_phrase.push(i.trim().toLowerCase())
        ));

        return search_phrase.filter(x => keywords.includes(x)).length === search_phrase.length;
    };

    const handleFilterBlog = (item) => {
        const phrases = item[1].tags.concat(item[1].title, item[1].category);

        var keywords = [];

        phrases.map((i) => (
            i ?
                i.split(' ').map((j) => (
                    keywords.push(j.trim().toLowerCase())
                ))
            :
                null
        ));

        var search_phrase = [];
        
        search.split(' ').map((i) => (
            search_phrase.push(i.trim().toLowerCase())
        ));

        return search_phrase.filter(x => keywords.includes(x)).length === search_phrase.length;
    };

    const handleFilterShop = (item) => {
        const phrases = item[1].tags.concat(item[1].title, item[1].brand);

        var keywords = [];

        phrases.map((i) => (
            i ?
                i.split(' ').map((j) => (
                    keywords.push(j.trim().toLowerCase())
                ))
            :
                null
        ));

        var search_phrase = [];
        
        search.split(' ').map((i) => (
            search_phrase.push(i.trim().toLowerCase())
        ));

        return search_phrase.filter(x => keywords.includes(x)).length === search_phrase.length;
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
    
    useEffect(() => {
        window.scrollTo({top: 0});

        onSnapshot(doc(db, 'glossary', 'botanicals'), (doc) => {
            setBotanicals(doc.data());
        });

        onSnapshot(doc(db, 'glossary', 'remedies'), (doc) => {
            setRemedies(doc.data());
        });

        onSnapshot(doc(db, 'glossary', 'blog'), (doc) => {
            setBlog(doc.data());
        });

        onSnapshot(doc(db, 'glossary', 'shop'), (doc) => {
            setShop(doc.data());
        });

        onSnapshot(doc(db, 'clicks', 'count'), (doc) => {
            setClicks(doc.data());
        });
        
    }, []);

    if (botanicals === 'loading' || remedies === 'loading' || blog === 'loading' || shop === 'loading' || clicks === 'loading') {
        return null;
    };

    const remedies_filter = {};

    Object.entries(remedies).map((i, index_1) => {
        Object.entries(i[1].pages).filter(x => handleFilterRemedies(x, i)).map((j, index_2) => {
            const remedies_new = j[1];

            remedies_new['image'] = i[1].image;
            remedies_new['alt_text'] = i[1].alt_text;

            remedies_filter[j[0]] = remedies_new;

            return null;
        });

        return null;
    });

    if (width < 750) {
        return (
            <>
                <Helmet>
                    <title>
                        Search Results | The Herbal Digest
                    </title>
                </Helmet>
                <div>
                    <Box style = {{width: width, minHeight: height * 0.75, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white'}} pt = {`${height * 0.125}px`}>
                        <Box style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: '#171717'}} sx = {{border: 1, borderRadius: 150, borderColor: 'white', paddingLeft: '1vh', paddingRight: '0.25vh'}} mt = '4.5%'>
                            <Typography variant = 'body1' fontSize = '2vh' sx = {{paddingRight: '0.5vh'}}>
                                {search}
                            </Typography>
                            <Button onClick = {(event) => handleCloseSearch(event)} style = {{color: 'white', minWidth: 0, margin: 0, borderRadius: 100}}>
                                <Close style = {{fontSize: '2vh'}} />
                            </Button>
                        </Box>
                        {Object.entries(botanicals).filter(x => handleFilterBotanicals(x)).length > 0 || Object.keys(remedies_filter).length > 0 || Object.entries(blog).filter(x => handleFilterBlog(x)).length > 0 || Object.entries(shop).filter(x => handleFilterShop(x)).length > 0 ?
                            <Box style = {{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}} pb = '6%'>
                                {Object.entries(botanicals).filter(x => handleFilterBotanicals(x)).length > 0 ?
                                    <>
                                        <Typography variant = 'h2' mt = '3%' mb = '1.5%'>
                                            Botanicals
                                        </Typography>
                                        <Box style = {{width: width * 0.76, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                                            {Object.entries(botanicals).filter(x => handleFilterBotanicals(x)).sort((a, b) => handleSortAz(a, b)).map((i, index) => (
                                                <Link key = {index} to = {'/botanicals/' + i[1].slug} style = {{color: 'white', textDecoration: 'none'}}>
                                                    <Box style = {{width: width * 0.32, height: width * 0.32, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{borderRadius: 10, filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.15))'}} m = {`${width * 0.03 + 'px'}`}>
                                                        <img src = {i[1].image} alt = {i[1].alt_text} style = {{position: 'absolute', width: width * 0.32, height: width * 0.32, objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.85)', borderRadius: 10}} />
                                                        <Box position = 'relative' style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white'}}>
                                                            <Typography variant = 'body1' fontSize = '2vh' fontWeight = 'bold' style = {{width: '90%'}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                                                {i[1].title}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Link>
                                            ))}
                                        </Box>
                                    </>
                                :
                                    null
                                }
                                {Object.keys(remedies_filter).length > 0 ?
                                    <>
                                        <Typography variant = 'h2' mt = '3%' mb = '1.5%'>
                                            Remedies
                                        </Typography>
                                        <Box style = {{width: width * 0.76, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                                            {Object.entries(remedies_filter).sort((a, b) => handleSortAz(a, b)).map((i, index) => (
                                                <Link key = {index} to = {'/remedies/' + i[1].slug} style = {{color: 'white', textDecoration: 'none'}}>
                                                    <Box style = {{width: width * 0.32, height: width * 0.32, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{borderRadius: 10, filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.15))'}} m = {`${width * 0.03 + 'px'}`}>
                                                        <img src = {i[1].image} alt = {i[1].alt_text} style = {{position: 'absolute', width: width * 0.32, height: width * 0.32, objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.85)', borderRadius: 10}} />
                                                        <Box position = 'relative' style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white'}}>
                                                            <Typography variant = 'body1' fontSize = '2vh' fontWeight = 'bold' style = {{width: '90%'}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                                                {i[1].title}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Link>
                                            ))}
                                        </Box>
                                    </>
                                :
                                    null
                                }
                                {Object.entries(blog).filter(x => handleFilterBlog(x)).length > 0 ?
                                    <>
                                        <Typography variant = 'h2' mt = '3%' mb = '1.5%'>
                                            Blog
                                        </Typography>
                                        <Box style = {{width: width * 0.70, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                                            {Object.entries(blog).filter(x => handleFilterBlog(x)).sort((a, b) => a[1].timestamp.toDate() < b[1].timestamp.toDate() ? 1 : a[1].timestamp.toDate() > b[1].timestamp.toDate() ? -1 : 0).map((i, index) => (
                                                <Link key = {index} to = {'/blog/' + i[1].slug} style = {{color: 'white', textDecoration: 'none'}}>
                                                    <Box style = {{width: width * 0.70, height: width * 0.45, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{borderRadius: 10, filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.15))'}} mt = {`${width * 0.03 + 'px'}`} mb = {`${width * 0.03 + 'px'}`}>
                                                        <img src = {i[1].image} alt = {i[1].alt_text} style = {{position: 'absolute', width: width * 0.70, height: width * 0.45, objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.85)', borderRadius: 10}} />
                                                        <Box position = 'relative' style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white'}}>
                                                            <Typography variant = 'body1' fontSize = '2vh' fontWeight = 'bold' style = {{width: '90%'}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                                                {i[1].title}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Link>
                                            ))}
                                        </Box>
                                    </>
                                :
                                    null
                                }
                                {Object.entries(shop).filter(x => handleFilterShop(x)).length > 0 ?
                                    <>
                                        <Typography variant = 'h2' mt = '3%' mb = '1.5%'>
                                            Shop
                                        </Typography>
                                        <Box style = {{width: width * 0.76, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                                            {Object.entries(shop).filter(x => handleFilterShop(x)).sort((a, b) => handleSortPopular(a, b)).map((i, index) => (
                                                <Box key = {index} style = {{width: width * 0.32, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} m = {`${width * 0.03 + 'px'}`}>
                                                    <Link to = {i[1].html_block.split('href="')[1].split('"')[0]} onClick = {(event) => handleClickLink(event, i[0], i[1].html_block)} style = {{color: 'black', textDecoration: 'none'}}>
                                                        <Box sx = {{filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.15))'}}>
                                                            <img src = {i[1].image} alt = {i[1].title} style = {{width: width * 0.32, height: width * 0.32, maxWidth: 'none', maxHeight: 'none', objectFit: 'cover', objectPosition: 'center', borderRadius: 10}} />
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
                                    </>  
                                :
                                    null
                                }
                            </Box>
                        :
                            <Typography variant = 'body1' mt = '10.5%'>
                                Nothing Found
                            </Typography>
                        }
                    </Box>
                </div>
            </>
        );
    };

    return (
        <>
            <Helmet>
                <title>
                    Search Results | The Herbal Digest
                </title>
            </Helmet>
            <div>
                <Box style = {{width: '100vw', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white'}} pt = '15vh'>
                    <Box style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: '#171717'}} sx = {{border: 1, borderRadius: 150, borderColor: 'white', paddingLeft: '1vw', paddingRight: '0.25vw'}} mt = '3%'>
                        <Typography variant = 'body1' fontSize = '2vw' sx = {{paddingRight: '0.5vh'}}>
                            {search}
                        </Typography>
                        <Button onClick = {(event) => handleCloseSearch(event)} style = {{color: 'white', minWidth: 0, margin: 0, borderRadius: 100}}>
                            <Close style = {{fontSize: '2vw'}} />
                        </Button>
                    </Box>
                    {Object.entries(botanicals).filter(x => handleFilterBotanicals(x)).length > 0 || Object.keys(remedies_filter).length > 0 || Object.entries(blog).filter(x => handleFilterBlog(x)).length > 0 || Object.entries(shop).filter(x => handleFilterShop(x)).length > 0 ?
                        <Box style = {{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}} pb = '6%'>
                            {Object.entries(botanicals).filter(x => handleFilterBotanicals(x)).length > 0 ?
                                <>
                                    <Typography variant = 'h2' mt = '3%' mb = '1.5%'>
                                        Botanicals
                                    </Typography>
                                    <Box style = {{width: '76vw', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                                        {Object.entries(botanicals).filter(x => handleFilterBotanicals(x)).sort((a, b) => handleSortAz(a, b)).map((i, index) => (
                                            <Fade key = {index} duration = {1500}>
                                                <Link to = {'/botanicals/' + i[1].slug} style = {{color: 'white', textDecoration: 'none'}}>
                                                    <Box style = {{width: '16vw', height: '16vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{borderRadius: 10, filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.30))', ':hover': {filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.70))'}}} m = '1.5vw'>
                                                        <img src = {i[1].image} alt = {i[1].alt_text} style = {{position: 'absolute', width: '16vw', height: '16vw', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.85)', borderRadius: 10}} />
                                                        <Box position = 'relative' style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white'}}>
                                                            <Typography variant = 'body1' fontSize = '2vw' fontWeight = 'bold' style = {{width: '90%'}} sx = {{textShadow: '0px 0px 10px black'}}>
                                                                {i[1].title}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Link>
                                            </Fade>
                                        ))}
                                    </Box>
                                </>
                            :
                                null
                            }
                            {Object.keys(remedies_filter).length > 0 ?
                                <>
                                    <Typography variant = 'h2' mt = '3%' mb = '1.5%'>
                                        Remedies
                                    </Typography>
                                    <Box style = {{width: '76vw', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                                        {Object.entries(remedies_filter).sort((a, b) => handleSortAz(a, b)).map((i, index) => (
                                            <Fade key = {index} duration = {1500}>
                                                <Link to = {'/remedies/' + i[1].slug} style = {{color: 'white', textDecoration: 'none'}}>
                                                    <Box style = {{width: '16vw', height: '16vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{borderRadius: 10, filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.30))', ':hover': {filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.70))'}}} m = '1.5vw'>
                                                        <img src = {i[1].image} alt = {i[1].alt_text} style = {{position: 'absolute', width: '16vw', height: '16vw', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.85)', borderRadius: 10}} />
                                                        <Box position = 'relative' style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white'}}>
                                                            <Typography variant = 'body1' fontSize = '2vw' fontWeight = 'bold' style = {{width: '90%'}} sx = {{textShadow: '0px 0px 10px black'}}>
                                                                {i[1].title}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Link>
                                            </Fade>
                                        ))}
                                    </Box>
                                </>
                            :
                                null
                            }
                            {Object.entries(blog).filter(x => handleFilterBlog(x)).length > 0 ?
                                <>
                                    <Typography variant = 'h2' mt = '3%' mb = '1.5%'>
                                        Blog
                                    </Typography>
                                    <Box style = {{width: '76vw', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                                        {Object.entries(blog).filter(x => handleFilterBlog(x)).sort((a, b) => a[1].timestamp.toDate() < b[1].timestamp.toDate() ? 1 : a[1].timestamp.toDate() > b[1].timestamp.toDate() ? -1 : 0).map((i, index) => (
                                            <Fade key = {index} duration = {1500}>
                                                <Link to = {'/blog/' + i[1].slug} style = {{color: 'white', textDecoration: 'none'}}>
                                                    <Box style = {{width: '35vw', height: '22.5vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{borderRadius: 10, filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.30))', ':hover': {filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.70))'}}} m = '1.5vw'>
                                                        <img src = {i[1].image} alt = {i[1].alt_text} style = {{position: 'absolute', width: '35vw', height: '22.5vw', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.85)', borderRadius: 10}} />
                                                        <Box position = 'relative' style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white'}}>
                                                            <Typography variant = 'body1' fontSize = '2vw' fontWeight = 'bold' style = {{width: '90%'}} sx = {{textShadow: '0px 0px 10px black'}}>
                                                                {i[1].title}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Link>
                                            </Fade>
                                        ))}
                                    </Box>
                                </>
                            :
                                null
                            }
                            {Object.entries(shop).filter(x => handleFilterShop(x)).length > 0 ?
                                <>
                                    <Typography variant = 'h2' mt = '3%' mb = '1.5%'>
                                        Shop
                                    </Typography>
                                    <Box style = {{width: '76vw', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                                        {Object.entries(shop).filter(x => handleFilterShop(x)).sort((a, b) => handleSortPopular(a, b)).map((i, index) => (
                                            <Fade key = {index} duration = {1500}>
                                                <Box style = {{width: '16vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} m = '1.5vw'>
                                                    <Link to = {i[1].html_block.split('href="')[1].split('"')[0]} onClick = {(event) => handleClickLink(event, i[0], i[1].html_block)} style = {{color: 'black', textDecoration: 'none'}}>
                                                        <Box sx = {{filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.30))', ':hover': {filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.70))'}}}>
                                                            <img src = {i[1].image} alt = {i[1].title} style = {{width: '16vw', height: '16vw', maxWidth: 'none', maxHeight: 'none', objectFit: 'cover', objectPosition: 'center', borderRadius: 10}} />
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
                                </>  
                            :
                                null
                            }
                        </Box>
                    :
                        <Typography variant = 'body1' mt = '10.5%'>
                            Nothing Found
                        </Typography>
                    }
                </Box>
            </div>
        </>
    );
};


export default SearchPage;