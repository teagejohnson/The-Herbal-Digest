import React, {useState} from 'react';
import {Helmet} from 'react-helmet-async';

import {deleteField, doc, updateDoc} from 'firebase/firestore';

import {Box, Button, Collapse, TextField, Typography} from '@mui/material';

import db from '../../firebase.js';


const Unsubscribe = () => {
    const width = useState(window.innerWidth)[0];
    const height = useState(window.innerHeight)[0];

    const [completed, setCompleted] = useState(false);
    const [found, setFound] = useState(true);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setFound(true);

        setEmailError(false);

        if (email === '') {
            setEmailError(true);
        }

        if (email) {
            // const docReference = doc(db, 'subscribers', 'current');
            // const docSnapshot = await getDoc(docReference)
        
            // if (docSnapshot.data()[email.replace('.', '_')] === undefined) {
            //     setFound(false);
            // }

            await updateDoc(doc(db, 'subscribers', 'current'), {[email.replace('.', '_')]: deleteField()});

            setCompleted(true);

            setEmail('');
        }
    };

    if (width < 750) {
        return (
             <>
                <Helmet>
                    <title>
                        Unsubscribe | Herbal Digest
                    </title>
                </Helmet>
            <div>
                    <Box style = {{width: width, height: height * 0.75, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688628735/Apricots_home_cyavyi.avif'})`, backgroundSize: 'cover',  backroundPosition: 'center'}} mt = {`${height * 0.125}px`}>
                        <Box style = {{width: width, height: height * 0.75, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white',}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                            {!completed ?
                                <Box style = {{width: width, height: height * 0.75, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '4vh' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}} mb = '1.5%'>
                                        Leave the Newsletter
                                    </Typography>
                                    <Typography variant = 'body1' fontSize = '2vh' align = 'center' style = {{width: '80%'}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}} mb = '4.5%'>
                                        Enter your e-mail to unsubscribe from the mailing list
                                    </Typography>
                                    <form style = {{width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}} onSubmit = {handleSubmit}>
                                        <TextField variant = 'filled' label = 'E-mail:' type = 'email' onChange = {event => setEmail(event.target.value)} value = {email} error = {emailError} InputLabelProps = {{required: false}} required fullWidth style = {{backgroundColor: 'rgba(255, 255, 255, 0.70)'}} />
                                        <Button variant = 'filled' type = 'submit' sx  = {{alignSelf: 'center', width: width * 0.30, height: height * 0.05, color: 'white', backgroundColor: 'rgba(52, 52, 52, 0.85)', marginTop: '6%'}}>
                                            <Typography variant = 'body1' fontSize = '1.75vh'>
                                                UNSUBSCRIBE
                                            </Typography>
                                        </Button>
                                    </form>
                                    <Collapse in = {!found}>
                                        <Typography variant = 'body1' fontWeight = 'bold' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}} mt = '4.5vh'>
                                            E-mail not found!
                                        </Typography>
                                    </Collapse>
                                </Box>
                            :
                                
                                <Typography variant = 'body1' fontSize = '3.5vh' fontWeight = 'bold' align = 'center' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                    You have successfully unsubscribed!
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
                    Unsubscribe | Herbal Digest
                </title>
            </Helmet>
           <div>
                <Box style = {{width: '100vw', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688628735/Apricots_home_cyavyi.avif'})`, backgroundSize: 'cover',  backroundPosition: 'center'}} mt = '15vh'>
                    <Box style = {{width: '100vw', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white',}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                        {!completed ?
                            <Box style = {{width: '100vw', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '4vw' sx = {{textShadow: '0px 0px 10px black'}} mb = '1.5%'>
                                    Leave the Newsletter
                                </Typography>
                                <Typography variant = 'body1' fontSize = '2vw' align = 'center' style = {{width: '50%'}} sx = {{textShadow: '0px 0px 10px black'}} mb = '4.5%'>
                                    Enter your e-mail to unsubscribe from the mailing list
                                </Typography>
                                <form style = {{width: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}} onSubmit = {handleSubmit}>
                                    <TextField variant = 'filled' label = 'E-mail:' type = 'email' onChange = {event => setEmail(event.target.value)} value = {email} error = {emailError} InputLabelProps = {{required: false}} required fullWidth style = {{backgroundColor: 'rgba(255, 255, 255, 0.70)'}} />
                                    <Button variant = 'filled' type = 'submit' sx  = {{alignSelf: 'center', width: '10vw', height: '5vh', color: 'white', backgroundColor: 'rgba(52, 52, 52, 0.85)', marginTop: '6%'}}>
                                        <Typography variant = 'body2'>
                                            UNSUBSCRIBE
                                        </Typography>
                                    </Button>
                                </form>
                                <Collapse in = {!found}>
                                    <Typography variant = 'body1' fontWeight = 'bold' sx = {{textShadow: '0px 0px 10px black'}} mt = '4.5vh'>
                                        E-mail not found!
                                    </Typography>
                                </Collapse>
                            </Box>
                        :
                            
                            <Typography variant = 'body1' fontSize = '3.5vw' fontWeight = 'bold' sx = {{textShadow: '0px 0px 10px black'}}>
                                You have successfully unsubscribed!
                            </Typography>
                        }
                    </Box>
                </Box>
            </div>
        </>
    );
};


export default Unsubscribe;