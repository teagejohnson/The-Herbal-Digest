import React, {useEffect, useRef, useState} from 'react';
import {InView} from 'react-intersection-observer';
import {Fade} from 'react-awesome-reveal';
import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';

import {AppBar, Box, Collapse, Typography} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import {doc, onSnapshot} from 'firebase/firestore';

import db from '../../firebase.js';


const Botanicals = () => {
    const width = useState(window.innerWidth)[0];
    const height = useState(window.innerHeight)[0];

    const refList = useRef({});

    const [data, setData] = useState('loading');
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

    const handleScroll = (ref) => {
        window.scrollTo({
            top: ref.offsetTop - window.innerHeight * 0.15 - window.innerWidth * 0.045,
            behavior: 'smooth',
        });
    };

    const handleScrollMobile = (ref) => {
        window.scrollTo({
            top: ref.offsetTop - height * 0.18,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.scrollTo({top: 0});
        
        window.addEventListener("scroll", handlePositionY);

        onSnapshot(doc(db, 'glossary', 'botanicals'), (doc) => {
            setData(doc.data());

            Object.entries(doc.data()).map((i) => (
                refList[i[1].title[0]] = null
            ));
        });

        return () => {
            window.removeEventListener("scroll", handlePositionY);
        };
    }, []);

    if (data === 'loading') {
        return null;
    }

    if (width < 750) {
        return (
            <>
                <Helmet>
                    <title>
                        Botanicals | The Herbal Digest
                    </title>
                    <meta name = 'description' content = 'Explore different plant species, their medicinal properties, and applications in herbal medicine.' />
                    <meta property = 'og:title' content = 'Botanicals | The Herbal Digest' />
                    <meta property = 'og:description' content = 'Explore different plant species, their medicinal properties, and applications in herbal medicine.' />
                    <meta name = 'twitter:title' content = 'Botanicals | The Herbal Digest' />
                    <meta name = 'twitter:description' content = 'Explore different plant species, their medicinal properties, and applications in herbal medicine.' />
                </Helmet>
                <div>
                    <Box style = {{width: width, height: height * 0.625, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688629238/Leaves_botanicals_fe0t6z.avif'})`, backgroundSize: 'cover',  backgroundPosition: 'center'}}>
                        <Box style = {{width: width, height: height * 0.625, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)', borderBottom: 1, borderColor: 'white'}}>
                            <Box style = {{width: width, height: height * 0.50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Fade duration = {1500}>
                                    <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        Botanicals
                                    </Typography>
                                </Fade>
                                <InView onChange = {(inView, entry) => setLine(!line)}>
                                    <Box style = {{width: line ? width * 0.40 : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '6%' mb = '6%' />
                                </InView>
                                <Fade duration = {3000}>
                                    <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' style = {{width: width * 0.80}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        glossary of plant species and potential applications
                                    </Typography>
                                </Fade>
                            </Box>
                        </Box>
                    </Box>
                    <AppBar position = 'sticky' style = {{width: width, display: 'flex', flexDirection: 'row', justifyContent: Object.keys(refList).length > 8 ? 'flex-start' : 'center', alignItems: 'center', overflowX: 'scroll', backgroundColor: 'rgba(23, 23, 23, 0.90)', backdropFilter: 'blur(2.5px)'}} sx = {{zIndex: 1, top: height * 0.125}}>
                        {Object.keys(refList).sort().map((i, index) => (
                            i !== 'current' ?
                                <>
                                    <Link key = {index} onClick = {() => handleScrollMobile(refList[i])} style = {{color: 'white', textDecoration: 'none'}}>
                                        <Box style = {{width: height * 0.045, height: height * 0.045, display: 'flex', justifyContent: 'center', alignItems: 'center'}} sx = {{border: 1, borderRadius: 2}} margin = '0.5vh'>
                                            <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '2.5vh' fontWeight = 'lighter' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                                {i}
                                            </Typography>
                                        </Box>
                                    </Link>
                                </>
                            :
                                null
                            ))}
                    </AppBar>
                    <Box style = {{width: width, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap'}}>
                        {Object.entries(data).sort().map((i, index) => (
                            <React.Fragment key = {index}>
                                {index === 0 || i[1].title[0] !== Object.entries(data).sort()[index - 1][1].title[0] ?    
                                    <Box ref = {el => refList[i[1].title[0]] = el} style = {{width: width / 3, height: width / 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
                                        <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688634963/Palm_fronds_botanicals_aqblfz.avif' alt = 'Layered palm fronds in a dark setting' style = {{position: 'absolute', width: width / 3, height: width / 3, objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.55)'}} />
                                        <Typography position = 'relative' variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '2.75vh' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                            {i[1].title[0]}
                                        </Typography>
                                    </Box>
                                :
                                    null
                                }
                                <Link to = {'/botanicals/' + i[1].slug} style = {{textDecoration: 'none'}}>
                                    <Box style = {{width: width / 3, height: width / 3, display: 'grid'}}>
                                        <img src = {i[1].image} alt = {i[1].alt_text} style = {{position: 'absolute', width: width / 3, height: width / 3, objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.70)'}} />
                                        <Box position = 'relative' style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
                                            <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '2.25vh' align = 'center' style ={{width: width / 3 * 0.95}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                                {i[1].title}
                                            </Typography>
                                        </Box>
                                        <Typography variant = 'body2' style = {{position: 'absolute', color: '#bababa', justifySelf: 'flex-start', alignSelf: 'flex-end'}} sx = {{paddingLeft: 0.5, textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                            {i[1].attribution}
                                        </Typography>
                                    </Box>
                                </Link>
                            </React.Fragment>
                        ))}
                        <Link onClick = {() => window.scrollTo({top: height * 0.50, behavior: 'smooth'})} style = {{textDecoration: 'none'}}>
                            <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688634963/Palm_fronds_botanicals_aqblfz.avif' alt = 'Layered palm fronds in a dark setting' style = {{position: 'absolute', width: width / 3, height: width / 3, objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.70)'}} />
                            <Box position = 'relative' style = {{width: width / 3, height: width / 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
                                <ArrowUpwardIcon style = {{fontSize: '2.75vh'}} />
                            </Box>
                        </Link>
                    </Box>
                </div>
            </>
        );
    };

    return (
        <>
            <Helmet>
                <title>
                    Botanicals | The Herbal Digest
                </title>
                <meta name = 'description' content = 'Explore different plant species, their medicinal properties, and applications in herbal medicine.' />
                <meta property = 'og:title' content = 'Botanicals | The Herbal Digest' />
                <meta property = 'og:description' content = 'Explore different plant species, their medicinal properties, and applications in herbal medicine.' />
                <meta name = 'twitter:title' content = 'Botanicals | The Herbal Digest' />
                <meta name = 'twitter:description' content = 'Explore different plant species, their medicinal properties, and applications in herbal medicine.' />
            </Helmet>
            <div>
                <Box style = {{width: '100vw', height: '115vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688629238/Leaves_botanicals_fe0t6z.avif'})`, backgroundSize: 'cover',  backgroundPositionX: 'center', backgroundPositionY: -position * 0.5, backgroundAttachment: 'fixed'}}>
                        <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)', borderBottom: 1, borderColor: 'white'}}>
                            <Fade duration = {1500}>
                                <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px black'}}>
                                    Botanicals
                                </Typography>
                            </Fade>
                            <InView onChange = {(inView, entry) => setLine(!line)}>
                                <Box style = {{width: line ? '40vw' : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '3%' mb = '3%' />
                            </InView>
                            <Fade duration = {3000}>
                                <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' style = {{width: '75vw'}} sx = {{textShadow: '0px 0px 10px black'}}>
                                    glossary of plant species and potential applications
                                </Typography>
                            </Fade>
                        </Box>
                    </Box>
                </Box>
                <AppBar position = 'sticky' style = {{width: '100vw', display: 'flex', flexDirection: 'row', justifyContent: Object.keys(refList).length > 15 ? 'flex-start' : 'center', alignItems: 'center', overflowX: 'scroll', backgroundColor: 'rgba(23, 23, 23, 0.90)', backdropFilter: 'blur(2.5px)'}} sx = {{zIndex: 1, top: '15vh', marginTop: '-15vh'}}>
                    {Object.keys(refList).sort().map((i, index) => (
                        i !== 'current' ?
                            <Link key = {index} onClick = {() => handleScroll(refList[i])} style = {{color: 'white', textDecoration: 'none'}}>
                                <Box style = {{width: '3vw', height: '3vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}} sx = {{border: 1, borderRadius: 2, ':hover': {color: '#8b8b8b'}}} margin = '0.75vw'>
                                    <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '2.25vw' fontWeight = 'lighter' sx = {{textShadow: '0px 0px 10px black'}}>
                                        {i}
                                    </Typography>
                                </Box>
                            </Link>
                        :
                            null
                        ))}
                </AppBar>
                <Box style = {{width: '100vw', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap'}}>
                    {Object.entries(data).sort().map((i, index) => (
                        <React.Fragment key = {index}>
                            {index === 0 || i[1].title[0] !== Object.entries(data).sort()[index - 1][1].title[0] ?    
                                <Box ref = {el => refList[i[1].title[0]] = el} style = {{width: '20vw', height: '20vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <Fade duration = {1500}>
                                        <Box style = {{width: '20vw', height: '20vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
                                            <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688634963/Palm_fronds_botanicals_aqblfz.avif' alt = 'Layered palm fronds in a dark setting' style = {{position: 'absolute', width: '20vw', height: '20vw', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.55)'}} />
                                            <Typography position = 'relative' variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '4vw' sx = {{textShadow: '0px 0px 10px black'}}>
                                                {i[1].title[0]}
                                            </Typography>
                                        </Box>
                                    </Fade>
                                </Box>
                            :
                                null
                            }
                            <Fade duration = {1500}>
                                <Link to = {'/botanicals/' + i[1].slug} style = {{textDecoration: 'none'}}>
                                    <Box style = {{width: '20vw', height: '20vw', display: 'grid'}}>
                                        <img src = {i[1].image} alt = {i[1].alt_text} style = {{position: 'absolute', width: '20vw', height:'20vw', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.70)'}} />
                                        <Box position = 'relative' onMouseOver = {(event) => handleMouseOver(index)} onMouseLeave = {(event) => handleMouseLeave(index)} style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'}} sx = {{transition: 'background-color 0.5s linear', ':hover': {backgroundColor: 'rgba(0, 0, 0, 0.50)'}}}>
                                            <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '2.75vw' align = 'center' style ={{width: '18vw'}} sx = {{textShadow: '0px 0px 10px black'}}>
                                                {i[1].title}
                                            </Typography>
                                            <Box style = {{width: fadeIn[index] ? '40%' : '0%'}} sx = {{borderTop: 1, borderColor: 'white', transition: 'width 0.5s ease-out'}} mt = '4.5%' mb = '4.5%' />
                                            <Collapse in = {fadeIn[index]} timeout = {500}>   
                                                <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '1.75vw' fontWeight = 'lighter' fontStyle = 'italic' align = 'center' style = {{width: '15vw'}} sx = {{textShadow: '0px 0px 10px black'}}>
                                                    {i[1].scientific_name}
                                                </Typography>
                                            </Collapse>
                                        </Box>
                                        <Typography variant = 'body2' style = {{position: 'absolute', color: '#bababa', justifySelf: 'flex-start', alignSelf: 'flex-end'}} sx = {{paddingLeft: 0.5, textShadow: '0px 0px 10px black'}}>
                                            {i[1].attribution}
                                        </Typography>
                                    </Box>
                                </Link>
                            </Fade>
                        </React.Fragment>
                    ))}
                    <Fade duration = {1500}>
                        <Link onClick = {() => window.scrollTo({top: window.innerHeight * 0.85, behavior: 'smooth'})} style = {{textDecoration: 'none'}}>
                            <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688634963/Palm_fronds_botanicals_aqblfz.avif' alt = 'Layered palm fronds in a dark setting' style = {{position: 'absolute', width: '20vw', height: '20vw', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.70)'}} />
                            <Box position = 'relative' style = {{width: '20vw', height: '20vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'}} sx = {{transition: 'background-color 0.5s linear', ':hover': {backgroundColor: 'rgba(0, 0, 0, 0.50)'}}}>
                                <ArrowUpwardIcon style = {{fontSize: '4vw'}} />
                            </Box>
                        </Link>
                    </Fade>
                </Box>
            </div>
        </>
    );
};


export default Botanicals;