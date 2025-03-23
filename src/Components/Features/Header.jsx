import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {InView} from 'react-intersection-observer';

import {doc, Timestamp, updateDoc} from 'firebase/firestore';

import {AppBar, Box, Button, Collapse, Popover, Slide, TextField, Typography} from '@mui/material';
import {Close, EmailOutlined, FacebookOutlined, Instagram, Menu, SearchOutlined, Twitter} from '@mui/icons-material';

import db from '../../firebase.js';


const Header = () => {
    const width = useState(window.innerWidth)[0];
    const height = useState(window.innerHeight)[0];

    const [line, setLine] = useState(true);

    const [openMenu, setOpenMenu] = useState(false);
    const [openNewsletter, setOpenNewsletter] = useState(false);

    const [search, setSearch] = useState('');

    const [position, setPosition] = useState(0);

    const [completed, setCompleted] = useState(false);
    const [found, setFound] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleBackgroundColor = (position) => {
        const startOpacity = 0.30;
        const endOpacity = 0.90;
        
        if (position < window.innerHeight * 0.85 && window.location.pathname.slice(0, 7) !== '/search') {
            return `rgba(23, 23, 23, ${(endOpacity - startOpacity) / (window.innerHeight * 0.85) * (position) + startOpacity})`;
        }


        else {
            return `rgba(23, 23, 23, ${endOpacity})`;
        }   
    };

    const handleOpenMenu = (event) => {
        event.preventDefault();

        setOpenMenu(true);
    };

    const handleOpenNewsletter = (event) => {
        event.preventDefault();

        setOpenNewsletter(true);
    };

    const handleCloseMenu = (event, location) => {
        event.preventDefault();

        if (location) {
            window.location.href = location;
        }

        setLine(false);
        setOpenMenu(false);    
    };

    const handleCloseNewsletter = (event) => {
        event.preventDefault();

        setOpenNewsletter(false);
    };

    const handleClickSearch = (event) => {
        event.preventDefault();

        if (search.trim()) {
            window.location.href = '/search/' + search.trim();
        }
    };

    const handleClickSearchMobile = (event) => {
        event.preventDefault();

        window.location.href = '/search';
    };

    const handleScroll = () => {
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

            await updateDoc(doc(db, 'subscribers', 'current'), {[email.replace('.', '_')]: {first_name: firstName, last_name: lastName, email: email, timestamp: Timestamp.now()}});
            await updateDoc(doc(db, 'subscribers', 'historical'), {[email.replace('.', '_')]: {first_name: firstName, last_name: lastName, email: email, timestamp: Timestamp.now()}});

            setCompleted(true);

            setFirstName('');
            setLastName('');
            setEmail('');
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (width < 750) {
        return (
            <div>
                <AppBar style = {{width: width, height: height * 0.125, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: handleBackgroundColor(position * 0.85 / 0.525), backdropFilter: 'blur(2.5px)'}} sx = {{left: 0, borderBottom: 2, borderColor: 'white', boxShadow: '0px 0px 25px #343434', paddingLeft: '3%', paddingRight: '3%'}}>
                    <Box style = {{width: '15%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Button aria-label = 'menu' onClick = {(event) => handleOpenMenu(event)} style = {{color: 'white', minWidth: 0, padding: 0}} sx = {{':hover': {background: 'transparent'}}}>
                            <Menu style = {{fontSize: '3.5vh', filter: 'drop-shadow(0px 0px 10px black)'}} />
                        </Button>
                        <Popover anchorReference = 'none' open = {openMenu} onClose = {(event) => handleCloseMenu(event)} style = {{fontFamily: 'Quicksand'}} slotProps = {{paper: {sx: {maxHeight: height, backgroundColor: 'transparent'}}}} TransitionComponent = {Slide} TransitionProps = {{direction: 'right', timeout: 1000}} >
                            <Box style = {{width: '80vw', height: height, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', color: 'white'}} sx = {{backgroundColor: 'rgba(23, 23, 23, 1)'}}>
                                <Box style = {{width: '100%', height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', color: 'white'}} sx = {{backgroundColor: 'rgba(23, 23, 23, 1)'}}>
                                   <Button onClick = {(event) => handleCloseMenu(event)} style = {{position: 'absolute', minWidth: 0}} sx = {{top: 10, right: 10, padding: 0, margin: 0}}>
                                        <Close style = {{fontSize: '4vh', color: '#8b8b8b'}} />
                                    </Button>
                                    <Typography variant = 'body1' fontFamily = 'Big Caslon, serif' fontSize = '4vh' align = 'center' mt = '3vh'>
                                        The
                                    </Typography>
                                    <Typography variant = 'body1' fontFamily = 'Big Caslon, serif' fontSize = '4vh' align = 'center'>
                                        Herbal Digest
                                    </Typography>
                                    <InView onChange = {(inView, entry) => setLine(!line)}>
                                        <Box style = {{width: line ? '40vw' : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: line ? 'width 2s ease-in' : 'width 1s ease-out', transitionDelay: line ? '0.15s' : 0}} mt = '4vh' mb = '4vh' />
                                    </InView>
                                    <Box style = {{height: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Link onClick = {(event) => handleCloseMenu(event, '/')} style = {{color: 'white', textDecoration: 'none'}}>
                                            <Typography variant = 'body1' fontSize = '2.5vh' fontWeight = 'bold'>
                                                HOME
                                            </Typography>
                                        </Link>  
                                        <Link onClick = {(event) => handleCloseMenu(event, '/shop')} style = {{color: 'white', textDecoration: 'none'}}>
                                            <Typography variant = 'body1' fontSize = '2.5vh' fontWeight = 'bold'>
                                                SHOP
                                            </Typography>
                                        </Link>  
                                        <Link onClick = {(event) => handleCloseMenu(event, '/botanicals')} style = {{color: 'white', textDecoration: 'none'}}>
                                            <Typography variant = 'body1' fontSize = '2.5vh' fontWeight = 'bold'>
                                                BOTANICALS
                                            </Typography>
                                        </Link>
                                        <Link onClick = {(event) => handleCloseMenu(event, '/remedies')} style = {{color: 'white', textDecoration: 'none'}}>
                                            <Typography variant = 'body1' fontSize = '2.5vh' fontWeight = 'bold'>
                                                REMEDIES
                                            </Typography>
                                        </Link>
                                        <Link onClick = {(event) => handleCloseMenu(event, '/blog')} style = {{color: 'white', textDecoration: 'none'}}>
                                            <Typography variant = 'body1' fontSize = '2.5vh' fontWeight = 'bold'>
                                                BLOG
                                            </Typography>
                                        </Link>
                                        <Link onClick = {(event) => handleCloseMenu(event, '/about')} style = {{color: 'white', textDecoration: 'none'}}>
                                            <Typography variant = 'body1' fontSize = '2.5vh' fontWeight = 'bold'>
                                                ABOUT
                                            </Typography>
                                        </Link>
                                        <Link onClick = {(event) => handleCloseMenu(event, '/contact')} style = {{color: 'white', textDecoration: 'none'}}>
                                            <Typography variant = 'body1' fontSize = '2.5vh' fontWeight = 'bold'>
                                                CONTACT
                                            </Typography>
                                        </Link>   
                                    </Box>
                                </Box>
                                <Box style = {{height: '20%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Button onClick = {(event) => handleCloseMenu(event, '/subscribe')} style = {{color: 'white', padding: 0}} sx = {{marginTop: 3, ':hover': {background: 'transparent'}}}>
                                        <Box style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} sx = {{':hover': {color: '#8b8b8b'}}}>
                                            <Typography variant = 'body2' fontSize = '2vh' fontWeight = 'bold' sx = {{textShadow: '0px 0px 10px black'}}>
                                                JOIN THE NEWSLETTER
                                            </Typography>
                                            <EmailOutlined style = {{fontSize: '2.5vh', filter: 'drop-shadow(0px 0px 10px black)', marginLeft: 2.5}} />
                                        </Box>
                                    </Button>
                                    <Box style = {{height: height * 0.125, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                        <Link to = 'https://www.instagram.com/theherbaldigest/' aria-label = 'instagram' style = {{color: 'white', textDecoration: 'none'}}>
                                            <Instagram style = {{fontSize: '3vh', filter: 'drop-shadow(0px 0px 10px black)'}} sx = {{':hover': {color: '#8b8b8b'}}} />
                                        </Link>
                                        <Link to = 'https://www.facebook.com/theherbaldigest' aria-label = 'facebook' style = {{color: 'white', textDecoration: 'none'}}>
                                            <FacebookOutlined style = {{fontSize: '3vh', filter: 'drop-shadow(0px 0px 10px black)', marginLeft: 10, marginRight: 10}} sx = {{':hover': {color: '#8b8b8b'}}} />
                                        </Link>
                                        <Link to = 'https://twitter.com/theherbaldigest' aria-label = 'twitter' style = {{color: 'white', textDecoration: 'none'}}>
                                            <Twitter style = {{fontSize: '3vh', filter: 'drop-shadow(0px 0px 10px black)'}} sx = {{':hover': {color: '#8b8b8b'}}} />
                                        </Link>
                                    </Box>
                                    <Box style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} mb = '3vh'>
                                        <Link onClick = {(event) => handleCloseMenu(event, '/privacy')} style = {{color: 'white', textDecoration: 'none'}}>
                                            <Typography variant = 'body2' fontSize = '1.5vh'>
                                                Privacy Policy
                                            </Typography>
                                        </Link>
                                        <Typography variant = 'body2' fontSize = '1.5vh'>
                                            &nbsp;  |  &nbsp;
                                        </Typography>
                                        <Link onClick = {(event) => handleCloseMenu(event, '/terms')} style = {{color: 'white', textDecoration: 'none'}}>
                                            <Typography variant = 'body2' fontSize = '1.5vh'>
                                                Terms and Conditions
                                            </Typography>
                                        </Link>
                                    </Box>
                                </Box>
                            </Box>
                        </Popover>
                    </Box>
                    <Box position = 'relative' style = {{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Link to = '/' style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Box>
                                <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/q_50/v1688677680/Logo_black_navbar.avif' alt = 'The Herbal Digest logo' style = {{width: height * 0.11, height: height * 0.11, filter: 'invert(1) drop-shadow(0px 0px 10px black)'}} />
                            </Box>
                        </Link>
                    </Box>
                    <Box style = {{width: '15%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Button aria-label = 'search' onClick = {(event) => handleClickSearchMobile(event)} style = {{color: 'white', minWidth: 0, margin: 0, padding: '0.25vh', borderRadius: 100}}>
                            <SearchOutlined style = {{fontSize: '3.5vh', filter: 'drop-shadow(0px 0px 10px black)'}}  />
                        </Button>
                    </Box>
                </AppBar>
            </div>
        );
    };

    return (
        <div>
            <AppBar style = {{width: '100vw', height: '15vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: handleBackgroundColor(position), backdropFilter: 'blur(2.5px)'}} sx = {{left: 0, borderBottom: 2, borderColor: 'white', boxShadow: '0px 0px 25px #343434', paddingLeft: '3%', paddingRight: '3%'}}>
                <Box style = {{width: '40%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'space-evenly'}}>
                    <Box style = {{width: '100%', height: '45%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} sx = {{borderBottom: 1, borderColor: 'white'}} >
                        <Box style = {{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Button onClick = {(event) => handleOpenNewsletter(event)} style = {{color: 'white', padding: 0}} sx = {{':hover': {background: 'transparent'}}}>
                                <Box style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} sx = {{':hover': {color: '#8b8b8b'}}}>
                                    <Typography variant = 'body2' fontWeight = 'bold' sx = {{textShadow: '0px 0px 10px black'}}>
                                        JOIN THE NEWSLETTER
                                    </Typography>
                                    <EmailOutlined style = {{fontSize: '1.5vw', filter: 'drop-shadow(0px 0px 10px black)', marginLeft: '0.25vw'}} />
                                </Box>
                            </Button>
                            <Popover anchorReference = 'none' open = {openNewsletter} onClose = {(event) => handleCloseNewsletter(event)} style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'Quicksand'}}>
                                <Box style = {{width: '60vw', height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688624640/Blue_sky_header.avif'})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                                    <Box style = {{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                                        <Button onClick = {(event) => handleCloseNewsletter(event)} style = {{position: 'absolute', minWidth: 0, width: '3.25vw', height: '3.25vw'}} sx = {{top: '0.75vw', left: '0.75vw', padding: 0, margin: 0}}>
                                            <Close style = {{fontSize: '2vw', color: '#343434'}} />
                                        </Button>
                                        {!completed ?
                                            <>
                                                <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '3vw' sx = {{textShadow: '0px 0px 10px black'}}>
                                                    Join the Newsletter
                                                </Typography>
                                                <Typography variant = 'body1' align = 'center' style = {{width: '70%'}} sx = {{textShadow: '0px 0px 10px black'}} mb = '4.5%'>
                                                    Subscribe to The Herbal Digest and get posts delivered directly to your inbox!
                                                </Typography>
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
                                                    <Typography variant = 'body1' fontWeight = 'bold' sx = {{textShadow: '0px 0px 10px black'}} mt = '3vh' mb = '1.5vh'>
                                                        You are already subscribed!
                                                    </Typography>
                                                </Collapse>
                                            </>
                                        :
                                            <Typography variant = 'body1' fontSize = '2.75vw' fontWeight = 'bold' sx = {{textShadow: '0px 0px 10px black'}}>
                                                Thank you for subscribing!
                                            </Typography>
                                        }
                                    </Box>
                                </Box>
                            </Popover>
                        </Box>
                        <Typography variant = 'body2' fontSize = '1.25vw' paddingLeft = '1.25vw' paddingRight = '1.25vw'>
                            |
                        </Typography>
                        <Box style = {{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Link to = 'https://www.instagram.com/theherbaldigest/' aria-label = 'instagram' style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', textDecoration: 'none'}}>
                                <Instagram style = {{fontSize: '1.5vw', filter: 'drop-shadow(0px 0px 10px black)'}} sx = {{':hover': {color: '#8b8b8b'}}} />
                            </Link>
                            <Link to = 'https://www.facebook.com/theherbaldigest' aria-label = 'facebook' style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', textDecoration: 'none'}}>
                                <FacebookOutlined style = {{fontSize: '1.5vw', filter: 'drop-shadow(0px 0px 10px black)', marginLeft: '0.5vw', marginRight: '0.5vw'}} sx = {{':hover': {color: '#8b8b8b'}}} />
                            </Link>
                            <Link to = 'https://twitter.com/theherbaldigest' aria-label = 'twitter' style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', textDecoration: 'none'}}>
                                <Twitter style = {{fontSize: '1.5vw', filter: 'drop-shadow(0px 0px 10px black)'}} sx = {{':hover': {color: '#8b8b8b'}}} />
                            </Link>
                        </Box>
                    </Box>
                    <Box style = {{width: '100%', height: '55%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Link to = '/shop' style = {{color: 'white', textDecoration: 'none'}}>
                            <Typography variant = 'body1' fontWeight = 'bold' sx = {{textShadow: '0px 0px 10px black', ':hover': {color: '#8b8b8b'}}}>
                                SHOP
                            </Typography>
                        </Link>
                        <Link to = '/botanicals' style = {{color: 'white', textDecoration: 'none'}}>
                            <Typography variant = 'body1' fontWeight = 'bold' sx = {{textShadow: '0px 0px 10px black', ':hover': {color: '#8b8b8b'}}}>
                                BOTANICALS
                            </Typography>
                        </Link>
                        <Link to = '/remedies' style = {{color: 'white', textDecoration: 'none'}}>
                            <Typography variant = 'body1' fontWeight = 'bold' sx = {{textShadow: '0px 0px 10px black', ':hover': {color: '#8b8b8b'}}}>
                                REMEDIES
                            </Typography>
                        </Link>
                    </Box>
                </Box>
                <Box style = {{width: '20%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Link to = '/' style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Box sx = {{':hover': {filter: 'invert(0.5425) drop-shadow(0px 0px 10px black)'}}}>
                            <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/q_50/v1688677680/Logo_black_navbar.avif' alt = 'The Herbal Digest logo' style = {{maxWidth: '10vw', maxHeight: '14vh', filter: 'invert(1) drop-shadow(0px 0px 10px black)'}} />
                        </Box>
                    </Link>
                </Box>
                <Box style = {{width: '40%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'space-evenly'}}>
                    <Box style = {{width: '100%', height: '45%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}} sx = {{borderBottom: 1, borderColor: 'white'}}>
                        <TextField variant = 'standard' value = {search} placeholder = 'SEARCH…' autoComplete = 'off' onChange = {event => setSearch(event.target.value)} onKeyDown = {event => event.key === 'Enter' ? handleClickSearch(event) : null} inputProps = {{style: {fontSize: '1.15vw', color: 'white', filter: 'drop-shadow(0px 0px 10px black)'}, sx: {'&::placeholder': {color: 'white', opacity: 1}}}} InputProps = {{disableUnderline: true}} />
                        <Button onClick = {(event) => handleClickSearch(event)} style = {{color: 'white', minWidth: 0, margin: 0, padding: '0.25vw', borderRadius: 100}}>
                            <SearchOutlined style = {{fontSize: '1.5vw', filter: 'drop-shadow(0px 0px 10px black)'}}  />
                        </Button>
                    </Box>
                    <Box style = {{width: '100%', height: '55%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Link to = '/blog' style = {{color: 'white', textDecoration: 'none'}}>
                            <Typography variant = 'body1' fontWeight = 'bold' sx = {{textShadow: '0px 0px 10px black', ':hover': {color: '#8b8b8b'}}}>
                                BLOG
                            </Typography>
                        </Link>
                        <Link to = '/about' style = {{color: 'white', textDecoration: 'none'}}>
                            <Typography variant = 'body1' fontWeight = 'bold' sx = {{textShadow: '0px 0px 10px black', ':hover': {color: '#8b8b8b'}}}>
                                ABOUT
                            </Typography>
                        </Link>
                        <Link to = '/contact' style = {{color: 'white', textDecoration: 'none'}}>
                            <Typography variant = 'body1' fontWeight = 'bold' sx = {{textShadow: '0px 0px 10px black', ':hover': {color: '#8b8b8b'}}}>
                                CONTACT
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </AppBar>
        </div>
    );
};


export default Header;