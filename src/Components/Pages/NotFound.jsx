import {useEffect, useState} from 'react';
import {InView} from 'react-intersection-observer';
import {Fade} from 'react-awesome-reveal';
import {Helmet} from 'react-helmet-async';

import {Box, Typography} from '@mui/material';


const NotFound = () => {
    const width = useState(window.innerWidth)[0];
    const height = useState(window.innerHeight)[0];

    const [line, setLine] = useState(false);
    const [position, setPosition] = useState(0);

    const handlePositionY = () => {
        setPosition(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener("scroll", handlePositionY);

        return () => {
            window.removeEventListener("scroll", handlePositionY);
        };
    }, []);

    if (width < 750) {
        return (
            <>
                <Helmet>
                    <title>
                        Not Found | The Herbal Digest
                    </title>
                </Helmet>
                <div>
                    <Box style = {{width: width, height: height * 0.875, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688681933/Salt_flats_error_ujluum.avif'})`, backgroundSize: 'cover',  backgroundPosition: 'center'}}>
                        <Box style = {{width: width, height: height * 0.875, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                            <Box style = {{width: width, height: height * 0.75, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Fade duration = {1500}>
                                    <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        404
                                    </Typography>
                                </Fade>
                                <InView onChange = {(inView, entry) => setLine(!line)}>
                                    <Box style = {{width: line ? width * 0.40 : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '6%' mb = '6%' />
                                </InView>
                                <Fade duration = {3000}>
                                    <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' style = {{width: width * 0.80}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        oops! page not found
                                    </Typography>
                                </Fade>
                            </Box>
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
                    Not Found | The Herbal Digest
                </title>
            </Helmet>
            <div>
                <Box style = {{width: '100vw', height: '115vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}} mb = '-15vh'>
                    <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688681933/Salt_flats_error_ujluum.avif'})`, backgroundSize: 'cover',  backgroundPositionX: 'center', backgroundPositionY: -position * 0.5, backgroundAttachment: 'fixed'}}>
                        <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{background: 'rgba(0, 0, 0, 0.30)'}}>
                            <Fade duration = {1500}>
                                <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px black'}}>
                                    404
                                </Typography>
                            </Fade>
                            <InView onChange = {(inView, entry) => setLine(!line)}>
                                <Box style = {{width: line ? '40vw' : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '3%' mb = '3%' />
                            </InView>
                            <Fade duration = {3000}>
                                <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' width = {'75vw'} sx = {{textShadow: '0px 0px 10px black'}}>
                                    oops! page not found
                                </Typography>
                            </Fade>
                        </Box>
                    </Box>
                </Box>
            </div>
        </>
    );
};


export default NotFound;