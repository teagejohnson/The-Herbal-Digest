import {useEffect, useState} from 'react';
import {InView} from 'react-intersection-observer';
import {Fade} from 'react-awesome-reveal';
import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';

import {Box, Typography} from '@mui/material';
import {FacebookOutlined, Instagram, Twitter} from '@mui/icons-material';


const Contact = () => {
    const width = useState(window.innerWidth)[0];
    const height = useState(window.innerHeight)[0];

    const [line, setLine] = useState(false);
    const [position, setPosition] = useState(0);

    const handlePositionY = () => {
        setPosition(window.scrollY);
    }

    useEffect(() => {
        window.scrollTo({top: 0});
        
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
                        Contact | The Herbal Digest
                    </title>
                    <meta name = 'description' content = 'Get in touch for general inquiries or business partnerships.' />
                    <meta property = 'og:title' content = 'Contact | The Herbal Digest' />
                    <meta property = 'og:description' content = 'Get in touch for general inquiries or business partnerships.' />
                    <meta name = 'twitter:title' content = 'Contact | The Herbal Digest' />
                    <meta name = 'twitter:description' content = 'Get in touch for general inquiries or business partnerships.' />
                </Helmet>
                <div>
                    <Box style = {{width: width, height: height * 0.625, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688632504/Flowers_contact_frjhtb.avif'})`, backgroundSize: 'cover',  backgroundPosition: 'center'}}>
                        <Box style = {{width: width, height: height * 0.625, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                            <Box style = {{width: width, height: height * 0.50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Fade duration = {1500}>
                                    <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        Contact
                                    </Typography>
                                </Fade>
                                <InView onChange = {(inView, entry) => setLine(!line)}>
                                    <Box style = {{width: line ? width * 0.40 : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '6%' mb = '6%' />
                                </InView>
                                <Fade duration = {3000}>
                                    <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' style = {{width: width * 0.80}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        get in touch
                                    </Typography>
                                </Fade>
                            </Box>
                        </Box>
                    </Box>
                    <Box style = {{width: width, height: height * 0.50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                        <Typography variant = 'h3' mb = '1.5%'>
                            General Inquiries
                        </Typography>
                        <Link to = 'mailto:contact@theherbaldigest.com' style = {{color: 'black', textDecoration: 'none'}}>
                            <Typography variant = 'body1'>
                                contact@theherbaldigest.com
                            </Typography>
                        </Link>
                        <Typography variant = 'h3' mt = '9%' mb = '1.5%'>
                            Business Partnerships
                        </Typography>
                        <Link to = 'mailto:partnerships@theherbaldigest.com' style = {{color: 'black', textDecoration: 'none'}}>
                            <Typography variant = 'body1'>
                                partnerships@theherbaldigest.com
                            </Typography>
                        </Link>
                        <Typography variant = 'h3' mt = '9%' mb = '1.5%'>
                            Follow us on Social Media
                        </Typography>
                        <Box style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Link to = 'https://www.instagram.com/theherbaldigest/' aria-label = 'instagram' style = {{color: 'black', textDecoration: 'none'}}>
                                <Instagram style = {{fontSize: 25}} />
                            </Link>
                            <Link to = 'https://www.facebook.com/theherbaldigest' aria-label = 'facebook' style = {{color: 'black', textDecoration: 'none'}}>
                                <FacebookOutlined style = {{fontSize: 25, marginLeft: 5, marginRight: 5}} />
                            </Link>
                            <Link to = 'https://twitter.com/theherbaldigest' aria-label = 'twitter' style = {{color: 'black', textDecoration: 'none'}}>
                                <Twitter style = {{fontSize: 25}} />
                            </Link>
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
                    Contact | The Herbal Digest
                </title>
                <meta name = 'description' content = 'Get in touch for general inquiries or business partnerships.' />
                <meta property = 'og:title' content = 'Contact | The Herbal Digest' />
                <meta property = 'og:description' content = 'Get in touch for general inquiries or business partnerships.' />
                <meta name = 'twitter:title' content = 'Contact | The Herbal Digest' />
                <meta name = 'twitter:description' content = 'Get in touch for general inquiries or business partnerships.' />
            </Helmet>
            <div>
                <Box style = {{width: '100vw', height: '115vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688632504/Flowers_contact_frjhtb.avif'})`, backgroundSize: 'cover',  backgroundPositionX: 'center', backgroundPositionY: -position * 0.5, backgroundAttachment: 'fixed'}}>
                        <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                            <Fade duration = {1500}>
                                <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px black'}}>
                                    Contact
                                </Typography>
                            </Fade>
                            <InView onChange = {(inView, entry) => setLine(!line)}>
                                <Box style = {{width: line ? '40vw' : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '3%' mb = '3%' />
                            </InView>
                            <Fade duration = {3000}>
                                <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' style = {{width: '75vw'}} sx = {{textShadow: '0px 0px 10px black'}}>
                                    get in touch
                                </Typography>
                            </Fade>
                        </Box>
                    </Box>
                </Box>
                <Box position = 'relative' style = {{width: '100vw', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}} mt = '-15vh'>
                    <Box style = {{width: '90%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Box style = {{width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Typography variant = 'h3' mb = '1.5%'>
                                General Inquiries
                            </Typography>
                            <Link to = 'mailto:contact@theherbaldigest.com' style = {{color: 'black', textDecoration: 'none'}}>
                                <Typography variant = 'body1' sx = {{':hover': {color: '#8b8b8b'}}}>
                                    contact@theherbaldigest.com
                                </Typography>
                            </Link>
                            <Typography variant = 'h3' mt = '4.5%' mb = '1.5%'>
                                Business Partnerships
                            </Typography>
                            <Link to = 'mailto:partnerships@theherbaldigest.com' style = {{color: 'black', textDecoration: 'none'}}>
                                <Typography variant = 'body1' sx = {{':hover': {color: '#8b8b8b'}}}>
                                    partnerships@theherbaldigest.com
                                </Typography>
                            </Link>
                        </Box>
                        <Box style = {{width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Typography variant = 'h3' mt = '4.5%' mb = '1.5%'>
                                Follow us on Social Media
                            </Typography>
                            <Box style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <Link to = 'https://www.instagram.com/theherbaldigest/' aria-label = 'instagram' style = {{color: 'black', textDecoration: 'none'}}>
                                    <Instagram style = {{fontSize: '3vw', margin: '0.5vw'}} sx = {{':hover': {color: '#8b8b8b'}}} />
                                </Link>
                                <Link to = 'https://www.facebook.com/theherbaldigest' aria-label = 'facebook' style = {{color: 'black', textDecoration: 'none'}}>
                                    <FacebookOutlined style = {{fontSize: '3vw', margin: '0.5vw'}} sx = {{':hover': {color: '#8b8b8b'}}} />
                                </Link>
                                <Link to = 'https://twitter.com/theherbaldigest' aria-label = 'twitter' style = {{color: 'black', textDecoration: 'none'}}>
                                    <Twitter style = {{fontSize: '3vw', margin: '0.5vw'}} sx = {{':hover': {color: '#8b8b8b'}}} />
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </div>
        </>
    );
};


export default Contact;