import {useEffect, useState} from 'react';
import {InView} from 'react-intersection-observer';
import {Fade} from 'react-awesome-reveal';
import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';

import {AppBar, Box, Button, Collapse, Typography} from '@mui/material';

import {doc, onSnapshot} from 'firebase/firestore';

import db from '../../firebase.js';


const Blog = () => {
    const width = useState(window.innerWidth)[0];
    const height = useState(window.innerHeight)[0];

    const [data, setData] = useState('loading');
    const [categories, setCategories] = useState('loading');

    const [fadeIn, setFadeIn] = useState({});
    const [line, setLine] = useState(false);
    const [position, setPosition] = useState(0);

    const handleMouseOver = (key) => {
        setFadeIn({fadeIn, [key]: true});
    };

    const handleMouseLeave = (key) => {
        setFadeIn({fadeIn, [key]: false});
    };

    const handlePositionY = () => {
        setPosition(window.scrollY);
    };

    const handleClick = (event, key) => {
        event.preventDefault();

        const categories_new = {};

        Object.entries(categories).map((i, index) => (
            i[0] === key ?
                categories_new[i[0]] = !i[1]
            :
                categories_new[i[0]] = i[1]
        ));

        categories_new['None'] = 0;

        Object.entries(categories_new).map((i, index) => (
            i[0] !== 'None' ?
                categories_new['None'] += i[1]
            :
                null
        ));

        if (categories_new['None'] === 0) {
            categories_new['None'] = true;
        }

        else {
            categories_new['None'] = false;
        }

        setCategories(categories_new);

        return;
    };

    const handleFilter = (item) => {
        if (categories['None']) {
            return true;
        }

        else {
            return categories[item[1].category];
        }
    };

    useEffect(() => {
        window.scrollTo({top: 0});
        
        window.addEventListener("scroll", handlePositionY);

        onSnapshot(doc(db, 'glossary', 'blog'), (doc) => {
            setData(doc.data());

            const categories_init = {};
            
            Object.entries(doc.data()).map((i) => (
                categories_init[i[1].category] = false
            ));

            categories_init['None'] = true;

            setCategories(categories_init);
        });

        return () => {
            window.removeEventListener("scroll", handlePositionY);
        };
    }, []);

    if (data === 'loading' || categories === 'loading') {
        return null;
    }
    
    if (width < 750) {
        return (
            <>
                <Helmet>
                    <title>
                        Blog | The Herbal Digest
                    </title>
                    <meta name = 'description' content = 'Discover plant-based treatments, naturopathic insights, and expert interviews in our engaging and informative blog.' />
                    <meta property = 'og:title' content = 'Blog | The Herbal Digest' />
                    <meta property = 'og:description' content = 'Discover plant-based treatments, naturopathic insights, and expert interviews in our engaging and informative blog.' />
                    <meta name = 'twitter:title' content = 'Blog | The Herbal Digest' />
                    <meta name = 'twitter:description' content = 'Discover plant-based treatments, naturopathic insights, and expert interviews in our engaging and informative blog.' />
                </Helmet>
                <div>
                    <Box style = {{width: width, height: height * 0.625, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688629238/Seeds_diy_q7y8kr.avif'})`, backgroundSize: 'cover',  backgroundPosition: 'center'}}>
                        <Box style = {{width: width, height: height * 0.625, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)', borderBottom: 1, borderColor: 'white'}}>
                            <Box style = {{width: width, height: height * 0.50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Fade duration = {1500}>
                                    <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        Blog
                                    </Typography>
                                </Fade>
                                <InView onChange = {(inView, entry) => setLine(!line)}>
                                    <Box style = {{width: line ? width * 0.40 : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '6%' mb = '6%' />
                                </InView>
                                <Fade duration = {3000}>
                                    <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' style = {{width: width * 0.80}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        diy treatments, naturopathic insights, and expert interviews
                                    </Typography>
                                </Fade>
                            </Box>
                        </Box>
                    </Box>
                    <AppBar position = 'sticky' style = {{width: width, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', overflowX: 'scroll', backgroundColor: 'rgba(23, 23, 23, 0.90)', backdropFilter: 'blur(2.5px)'}} sx = {{zIndex: 1, top: '12.5vh'}}>
                        {Object.entries(categories).sort((a, b) => a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0).map((i, index) => (
                            i[0] !== 'None' ?
                                <Box key = {index} style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}} m = '1vh'>
                                    <Button onClick = {(event) => handleClick(event, i[0])} style = {{whiteSpace: 'nowrap', borderRadius: 150, margin: 0, paddingLeft: '1.5vh', paddingRight: '1.5vh', paddingTop: '0.75vh', paddingBottom: '0.75vh'}} sx = {{color: categories['None'] || !i[1] ? 'white' : '#171717', backgroundColor: categories['None'] || !i[1] ? 'transparent' : 'white', border: 1, borderRadius: 150, transitionDuration: '0s', ':hover': {backgroundColor: categories['None'] || !i[1] ? 'transparent' : 'white'}}}>
                                        <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontWeight = 'lighter'>
                                            {i[0]}
                                        </Typography>
                                    </Button>
                                </Box>
                            :
                                null
                        ))}
                    </AppBar>
                    <Box style = {{width: width, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap'}}>
                        {Object.entries(data).filter(x => handleFilter(x)).sort((a, b) => a[1].timestamp.toDate() < b[1].timestamp.toDate() ? 1 : a[1].timestamp.toDate() > b[1].timestamp.toDate() ? -1 : 0).map((i, index) => (
                            <Link key = {index} to = {'/blog/' + i[1].slug} style = {{textDecoration: 'none'}}>
                                <Box style = {{width: width, height: width, display: 'grid'}}> 
                                    <img src = {i[1].image} alt = {i[1].alt_text} style = {{position: 'absolute', width: width, height: width, objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.70)'}} />
                                    <Box position = 'relative' style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <Box style = {{width: '95%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', color: 'white'}}>
                                            <Typography variant = 'body1'  fontFamily = 'Segoe UI, sans-serif' fontSize = '1.75vh' fontWeight = 'lighter' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                                {i[1].timestamp.toDate().toLocaleDateString(undefined, {'month': 'long', 'day': 'numeric', 'year': 'numeric'})}
                                            </Typography>
                                            <Typography variant = 'body1'  fontFamily = 'Segoe UI, sans-serif' fontSize = '3vh' align = 'center' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                                {i[1].title}
                                            </Typography>
                                            <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '2vh' fontWeight = 'lighter' align = 'center' sx = {{display: '-webkit-box', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                                {i[1].description}
                                            </Typography>
                                            <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '1.75vh' fontWeight = 'lighter' fontStyle = 'italic' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                                {i[1].category}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant = 'body2' style = {{position: 'absolute', color: '#bababa', justifySelf: 'flex-start', alignSelf: 'flex-end'}} sx = {{paddingLeft: 0.5, textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        {i[1].attribution}
                                    </Typography>
                                </Box>
                            </Link>
                        ))}
                    </Box>
                </div>
            </>
        );
    };

    return (
        <>
            <Helmet>
                <title>
                    Blog | The Herbal Digest
                </title>
                <meta name = 'description' content = 'Discover plant-based treatments, naturopathic insights, and expert interviews in our engaging and informative blog.' />
                <meta property = 'og:title' content = 'Blog | The Herbal Digest' />
                <meta property = 'og:description' content = 'Discover plant-based treatments, naturopathic insights, and expert interviews in our engaging and informative blog.' />
                <meta name = 'twitter:title' content = 'Blog | The Herbal Digest' />
                <meta name = 'twitter:description' content = 'Discover plant-based treatments, naturopathic insights, and expert interviews in our engaging and informative blog.' />
            </Helmet>
            <div>
                <Box style = {{width: '100vw', height: '115vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688629238/Seeds_diy_q7y8kr.avif'})`, backgroundSize: 'cover',  backgroundPositionX: 'center', backgroundPositionY: -position * 0.5, backgroundAttachment: 'fixed'}}>
                        <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)', borderBottom: 1, borderColor: 'white'}}>
                            <Fade duration = {1500}>
                                <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px black'}}>
                                    Blog
                                </Typography>
                            </Fade>
                            <InView onChange = {(inView, entry) => setLine(!line)}>
                                <Box style = {{width: line ? '40vw' : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '3%' mb = '3%' />
                            </InView>
                            <Fade duration = {3000}>
                                <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' style = {{width: '75vw'}} sx = {{textShadow: '0px 0px 10px black'}}>
                                    at-home treatments, naturopathic insights, and expert interviews
                                </Typography>
                            </Fade>
                        </Box>
                    </Box>
                </Box>
                <AppBar position = 'sticky' style = {{width: '100vw', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(23, 23, 23, 0.90)', backdropFilter: 'blur(2.5px)'}} sx = {{zIndex: 1, top: '15vh', marginTop: '-15vh'}}>
                    {Object.entries(categories).sort((a, b) => a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0).map((i, index) => (
                        i[0] !== 'None' ?
                            <Box key = {index} style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}} m = '1vw'>
                                <Button onClick = {(event) => handleClick(event, i[0])} style = {{borderRadius: 150, margin: 0, paddingLeft: '1.5vw', paddingRight: '1.5vw', paddingTop: '0.75vw', paddingBottom: '0.75vw'}} sx = {{color: categories['None'] || !i[1] ? 'white' : '#171717', backgroundColor: categories['None'] || !i[1] ? 'transparent' : 'white', border: 1, borderRadius: 150, transitionDuration: '0s', ':hover': {color: '#8b8b8b', backgroundColor: categories['None'] || !i[1] ? 'transparent' : 'white'}}}>
                                    <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontWeight = 'lighter'>
                                        {i[0]}
                                    </Typography>
                                </Button>
                            </Box>
                        :
                            null
                    ))}
                </AppBar>
                <Box position = 'relative' style = {{width: '100vw', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap'}}>
                    {Object.entries(data).filter(x => handleFilter(x)).sort((a, b) => a[1].timestamp.toDate() < b[1].timestamp.toDate() ? 1 : a[1].timestamp.toDate() > b[1].timestamp.toDate() ? -1 : 0).map((i, index) => (
                        <Fade duration = {1500}>
                            <Link key = {index} to = {'/blog/' + i[1].slug} style = {{textDecoration: 'none'}}>
                                <Box style = {{width: '33.33vw', height: '33.33vw', display: 'grid'}}> 
                                    <img src = {i[1].image} alt = {i[1].alt_text} style = {{position: 'absolute', width: '33.33vw', height: '33.33vw', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.70)'}} />
                                    <Box position = 'relative' onMouseOver = {(event) => handleMouseOver(index)} onMouseLeave = {(event) => handleMouseLeave(index)} style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{transition: 'background-color 0.5s linear', ':hover': {backgroundColor: 'rgba(0, 0, 0, 0.50)'}}}>
                                        <Box style = {{width: '95%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'}}>    
                                            <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '1.5vw' fontWeight = 'lighter' sx = {{textShadow: '0px 0px 10px black'}}>
                                                {i[1].timestamp.toDate().toLocaleDateString(undefined, {'month': 'long', 'day': 'numeric', 'year': 'numeric'})}
                                            </Typography>
                                            <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '2.25vw' align = 'center' sx = {{textShadow: '0px 0px 10px black'}} mt = '9%'>
                                                {i[1].title}
                                            </Typography>
                                            <Box style = {{width: fadeIn[index] ? '40%' : '0%'}} sx = {{borderTop: 1, borderColor: 'white', transition: 'width 0.5s ease-out'}} mt = '6%' mb = '6%' />
                                            <Collapse in = {fadeIn[index]} timeout = {500}>   
                                                <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '1.5vw' fontWeight = 'lighter' align = 'center' sx = {{display: '-webkit-box', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: '4', WebkitBoxOrient: 'vertical', textShadow: '0px 0px 10px black'}} mb = '9%'>
                                                    {i[1].description}
                                                </Typography>
                                            </Collapse>
                                            <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '1.5vw' fontWeight = 'lighter' fontStyle = 'italic' sx = {{textShadow: '0px 0px 10px black'}}>
                                                {i[1].category}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant = 'body2' style = {{position: 'absolute', color: '#bababa', justifySelf: 'flex-start', alignSelf: 'flex-end'}} sx = {{paddingLeft: 0.5, textShadow: '0px 0px 10px black'}}>
                                        {i[1].attribution}
                                    </Typography>
                                </Box>
                            </Link>
                        </Fade>
                    ))}

                </Box>
            </div>
        </>
    );
};


export default Blog;