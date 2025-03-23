import React, {useEffect, useState} from 'react';
import Carousel from 'react-material-ui-carousel';
import {Link, useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

import {collection, doc, getDoc, onSnapshot, query, updateDoc, where} from 'firebase/firestore';

import {Box, Slide, Typography} from '@mui/material';

import NotFound from './NotFound.jsx';

import db from '../../firebase.js';


const BlogPage = () => {
    const width = useState(window.innerWidth)[0];
    const height = useState(window.innerHeight)[0];

    const windowWidth = width >= 750 ? '100vw' : width;

    const {slug} = useParams();

    const [data, setData] = useState('loading');
    const [shop, setShop] = useState('loading');
    const [clicks, setClicks] = useState('loading');

    const [page1, setPage1] = useState(false);

    const handleAlign = (index) => {
        if (index % 2 === 0) {
            return 'left';
        }

        else {
            return 'right';
        }
    };

    const handleAlignItems = (index) => {
        if (index % 2 === 0) {
            return 'flex-start';
        }

        else {
            return 'flex-end';
        }
    };

     const handleFlexDirection = (index) => {
        if (index % 2 === 0) {
            return 'row';
        }

        else {
            return 'row-reverse';
        }
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

    const handleShopFilter = (item) => {
        const phrases = item[1].tags.concat(item[1].title, item[1].brand);

        var keywords = []

        phrases.map((i) => (
            i.split(' ').map((j) => (
                keywords.push(j.trim().toLowerCase())
            ))
        ));

        var filter = false;

        data.tags.map((i) => {
            var search_phrase = [];

            i.split(' ').map((i) => (
                search_phrase.push(i.trim().toLowerCase())
            ));

            if (search_phrase.filter(x => keywords.includes(x)).length === search_phrase.length) {
                filter = true;

                return () => {

                };
            }

            return () => {

            };
        })

        return filter;
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
        onSnapshot(query(collection(db, 'blog'), where('slug', '==', slug)), (snapshot) => {
            setData(snapshot.docs.map(document => document.data())[0]);
        });

        onSnapshot(doc(db, 'glossary', 'shop'), (doc) => {
            setShop(doc.data());
        });

        onSnapshot(doc(db, 'clicks', 'count'), (doc) => {
            setClicks(doc.data());
        });

        return () => {

        };

    }, [slug]);

    if (data === 'loading' || shop === 'loading') {
        return null;
    }

    else if (!data) {
        return <NotFound />;
    }

    const shop_map = {};
    const shop_list = [];

    try {
        Object.entries(shop).filter(x => handleShopFilter(x)).sort((a, b) => handleSortPopular(a, b)).slice(0, 30).map((i, index) => {
            try {
                width >= 750 ?
                    shop_map[Math.floor(index / 3)].push(
                        <Box style = {{width: '17.5vw', height: '25vw', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}} m = '2.25vw'>
                            <Link onClick = {(event) => handleClickLink(event, i[0], i[1].html_block)} style = {{color: 'black', textDecoration: 'none'}} sx = {{':hover': {filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.70))'}}}>
                                <Box style = {{width: '17.5vw', height: '17.5vw'}} sx = {{filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.30))', ':hover': {filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.70))'}}} >
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
                    )
                :
                    shop_list.push(
                        <Box key = {index} style = {{width: width * 0.35, height: width * 0.50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}} ml = {`${width * 0.25 + 'px'}`} mt = '4.5%'>
                            <Link onClick = {(event) => handleClickLink(event, i[0], i[1].html_block)} style = {{color: 'black', textDecoration: 'none'}}>
                                <Box style = {{width: width * 0.35, height: width * 0.35}} sx = {{filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.05))'}}>
                                    <img src = {i[1].image} alt = {i[1].title} style = {{width: width * 0.35, height: width * 0.35, objectFit: 'cover', objectPosition: 'center', borderRadius: 25}} />
                                </Box>
                            </Link>
                            <Box style = {{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Box style = {{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}} >
                                    <Typography variant = 'body1' align = 'center' mt = '3%' mb = '3%'>
                                        {i[1].title}
                                    </Typography>
                                    <Typography variant = 'body2' align = 'center'>
                                        {i[1].brand}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    )
            }

            catch {
                shop_map[Math.floor(index / 3)] = [
                    <Box style = {{width: '17.5vw', height: '25vw', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}} m = '2.25vw'>
                        <Link onClick = {(event) => handleClickLink(event, i[0], i[1].html_block)} style = {{color: 'black', textDecoration: 'none'}} sx = {{':hover': {filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.70))'}}}>
                            <Box style = {{width: '17.5vw', height: '17.5vw'}} sx = {{filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.30))', ':hover': {filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.70))'}}} >
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
                ]
            }

            return () => {

            }
        });
    }

    catch {
        
    }

    return (
        <>
            <Helmet>
                <title>
                    {data.title}
                </title>
                <meta name = 'description' content = {data.description} />
                <meta property = "og:title" content = {data.title} />
                <meta property = "og:description" content = {data.description} />
                <meta name = "twitter:title" content = {data.title} />
                <meta name = "twitter:description" content = {data.description} />
            </Helmet>
            <div>
                {width >= 750 ?
                    <Box style = {{width: '100vw', height: '100vh', backgroundImage: `url(${data.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                            <Box style = {{width: '100vw', height: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Box style = {{width: '100%', height: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                    <Slide in direction = 'right' timeout = {800}>
                                        <Typography variant = 'body1' fontSize = '3vw' fontWeight = 'bold' align = 'left' sx = {{padding: '1vw'}}>
                                            <mark style = {{backgroundColor: 'rgba(255, 255, 255, 0.70', paddingLeft: '0.5vw', paddingRight: '0.5vw'}}>{data.category}</mark>
                                        </Typography>
                                    </Slide>
                                    <Slide in direction = 'left' timeout = {800} style = {{transitionDelay: 400}}>
                                        <Typography variant = 'body1' fontSize = '3vw' fontWeight = 'bold' align = 'right' sx = {{padding: '1vw'}}>
                                            <mark style = {{backgroundColor: 'rgba(255, 255, 255, 0.70', paddingLeft: '0.5vw', paddingRight: '0.5vw'}}>{data.timestamp.toDate().toLocaleDateString(undefined, {'month': 'long', 'day': 'numeric', 'year': 'numeric'})}</mark>
                                        </Typography>
                                    </Slide>
                                </Box>
                                <Box style = {{width: '100%', height: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                                    <Typography variant = 'body2' style = {{position: 'absolute', color: '#bababa', justifySelf: 'flex-start', alignSelf: 'flex-end'}} sx = {{paddingLeft: 0.5, textShadow: '0px 0px 10px black'}}>
                                        {data.attribution}
                                    </Typography>
                                    <Slide in direction = 'left' timeout = {1600} style = {{transitionDelay: 800}}>
                                        <Box style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                            <Typography variant = 'h1' align = 'right' style = {{width: '75%'}} sx = {{paddingRight: '1vw', lineHeight: '10vw'}}>
                                                <mark style = {{backgroundColor: 'rgba(255, 255, 255, 0.70', paddingLeft: '0.5vw', paddingRight: '0.5vw'}}>{data.title}</mark>
                                            </Typography>
                                        </Box>
                                    </Slide>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                :
                    <Box style = {{width: windowWidth, height: height * 0.625, backgroundImage: `url(${data.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        <Box style = {{width: windowWidth, height: height * 0.625, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                            <Box style = {{width: windowWidth, height: height * 0.50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Box style = {{width: '100%', height: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                    <Slide in direction = 'right' timeout = {800}>
                                        <Typography variant = 'body1' fontSize = '2vh' fontWeight = 'bold' align = 'left' sx = {{padding: '1vw'}}>
                                            <mark style = {{backgroundColor: 'rgba(255, 255, 255, 0.70', paddingLeft: '0.5vw', paddingRight: '0.5vw'}}>{data.category}</mark>
                                        </Typography>
                                    </Slide>
                                    <Slide in direction = 'left' timeout = {800} style = {{transitionDelay: 400}}>
                                        <Typography variant = 'body1' fontSize = '2vh' fontWeight = 'bold' align = 'right' sx = {{padding: '1vw'}}>
                                            <mark style = {{backgroundColor: 'rgba(255, 255, 255, 0.70', paddingLeft: '0.5vw', paddingRight: '0.5vw'}}>{data.timestamp.toDate().toLocaleDateString(undefined, {'month': 'long', 'day': 'numeric', 'year': 'numeric'})}</mark>
                                        </Typography>
                                    </Slide>
                                </Box>
                                <Box style = {{width: '100%', height: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                                    <Typography variant = 'body2' style = {{position: 'absolute', color: '#bababa', justifySelf: 'flex-start', alignSelf: 'flex-end'}} sx = {{paddingLeft: 0.5, textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        {data.attribution}
                                    </Typography>
                                    <Slide in direction = 'left' timeout = {1600} style = {{transitionDelay: 800}}>
                                        <Box style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                            <Typography variant = 'h1' fontSize = '3.5vh' align = 'right' style = {{width: '90%'}} sx = {{paddingRight: '1vw', lineHeight: '6vh'}}>
                                                <mark style = {{backgroundColor: 'rgba(255, 255, 255, 0.70', paddingLeft: '0.5vw', paddingRight: '0.5vw'}}>{data.title}</mark>
                                            </Typography>
                                        </Box>
                                    </Slide>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                }
                <Box style = {{width: windowWidth, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', textAlign: 'justify', backgroundColor: 'white'}} pb = '6%'>
                    <Typography variant = 'body1' fontSize = {width >= 750 ? '1.75vw' : '2vh'} fontStyle = 'italic' align = 'center' style = {{width: width >= 750 ? '75%' : '80%'}} mt = '6%' mb = '1.5%'>
                        {data.introduction.text.split("<LINK>").map((i, index) => (
                            <React.Fragment key = {index}>
                                {index % 2 === 0 ?
                                    i
                                :
                                    <Link to = {data.introduction.links[Math.floor(index / 2)]} style = {{color: 'black'}}>
                                        {i}
                                    </Link>
                                }
                            </React.Fragment>
                        ))}
                    </Typography>
                    {data.body.map((i, index_1) => (
                        <Box key = {index_1} style = {{width: width >= 750 ? '75%' : '80%', display: 'flex', flexDirection: handleFlexDirection(index_1), justifyContent: 'space-between', alignItems: 'center'}} mt = '4.5%'>
                            {i.image ?
                                width >= 750 ?
                                    <>   
                                        <Box style = {{width: '65%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: handleAlignItems(index_1)}}>  
                                            <Typography variant = 'h2' mb = '1.5%'>
                                                {i.title}
                                            </Typography>
                                            <Typography variant = 'body1' whiteSpace = 'pre-line'>
                                                {i.text.split("<LINK>").map((j, index_2) => (
                                                    <React.Fragment key = {index_2}>
                                                        {index_2 % 2 === 0 ?
                                                            j
                                                        :
                                                            <Link to = {i.links[Math.floor(index_2 / 2)]} style = {{color: 'black'}}>
                                                                {j}
                                                            </Link>
                                                        }
                                                    </React.Fragment>
                                                ))}
                                            </Typography>
                                        </Box>
                                        <Box style = {{width: width >= 750 ? '22.5vw' : width * 0.75 * 0.30, height: width >= 750 ? '22.5vw' : width * 0.75 * 0.30, display: 'grid', justifyContent: 'flex-end', alignItems: 'flex-start'}}>
                                            <img src = {i.image} alt = {i.alt_text} style = {{position: 'absolute', width: width >= 750 ? '22.5vw' : width * 0.75 * 0.30, height: width >= 750 ? '22.5vw' : width * 0.75 * 0.30, objectFit: 'cover', objectPosition: 'center'}} />
                                            <Typography variant = 'body2' style = {{position: 'absolute', color: '#bababa', justifySelf: 'flex-start', alignSelf: 'flex-end'}} sx = {{paddingLeft: 0.5, textShadow: '0px 0px 10px black'}}>
                                                {i.attribution}
                                            </Typography>
                                        </Box>
                                    </>
                                :
                                    <>   
                                        <Box style = {{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>  
                                            <Box style = {{width: width >= 750 ? '70vw' : width * 0.70, height: width >= 750 ? '70vw' : width * 0.70, display: 'grid', justifyContent: 'flex-end', alignItems: 'flex-start'}} mt = '4.5%' mb = '4.5%'>
                                                <img src = {i.image} alt = {i.alt_text} style = {{position: 'absolute', width: width >= 750 ? '70vw' : width * 0.70, height: width >= 750 ? '70vw' : width * 0.70, objectFit: 'cover', objectPosition: 'center'}} />
                                                <Typography variant = 'body2' style = {{position: 'absolute', color: '#bababa', justifySelf: 'flex-start', alignSelf: 'flex-end'}} sx = {{paddingLeft: 0.5, textShadow: '0px 0px 10px black'}}>
                                                    {i.attribution}
                                                </Typography>
                                            </Box>
                                            <Typography variant = 'h2' align = {handleAlign(index_1)} mb = '1.5%'>
                                                {i.title}
                                            </Typography>
                                            <Typography variant = 'body1' whiteSpace = 'pre-line'>
                                                {i.text.split("<LINK>").map((j, index_2) => (
                                                    <React.Fragment key = {index_2}>
                                                        {index_2 % 2 === 0 ?
                                                            j
                                                        :
                                                            <Link to = {i.links[Math.floor(index_2 / 2)]} style = {{color: 'black'}}>
                                                                {j}
                                                            </Link>
                                                        }
                                                    </React.Fragment>
                                                ))}
                                            </Typography>
                                        </Box>
                                        
                                    </>
                            :
                                <Box style = {{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: handleAlignItems(index_1)}}>  
                                    <Typography variant = 'h2' mb = '1.5%'>
                                        {i.title}
                                    </Typography>
                                    <Typography variant = 'body1' whiteSpace = 'pre-line'>
                                        {i.text.split("<LINK>").map((j, index_2) => (
                                            <React.Fragment key = {index_2}>
                                                {index_2 % 2 === 0 ?
                                                    j
                                                :
                                                    <Link to = {i.links[Math.floor(index_2 / 2)]} style = {{color: 'black'}}>
                                                        {j}
                                                    </Link>
                                                }
                                            </React.Fragment>
                                        ))}
                                    </Typography>
                                </Box>
                            }
                        </Box>
                    ))}
                    {data.ingredients.length > 0 ?
                        <Box style = {{maxWidth: width >= 750 ? '50%' : '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{border: 1, borderRadius: 2, borderColor: 'black', boxShadow: '0px 0px 10px #c5c5c5', paddingLeft: '5%', paddingRight: '5%'}} mt = '4.5%'>
                            <Typography variant = 'h2' mt = '9%' mb = '1.5%'>
                                Ingredients
                            </Typography>
                            <Box style = {{maxWidth: width >= 750 ? '100%' : '80%', textAlign: 'left'}} mb = '9%'>
                                <ul style = {{listStyle: 'circle', fontFamily: 'Quicksand', fontSize: width >= 750 ? '1.5vw' : '1.5vh', margin: 0, padding: 0}}>
                                    {data.ingredients.map((i, index) => (
                                        <li key = {index}>
                                            <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                                {i}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            </Box>
                        </Box>
                    :
                        null
                    }
                    {data.instructions.length > 0 ?
                        <>
                            <Typography variant = 'h2' mt = '4.5%'>
                                Instructions
                            </Typography>
                            <Box style = {{maxWidth: width >= 750 ? '65%' : '70%'}}>
                                <ul style = {{listStyle: 'decimal', fontFamily: 'Quicksand', fontSize: width >= 750 ? '1.5vw' : '1.5vh', margin: 0, padding: 0}}>
                                    {data.instructions.map((i, index) => (
                                        <li key = {index}>
                                            <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                                {i}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            </Box>
                        </>
                    :
                        null
                    }
                    <Typography variant = 'body1' fontSize = {width >= 750 ? '1.75vw' : '2vh'} fontStyle = 'italic' align = 'center' style = {{maxWidth: width >= 750 ? '75%' : '80%'}} mt = '4.5%'>
                        {data.conclusion.text.split("<LINK>").map((i, index) => (
                            <React.Fragment key = {index}>
                                {index % 2 === 0 ?
                                    i
                                :
                                    <Link to = {data.conclusion.links[Math.floor(index / 2)]} style = {{color: 'black'}}>
                                        {i}
                                    </Link>
                                }
                            </React.Fragment>
                        ))}
                    </Typography>
                    {Object.keys(shop_map).length > 0 || shop_list.length > 0 ? 
                        <>
                            <Typography variant = 'h2' mt = '4.5%'>
                                Recommended Products
                            </Typography>
                            <Typography variant = 'body1' fontStyle = 'italic' style = {{maxWidth: '75%'}} mt = '1.5%' mb = '1.5%'>
                                As an Amazon affiliate, we may earn a commission from qualifying purchases.
                            </Typography>
                            {width >= 750 ?
                                <Box style = {{width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                                    {Object.keys(shop_map).length === 1 ?
                                        <Carousel height = '28vw' indicators = {false} navButtonsAlwaysInvisible sx = {{width: '100%'}}>
                                            {Object.keys(shop_map).map((i, index_1) => (
                                                <Box key = {index_1} style = {{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                                                    {shop_map[i].map((j, index_2) => (
                                                        <React.Fragment key = {index_2}>
                                                            {j}
                                                        </React.Fragment>
                                                    ))}
                                                </Box>
                                            ))}
                                        </Carousel>
                                    :
                                        Object.keys(shop_map).length === 2 ?
                                            <Carousel height = '28vw' animation = 'slide' duration = {800} onChange = {(event) => setPage1(!page1)} index = {1} changeOnFirstRender autoPlay = {false} swipe = {false} navButtonsAlwaysVisible navButtonsProps = {{style: {width: '3.5vw', height: '3.5vw', color: 'white', backgroundColor: 'rgba(81, 81, 81, 1)', filter: 'none', ':hover': {backgroundColor: 'rgba(197, 197, 197, 1)'}}}} indicatorContainerProps = {{style: {height: '3vw', display: 'flex', flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center'}}} indicatorIconButtonProps = {{style: {color: 'rgba(197, 197, 197, 1)', pointerEvents: 'none', cursor: 'default'}}} activeIndicatorIconButtonProps = {{style: {color: 'rgba(81, 81, 81, 1)', pointerEvents: 'none', cursor: 'default'}}} sx = {{width: '100%', transition: 'none', '& .css-hn784z button': {visibility: page1 ? 'hidden' : 'visible'}, '& .css-1abc02a button': {visibility: page1 ? 'visible' : 'hidden'}, '& .css-hn784z:hover button': {opacity: 1}, '& .css-1abc02a:hover button': {opacity: 1}}}>
                                                {Object.keys(shop_map).sort((a, b) => a < b ? 1 : a > b ? -1 : 0).map((i, index_1) => (
                                                    <Box key = {index_1} style = {{width: '66vw', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}} sx = {{marginLeft: '7vw'}}>
                                                        {shop_map[i].map((j, index_2) => (
                                                            <React.Fragment key = {index_2}>
                                                                {j}
                                                            </React.Fragment>
                                                        ))}
                                                    </Box>
                                                ))}
                                            </Carousel>
                                        :
                                            <Carousel height = '28vw' animation = 'slide' duration = {800} cycleNavigation = {false} changeOnFirstRender autoPlay = {false} swipe = {false} navButtonsAlwaysVisible navButtonsProps = {{style: {width: '3.5vw', height: '3.5vw', color: 'white', backgroundColor: 'rgba(81, 81, 81, 1)', filter: 'none', ':hover': {backgroundColor: 'rgba(197, 197, 197, 1)'}}}} indicatorContainerProps = {{style: {height: '3vw', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}} indicatorIconButtonProps = {{style: {color: 'rgba(197, 197, 197, 1)', pointerEvents: 'none', cursor: 'default'}}} activeIndicatorIconButtonProps = {{style: {color: 'rgba(81, 81, 81, 1)', pointerEvents: 'none', cursor: 'default'}}} sx = {{width: '100%', transition: 'none', '& .css-hn784z:hover button': {opacity: 1}, '& .css-1abc02a:hover button': {opacity: 1}}}>
                                                {Object.keys(shop_map).map((i, index_1) => (
                                                    <Box key = {index_1} style = {{width: '66vw', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}} sx = {{marginLeft: '7vw'}}>
                                                        {shop_map[i].map((j, index_2) => (
                                                            <React.Fragment key = {index_2}>
                                                                {j}
                                                            </React.Fragment>
                                                        ))}
                                                    </Box>
                                                ))}
                                            </Carousel>
                                    }
                                </Box>
                            :
                                <Box style = {{width: '85%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} mt = '3%'>
                                    {shop_list.length === 1 ?
                                        <Carousel height = {width * 0.60} indicators = {false} navButtonsAlwaysInvisible sx = {{width: '100%'}}>
                                            {shop_list.map((i, index) => (
                                                i
                                            ))}
                                        </Carousel>
                                    :
                                        shop_list.length === 2 ?
                                            <Carousel height = {width * 0.60} animation = 'slide' duration = {800} onChange = {(event) => setPage1(!page1)} index = {1} changeOnFirstRender autoPlay = {false} swipe = {false} navButtonsAlwaysVisible navButtonsProps = {{style: {width: '3.5vh', height: '3.5vh', color: 'white', backgroundColor: 'rgba(81, 81, 81, 1)', filter: 'none', ':hover': {backgroundColor: 'rgba(197, 197, 197, 1)'}}}} indicatorContainerProps = {{style: {height: height * 0.10, display: 'flex', flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center'}}} indicatorIconButtonProps = {{style: {color: 'rgba(197, 197, 197, 1)', pointerEvents: 'none', cursor: 'default'}}} activeIndicatorIconButtonProps = {{style: {color: 'rgba(81, 81, 81, 1)', pointerEvents: 'none', cursor: 'default'}}} sx = {{width: '100%', transition: 'none', '& .css-hn784z button': {visibility: page1 ? 'hidden' : 'visible'}, '& .css-1abc02a button': {visibility: page1 ? 'visible' : 'hidden'}, '& .css-hn784z:hover button': {opacity: 1}, '& .css-1abc02a:hover button': {opacity: 1}}}>
                                                {shop_list.map((i, index) => (
                                                    i
                                                ))}
                                            </Carousel>
                                        :

                                            <Carousel height = {width * 0.60} animation = 'slide' duration = {800} cycleNavigation = {false} changeOnFirstRender autoPlay = {false} navButtonsAlwaysVisible navButtonsProps = {{style: {width: '3.5vh', height: '3.5vh', color: 'white', backgroundColor: 'rgba(81, 81, 81, 1)', filter: 'none', ':hover': {backgroundColor: 'rgba(81, 81, 81, 1)'}}}} indicatorContainerProps = {{style: {height: height * 0.10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}} indicatorIconButtonProps = {{style: {color: 'rgba(197, 197, 197, 1)', pointerEvents: 'none', cursor: 'default'}}} activeIndicatorIconButtonProps = {{style: {color: 'rgba(81, 81, 81, 1)', pointerEvents: 'none', cursor: 'default'}}} sx = {{width: '100%', transition: 'none', '& .css-hn784z:hover button': {opacity: '1!important'}, '& .css-1abc02a:hover button': {opacity: '1!important'}}}>
                                                {shop_list.slice(0, 10).map((i, index) => (
                                                    i
                                                ))}
                                            </Carousel>
                                    }
                                </Box>
                            }
                        </>
                    :
                        null
                    }
                </Box>
            </div>
        </>
    );
};


export default BlogPage;