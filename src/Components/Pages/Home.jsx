import {useEffect, useState} from 'react';
import {InView} from 'react-intersection-observer';
import {Fade} from 'react-awesome-reveal';
import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';

import {doc, Timestamp, updateDoc} from 'firebase/firestore';

import {Box, Button, Collapse, Paper, TextField, Typography} from '@mui/material';

import db from '../../firebase.js';
import Carousel from 'react-material-ui-carousel';


const Home = () => {
    const width = useState(window.innerWidth)[0];
    const height = useState(window.innerHeight)[0];

    const [line, setLine] = useState(false);
    const [position, setPosition] = useState(0);

    const [completed, setCompleted] = useState(false);
    const [found, setFound] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handlePositionY = () => {
        setPosition(window.scrollY);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setFound(false);

        setFirstNameError(false);
        setLastNameError(false);
        setEmailError(false);

        if (firstName === '') {
            setFirstNameError(true);
        }

        if (lastName === '') {
            setLastNameError(true);
        }

        if (email === '') {
            setEmailError(true);
        }

        if (firstName && lastName && email) {
            // const docReference = doc(db, 'subscribers', 'current');
            // const docSnapshot = await getDoc(docReference)
        
            // if (docSnapshot.data()[email.replace('.', '_')] !== undefined) {
            //     setFound(true);
            // }

            // else {
            await updateDoc(doc(db, 'subscribers', 'current'), {[email.replace('.', '_')]: {first_name: firstName, last_name: lastName, email: email, timestamp: Timestamp.now()}});
            await updateDoc(doc(db, 'subscribers', 'historical'), {[email.replace('.', '_')]: {first_name: firstName, last_name: lastName, email: email, timestamp: Timestamp.now()}});

            setCompleted(true);
            // }

            setFirstName('');
            setLastName('');
            setEmail('');
        }
    };

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
                        The Herbal Digest | Botanicals, Remedies & DIY Treatments
                    </title>
                    <meta name = 'description' content = 'Discover the world of herbal medicine through plant guides, ailment overviews, and home recipes in our comprehensive blog and newsletter.' />
                    <meta property = "og:title" content = 'The Herbal Digest | Botanicals, Remedies & DIY Treatments' />
                    <meta property = "og:description" content = 'Discover the world of herbal medicine through plant guides, ailment overviews, and home recipes in our comprehensive blog and newsletter.' />
                    <meta name = "twitter:title" content = 'The Herbal Digest | Botanicals, Remedies & DIY Treatments' />
                    <meta name = "twitter:description" content = 'Discover the world of herbal medicine through plant guides, ailment overviews, and home recipes in our comprehensive blog and newsletter.' />
                </Helmet>
                <div>
                    <Box style = {{width: width, height: height, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688626616/Trees_home.avif'})`, backgroundSize: 'cover',  backgroundPosition: 'center'}}>
                        <Box style = {{width: width, height: height, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                            <Box style = {{width: width, height: height * 0.95, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Fade duration = {1500}>
                                    <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' align = 'center' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        The
                                    </Typography>
                                    <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' align = 'center' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        Herbal Digest
                                    </Typography>
                                </Fade>
                                <InView onChange = {(inView, entry) => setLine(!line)}>
                                    <Box style = {{width: line ? width * 0.40 : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '12%' mb = '12%' />
                                </InView>
                                <Fade duration = {3000}>
                                    <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' style = {{width: width * 0.80}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        making herbalism digestible
                                    </Typography>
                                </Fade>
                            </Box>
                        </Box>
                    </Box>
                    <Carousel animation = 'slide' duration = {800} autoPlay = {false} navButtonsAlwaysInvisible indicatorContainerProps = {{style: {marginTop: - height * 0.04}}} indicatorIconButtonProps = {{style: {color: 'rgba(197, 197, 197, 1)', zIndex: 1, paddingBottom: height * 0.01}}} activeIndicatorIconButtonProps = {{style: {color: 'rgba(81, 81, 81, 1)'}}} sx = {{borderTop: 2, borderColor: 'white'}}>
                        <Box style = {{width: width, height: width, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white'}}>
                            <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688630582/Bottles_shop_ulcle7.avif' alt = 'Organized shelves of various natural products' style = {{position: 'absolute', width: width, height: width, objectFit: 'cover', objectPosition: 'center', filter: 'saturate(1.5)'}} />
                            <Box position = 'relative' style = {{width: width, height: width, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                                <Typography variant = 'h2' fontFamily = 'Segoe UI, sans-serif' fontSize = '5vh' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                    Shop
                                </Typography>
                                <Typography variant = 'body1' fontSize = '2.5vh' align = 'center' style = {{width: width * 0.80}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}} mt = '4.5%' mb = '4.5%'>
                                    Browse our hand-picked collection of recommended products
                                </Typography>
                                <Link to = '/shop' style = {{color: 'white', textDecoration: 'none'}}>
                                    <Box style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(110, 110, 110, 0.70)'}} sx = {{border: 1, borderRadius: 1.5, borderColor: 'white', padding: 0.75}}>
                                        <Typography variant = 'body1' fontSize = '2vh' fontWeight = 'bold'>
                                            VISIT PAGE
                                        </Typography>
                                    </Box>
                                </Link>
                            </Box>
                        </Box>
                        <Box style = {{width: width, height: width, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white'}}>
                            <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/c_scale,h_1000,q_50/v1688629238/Leaves_botanicals_fe0t6z.avif' alt = 'Green leaves in front of a solid grey background' style = {{position: 'absolute', width: width, height: width, objectFit: 'cover', objectPosition: 'center', filter: 'saturate(1.5)'}} />
                            <Box position = 'relative' style = {{width: width, height: width, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                                <Typography variant = 'h2' fontFamily = 'Segoe UI, sans-serif' fontSize = '5vh' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                    Botanicals
                                </Typography>
                                <Typography variant = 'body1' fontSize = '2.5vh' align = 'center' style = {{width: width * 0.80}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}} mt = '4.5%' mb = '4.5%'>
                                    Discover different plant species, their medicinal properties, and applications in herbal medicine
                                </Typography>
                                <Link to = '/botanicals' style = {{color: 'white', textDecoration: 'none'}}>
                                    <Box style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(110, 110, 110, 0.70)'}} sx = {{border: 1, borderRadius: 1.5, borderColor: 'white', padding: 0.75}}>
                                        <Typography variant = 'body1' fontSize = '2vh' fontWeight = 'bold'>
                                            VISIT PAGE
                                        </Typography>
                                    </Box>
                                </Link>
                            </Box>
                        </Box>
                        <Box style = {{width: width, height: width, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white'}}>
                            <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/c_scale,h_1000,q_50/v1688629238/Stopper_remedies_rtcddt.avif' alt = 'Stopper of botanical remedy in front of a brick background' style = {{position: 'absolute', width: width, height: width, objectFit: 'cover', objectPosition: 'center', filter: 'saturate(1.5)'}} />
                            <Box position = 'relative' style = {{width: width, height: width, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                                <Typography variant = 'h2' fontFamily = 'Segoe UI, sans-serif' fontSize = '5vh' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                    Remedies
                                </Typography>
                                <Typography variant = 'body1' fontSize = '2.5vh' align = 'center' style = {{width: width * 0.80}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}} mt = '4.5%' mb = '4.5%'>
                                    Learn more about common ailments and how botanicals can be used in treatment
                                </Typography>
                                <Link to = '/remedies' style = {{color: 'white', textDecoration: 'none'}}>
                                    <Box style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(110, 110, 110, 0.70)'}} sx = {{border: 1, borderRadius: 1.5, borderColor: 'white', padding: 0.75}}>
                                        <Typography variant = 'body1' fontSize = '2vh' fontWeight = 'bold'>
                                            VISIT PAGE
                                        </Typography>
                                    </Box>
                                </Link>
                            </Box>
                        </Box>
                        <Box style = {{width: width, height: width, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white'}}>
                            <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/c_scale,h_1000,q_30/v1688629238/Seeds_diy_q7y8kr.avif' alt = 'Herbs, seeds, and a lemon on top of a wooden cutting board' style = {{position: 'absolute', width: width, height: width, objectFit: 'cover', objectPosition: 'center', filter: 'saturate(1.5)'}} />
                            <Box position = 'relative' style = {{width: width, height: width, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                                <Typography variant = 'h2' fontFamily = 'Segoe UI, sans-serif' fontSize = '5vh' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                    Blog
                                </Typography>
                                <Typography variant = 'body1' fontSize = '2.5vh' align = 'center' style = {{width: width * 0.80}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}} mt = '4.5%' mb = '4.5%'>
                                    Explore DIY treatments, naturopathic insights, and expert interviews
                                </Typography>
                                <Link to = '/blog' style = {{color: 'white', textDecoration: 'none'}}>
                                    <Box style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(110, 110, 110, 0.70)'}} sx = {{border: 1, borderRadius: 1.5, borderColor: 'white', padding: 0.75}}>
                                        <Typography variant = 'body1' fontSize = '2vh' fontWeight = 'bold'>
                                            VISIT PAGE
                                        </Typography>
                                    </Box>
                                </Link>
                            </Box>
                        </Box>
                    </Carousel>
                    <Box style = {{width: width, height: height * 0.75, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688628735/Apricots_home_cyavyi.avif'})`, backgroundSize: 'cover',  backgroundPosition: 'center'}}  sx = {{borderTop: 2, borderColor: 'white'}}>
                        <Box style = {{width: width, height: height * 0.75, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>                                  
                            {!completed ?
                                <>
                                    <Box style = {{width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} mb = '9%'>
                                        <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '4vh' align = 'center' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}} mb = '1.5%'>
                                            Join the Newsletter
                                        </Typography>
                                        <Typography variant = 'body1' fontSize = '2.25vh' align = 'center' style = {{width: '85%'}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                            Subscribe to The Herbal Digest and get posts delivered directly to your inbox!
                                        </Typography>
                                    </Box>
                                    <Box style = {{width: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <form style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '75%', flexWrap: 'wrap'}} onSubmit = {handleSubmit}>
                                            <TextField variant = 'filled' label = 'First Name:' type = 'text' onChange = {event => setFirstName(event.target.value)} value = {firstName} error = {firstNameError} InputLabelProps = {{required: false}} required style = {{width: '49%', marginRight: '2%', backgroundColor: 'rgba(255, 255, 255, 0.70)'}} />
                                            <TextField variant = 'filled' label = 'Last Name:' type = 'text' onChange = {event => setLastName(event.target.value)} value = {lastName} error = {lastNameError} InputLabelProps = {{required: false}} required style = {{width: '49%', backgroundColor: 'rgba(255, 255, 255, 0.70)'}} />
                                            <TextField variant = 'filled' label = 'E-mail:' type = 'email' onChange = {event => setEmail(event.target.value)} value = {email} error = {emailError} InputLabelProps = {{required: false}} required fullWidth style = {{marginTop: '2%', backgroundColor: 'rgba(255, 255, 255, 0.70)'}} />
                                            <Button variant = 'filled' type = 'submit' sx  = {{alignSelf: 'center', width: width * 0.25, height: height * 0.05, color: 'white', backgroundColor: 'rgba(52, 52, 52, 0.85)', marginTop: '4.5%'}}>
                                                <Typography variant = 'body1' fontSize = '1.75vh'>
                                                    SIGN UP
                                                </Typography>
                                            </Button>
                                        </form>
                                        <Collapse in = {found}>
                                            <Typography variant = 'body1' fontWeight = 'bold' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}} mt = '3vh'>
                                                You are already subscribed!
                                            </Typography>
                                        </Collapse>
                                    </Box>
                                </>
                            :
                                <Typography variant = 'body1' fontSize = '3.5vh' fontWeight = 'bold' align = 'center' style = {{width: '80%'}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                    Thank you for subscribing!
                                </Typography>
                            }
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
                    The Herbal Digest | Botanicals, Remedies & DIY Treatments
                </title>
                <meta name = 'description' content = 'Discover the world of herbal medicine through plant guides, ailment overviews, and home recipes in our comprehensive blog and newsletter.' />
                <meta property = "og:title" content = 'The Herbal Digest | Botanicals, Remedies & DIY Treatments' />
                <meta property = "og:description" content = 'Discover the world of herbal medicine through plant guides, ailment overviews, and home recipes in our comprehensive blog and newsletter.' />
                <meta name = "twitter:title" content = 'The Herbal Digest | Botanicals, Remedies & DIY Treatments' />
                <meta name = "twitter:description" content = 'Discover the world of herbal medicine through plant guides, ailment overviews, and home recipes in our comprehensive blog and newsletter.' />
            </Helmet>
            <div>
                <Box style = {{width: '100vw', height: '115vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}} mb = '-15vh'>
                    <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688626616/Trees_home.avif'})`, backgroundSize: 'cover',  backgroundPositionX: 'center', backgroundPositionY: -position * 0.5, backgroundAttachment: 'fixed'}}>
                        <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                            <Fade duration = {1500}>
                                <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px black'}}>
                                    The Herbal Digest
                                </Typography>
                            </Fade>
                            <InView onChange = {(inView, entry) => setLine(!line)}>
                                <Box style = {{width: line ? '40vw' : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '3%' mb = '3%' />
                            </InView>
                            <Fade duration = {3000}>
                                <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' style = {{width: '75vw'}} sx = {{textShadow: '0px 0px 10px black'}}>
                                    making herbalism digestible
                                </Typography>
                            </Fade>
                        </Box>
                    </Box>
                </Box>
                <Box style = {{width: '100vw', height: '35vw', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'white'}}>
                    <Fade direction = 'right' cascade timeout = {3000}>
                        <Link to = '/botanicals' style = {{color: 'white', textDecoration: 'none'}}>
                            <Paper elevation = {3} style = {{color: 'white'}}>
                                <Box style = {{width: '30vw', height: '30vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                                    <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/c_scale,h_1000,q_50/v1688629238/Leaves_botanicals_fe0t6z.avif' alt = 'Green leaves in front of a solid grey background' style = {{position: 'absolute', width: '30vw', height: '30vw', objectFit: 'cover', objectPosition: 'center', filter: 'saturate(1.5)'}} />
                                    <Box position = 'relative' style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)', transition: 'background-color 0.5s linear', ':hover': {backgroundColor: 'rgba(0, 0, 0, 0.60)'}}}>      
                                        <Typography variant = 'h2' fontFamily = 'Segoe UI, sans-serif' fontSize = '4vw' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px black'}}>
                                            Botanicals
                                        </Typography>
                                        <Typography variant = 'body1' fontSize = '2vw' align = 'center' style = {{width: '95%'}} sx = {{textShadow: '0px 0px 10px black'}} mt = '6%'>
                                            Discover plant species, their medicinal properties, and applications in herbal medicine
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Link>
                        <Link to = '/remedies' style = {{color: 'white', textDecoration: 'none'}}>
                            <Paper elevation = {3} style = {{color: 'white'}}>
                                <Box style = {{width: '30vw', height: '30vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                                    <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/c_scale,h_1000,q_50/v1688629238/Stopper_remedies_rtcddt.avif' alt = 'Stopper of botanical remedy in front of a brick background' style = {{position: 'absolute', width: '30vw', height: '30vw', objectFit: 'cover', objectPosition: 'center', filter: 'saturate(1.5)'}} />
                                    <Box position = 'relative' style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)', transition: 'background-color 0.5s linear', ':hover': {backgroundColor: 'rgba(0, 0, 0, 0.60)'}}}>
                                        <Typography variant = 'h2' fontFamily = 'Segoe UI, sans-serif' fontSize = '4vw' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px black'}}>
                                            Remedies
                                        </Typography>
                                        <Typography variant = 'body1' fontSize = '2vw' align = 'center' style = {{width: '95%'}} sx = {{textShadow: '0px 0px 10px black'}} mt = '6%'>
                                            Learn more about common ailments and how botanicals can be used in treatment
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Link>
                        <Link to = '/blog' style = {{color: 'white', textDecoration: 'none'}}>
                            <Paper elevation = {3} style = {{color: 'white'}}>
                                <Box style = {{width: '30vw', height: '30vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                                    <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/c_scale,h_1000,q_30/v1688629238/Seeds_diy_q7y8kr.avif' alt = 'Herbs, seeds, and a lemon on top of a wooden cutting board' style = {{position: 'absolute', width: '30vw', height: '30vw', objectFit: 'cover', objectPosition: 'center', filter: 'saturate(1.5)'}} />
                                    <Box position = 'relative' style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)', transition: 'background-color 0.5s linear', ':hover': {backgroundColor: 'rgba(0, 0, 0, 0.60)'}}}>
                                        <Typography variant = 'h2' fontFamily = 'Segoe UI, sans-serif' fontSize = '4vw' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px black'}}>
                                            Blog
                                        </Typography>
                                        <Typography variant = 'body1' fontSize = '2vw' align = 'center' style = {{width: '95%'}} sx = {{textShadow: '0px 0px 10px black'}} mt = '6%'>
                                            Explore DIY treatments, naturopathic insights, and expert interviews
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Link>
                    </Fade>
                </Box>
                <Box style = {{width: '100vw', height: '35vw', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white'}}>
                    <Fade duration = {3000}>
                        <Box style = {{width: '95vw', height: '32.5vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688630582/Bottles_shop_ulcle7.avif' alt = 'Organized shelves of various natural products' style = {{position: 'absolute', width: '95vw', height: '32.5vw', objectFit: 'cover', objectPosition: 'center'}} />
                            <Box position = 'relative' style = {{height: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'rgba(23, 23, 23, 0.50)'}}>
                                <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '2.75vw' fontWeight = 'lighter' align = 'center' style = {{width: '75%'}} sx = {{textShadow: '0px 0px 10px black'}} mb = '4.5%'>
                                    Browse our collection of recommended products, ranging from essential oils to loose leaf teas and appliances
                                </Typography>
                                <Link to = '/shop' style = {{color: 'white', textDecoration: 'none'}}>
                                    <Box style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(23, 23, 23, 0.70)'}} sx = {{border: 1, borderRadius: 2, borderColor: 'white', padding: '1vw', ':hover': {color: '#8b8b8b', borderColor: '#8b8b8b'}}}>
                                        <Typography variant = 'body1' fontWeight = 'bold'>
                                            SHOP NOW
                                        </Typography>
                                    </Box>
                                </Link>
                            </Box>
                        </Box>
                    </Fade>
                </Box>
                <Fade duration = {3000}>
                    <Box style = {{width: '100vw', height: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}} mt = '-15vh'>
                        <Box style = {{width: '100vw', height: '70vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688628735/Apricots_home_cyavyi.avif'})`, backgroundAttachment: 'fixed', backgroundPositionY: -(position - window.innerHeight * 2) * 0.5, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                            <Box style = {{width: '100vw', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                                {!completed ?
                                    <Box style = {{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                                        <Box style = {{width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                            <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '4vw' sx = {{textShadow: '0px 0px 10px black'}} mb = '1.5%'>
                                                Join the Newsletter
                                            </Typography>
                                            <Typography variant = 'body1' fontSize = '2vw' align = 'center' style = {{width: '90%'}} sx = {{textShadow: '0px 0px 10px black'}}>
                                                Subscribe to The Herbal Digest and get posts delivered directly to your inbox!
                                            </Typography>
                                        </Box>
                                        <Box style = {{width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} mt = '3%'>
                                            <form style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '75%', flexWrap: 'wrap'}} onSubmit = {handleSubmit}>
                                                <TextField variant = 'filled' label = 'First Name:' type = 'text' onChange = {event => setFirstName(event.target.value)} value = {firstName} error = {firstNameError} InputLabelProps = {{required: false}} required style = {{width: '49%', marginRight: '2%', backgroundColor: 'rgba(255, 255, 255, 0.70)'}} />
                                                <TextField variant = 'filled' label = 'Last Name:' type = 'text' onChange = {event => setLastName(event.target.value)} value = {lastName} error = {lastNameError} InputLabelProps = {{required: false}} required style = {{width: '49%', backgroundColor: 'rgba(255, 255, 255, 0.70)'}} />
                                                <TextField variant = 'filled' label = 'E-mail:' type = 'email' onChange = {event => setEmail(event.target.value)} value = {email} error = {emailError} InputLabelProps = {{required: false}} required fullWidth style = {{marginTop: '2%', backgroundColor: 'rgba(255, 255, 255, 0.70)'}} />
                                                <Button variant = 'filled' type = 'submit' sx  = {{alignSelf: 'center', width: '10vw', height: '5vh', color: 'white', backgroundColor: 'rgba(52, 52, 52, 0.85)', marginTop: '4.5%'}}>
                                                    <Typography variant = 'body2'>
                                                        SIGN UP
                                                    </Typography>
                                                </Button>
                                            </form>
                                            <Collapse in = {found}>
                                                <Typography variant = 'body1' fontWeight = 'bold' sx = {{textShadow: '0px 0px 10px black'}} mt = '3vh'>
                                                    You are already subscribed!
                                                </Typography>
                                            </Collapse>
                                        </Box>
                                    </Box>
                                :
                                    <Typography variant = 'body1' fontSize = '3.5vw' fontWeight = 'bold' sx = {{textShadow: '0px 0px 10px black'}}>
                                        Thank you for subscribing!
                                    </Typography>
                                }
                            </Box>
                        </Box>
                    </Box>
                </Fade>  
            </div>
        </>
    );
};


export default Home;