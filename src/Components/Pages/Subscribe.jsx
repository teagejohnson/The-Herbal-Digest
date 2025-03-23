import React, {useState} from 'react';
import {Helmet} from 'react-helmet-async';

import {doc, Timestamp, updateDoc} from 'firebase/firestore';

import {Box, Button, Collapse, TextField, Typography} from '@mui/material';

import db from '../../firebase.js';


const Subscribe = () => {
    const width = useState(window.innerWidth)[0];
    const height = useState(window.innerHeight)[0];

    const [completed, setCompleted] = useState(false);
    const [found, setFound] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);

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

    if (width < 750) {
        return (
             <>
                <Helmet>
                    <title>
                        Subscribe | Herbal Digest
                    </title>
                </Helmet>
            <div>
                    <Box style = {{width: width, height: height * 0.75, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688624640/Blue_sky_header.avif'})`, backgroundSize: 'cover',  backroundPosition: 'center'}} mt = {`${height * 0.125}px`}>
                        <Box style = {{width: width, height: height * 0.75, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.10)'}}>
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
                    Subscribe | Herbal Digest
                </title>
            </Helmet>
           <div>
                <Box style = {{width: '100vw', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688624640/Blue_sky_header.avif'})`, backgroundSize: 'cover',  backroundPosition: 'center'}} mt = '15vh'>
                    <Box style = {{width: '100vw', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.10)'}}>
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
            </div>
        </>
    );
};


export default Subscribe;