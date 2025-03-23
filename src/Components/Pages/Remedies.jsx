import {useEffect, useState} from 'react';
import {InView} from 'react-intersection-observer';
import {Fade} from 'react-awesome-reveal';
import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';

import {Box, Collapse, Typography} from '@mui/material';

import {doc, onSnapshot} from 'firebase/firestore';

import db from '../../firebase.js';


const Remedies = () => {
    const width = useState(window.innerWidth)[0];
    const height = useState(window.innerHeight)[0];

    const [data, setData] = useState('loading');
    const [fadeIn, setFadeIn] = useState({});
    const [line, setLine] = useState(false);
    const [position, setPosition] = useState(0);

    const handleClick = (key) => {
        setFadeIn({fadeIn, [key]: !fadeIn[key]});
    };

    const handleMouseOver = (key) => {
        setFadeIn({fadeIn, [key]: true});
    };

    const handleMouseLeave = (key) => {
        setFadeIn({fadeIn, [key]: false});
    };

    const handlePositionY = () => {
        setPosition(window.scrollY);
    };

    useEffect(() => {
        window.scrollTo({top: 0});
        
        window.addEventListener("scroll", handlePositionY);

        onSnapshot(doc(db, 'glossary', 'remedies'), (doc) => {
            setData(doc.data());
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
                        Remedies | The Herbal Digest
                    </title>
                    <meta name = 'description' content = 'Learn more about common ailments and how botanicals can be used in treatment.' />
                    <meta property = 'og:title' content = 'Remedies | The Herbal Digest' />
                    <meta property = 'og:description' content = 'Learn more about common ailments and how botanicals can be used in treatment.' />
                    <meta name = 'twitter:title' content = 'Remedies | The Herbal Digest' />
                    <meta name = 'twitter:description' content = 'Learn more about common ailments and how botanicals can be used in treatment.' />
                </Helmet>
                <div>
                    <Box style = {{width: width, height: height * 0.625, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688629238/Stopper_remedies_rtcddt.avif'})`, backgroundSize: 'cover',  backgroundPosition: 'center'}}>
                        <Box style = {{width: width, height: height * 0.625, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                            <Box style = {{width: width, height: height * 0.50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Fade duration = {1500}>
                                    <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        Remedies
                                    </Typography>
                                </Fade>
                                <InView onChange = {(inView, entry) => setLine(!line)}>
                                    <Box style = {{width: line ? width * 0.40 : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '6%' mb = '6%' />
                                </InView>
                                <Fade duration = {3000}>
                                    <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' style = {{width: width * 0.80}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        almanac of common ailments and herbal treatments
                                    </Typography>
                                </Fade>
                            </Box>
                        </Box>
                    </Box>
                    <Box position = 'relative' style = {{width: width, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap'}} sx = {{borderTop: 1, borderColor: 'white'}}>
                        {Object.entries(data).sort((a, b) => a[1].title > b[1].title ? 1 : a[1].title < b[1].title ? -1 : 0).map((i, index_1) => (
                            <Box style = {{width: width * 0.50, height: height * 0.375, display: 'flex', flexDirection: 'center', justifyContent: 'center', alignItems: 'center'}}>
                                <img src = {i[1].image} alt = {i[1].alt_text} style = {{position: 'absolute', width: width * 0.50, height: height * 0.375, objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.70'}} />
                                <Box position = 'relative' onClick = {(event) => handleClick(index_1)} style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: fadeIn[index_1] ? 'rgba(0, 0, 0, 0.50)' : 'transparent'}} sx = {{transition: 'background-color 0.5s linear'}}>
                                    <Box style = {{width: '90%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
                                        <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '3vh' align = 'center' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                            {i[1].title}
                                        </Typography>
                                        <Box style = {{width: fadeIn[index_1] ? '40%' : '0%'}} sx = {{borderTop: 1, borderColor: 'white', transition: 'width 0.5s ease-out'}} mt = '4.5%' mb = '4.5%' />
                                        <Collapse in = {fadeIn[index_1]} timeout = {500}>   
                                            {Object.entries(i[1].pages).sort((a, b) => a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0).map((j, index_2) => (
                                                <Link key = {index_2} to = {'/remedies/' + j[1].slug} style = {{color: 'white', textDecoration: 'none'}}>
                                                    <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '2vh' fontWeight = 'lighter' align = 'center' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)', ':hover': {color: '#8b8b8b', textShadow: 'none'}}} mt = '1.5%' mb = '1.5%'>
                                                        {j[1].title}
                                                    </Typography>
                                                </Link>
                                            ))}
                                        </Collapse>
                                    </Box>
                                </Box>
                                <Typography variant = 'body2' style = {{position: 'absolute', width: width * 0.50, color: '#bababa', justifySelf: 'flex-start', alignSelf: 'flex-end'}} sx = {{paddingLeft: 0.5, textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                    {i[1].attribution}
                                </Typography>
                            </Box>
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
                    Remedies | The Herbal Digest
                </title>
                <meta name = 'description' content = 'Learn more about common ailments and how botanicals can be used in treatment.' />
                <meta property = 'og:title' content = 'Remedies | The Herbal Digest' />
                <meta property = 'og:description' content = 'Learn more about common ailments and how botanicals can be used in treatment.' />
                <meta name = 'twitter:title' content = 'Remedies | The Herbal Digest' />
                <meta name = 'twitter:description' content = 'Learn more about common ailments and how botanicals can be used in treatment.' />
            </Helmet>
            <div>
                <Box style = {{width: '100vw', height: '115vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688629238/Stopper_remedies_rtcddt.avif'})`, backgroundSize: 'cover',  backgroundPositionX: 'center', backgroundPositionY: -position * 0.5, backgroundAttachment: 'fixed'}}>
                        <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                            <Fade duration = {1500}>
                                <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px black'}}>
                                    Remedies
                                </Typography>
                            </Fade>
                            <InView onChange = {(inView, entry) => setLine(!line)}>
                                <Box style = {{width: line ? '40vw' : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '3%' mb = '3%' />
                            </InView>
                            <Fade duration = {3000}>
                                <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' style = {{width: '75vw'}} sx = {{textShadow: '0px 0px 10px black'}}>
                                    almanac of common ailments and herbal treatments
                                </Typography>
                            </Fade>
                        </Box>
                    </Box>
                </Box>
                <Box position = 'relative' style = {{width: '100vw', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap'}} sx = {{borderTop: 1, borderColor: 'white'}} mt = '-15vh'>
                    {Object.entries(data).sort((a, b) => a[1].title > b[1].title ? 1 : a[1].title < b[1].title ? -1 : 0).map((i, index_1) => (
                        <Fade key = {index_1} duration = {1500}>
                            <Box style = {{width: '25vw', height: '70vh', display: 'flex', flexDirection: 'center', justifyContent: 'center', alignItems: 'center'}}>
                                <img src = {i[1].image} alt = {i[1].alt_text} style = {{position: 'absolute', width: '25vw', height: '70vh', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.70'}} />
                                <Box position = 'relative' onMouseOver = {(event) => handleMouseOver(index_1)} onMouseLeave = {(event) => handleMouseLeave(index_1)} style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{transition: 'background-color 0.5s linear', ':hover': {backgroundColor: 'rgba(0, 0, 0, 0.50)'}}}>
                                    <Box style = {{width: '90%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
                                        <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '3vw' align = 'center' sx = {{textShadow: '0px 0px 10px black'}}>
                                            {i[1].title}
                                        </Typography>
                                        <Box style = {{width: fadeIn[index_1] ? '40%' : '0%'}} sx = {{borderTop: 1, borderColor: 'white', transition: 'width 0.5s ease-out'}} mt = '4.5%' mb = '4.5%' />
                                        <Collapse in = {fadeIn[index_1]} timeout = {500}>   
                                            {Object.entries(i[1].pages).sort((a, b) => a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0).map((j, index_2) => (
                                                <Link key = {index_2} to = {'/remedies/' + j[1].slug} style = {{color: 'white', textDecoration: 'none'}}>
                                                    <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '2vw' fontWeight = 'lighter' align = 'center' sx = {{textShadow: '0px 0px 10px black', ':hover': {color: '#8b8b8b', textShadow: 'none'}}} mt = '1.5%' mb = '1.5%'>
                                                        {j[1].title}
                                                    </Typography>
                                                </Link>
                                            ))}
                                        </Collapse>
                                    </Box>
                                </Box>
                                <Typography variant = 'body2' style = {{position: 'absolute', width: '25vw', color: '#bababa', justifySelf: 'flex-start', alignSelf: 'flex-end'}} sx = {{paddingLeft: 0.5, textShadow: '0px 0px 10px black'}}>
                                    {i[1].attribution}
                                </Typography>
                            </Box>
                        </Fade>
                    ))}
                </Box>
            </div>
        </>
    );
};


export default Remedies;