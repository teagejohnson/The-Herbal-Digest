import {useState} from 'react';
import {Link} from 'react-router-dom';

import {Box, Typography} from '@mui/material';


const Footer = () => {
    const width = useState(window.innerWidth)[0];
    const height = useState(window.innerHeight)[0];

    if (width < 750) {
        return (
            <div>
                <Box style = {{width: width, height: height * 0.125, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'}} sx = {{borderTop: 1, borderColor: 'white'}}>
                    <Typography variant = 'body2' mb = '1.5%' fontSize = '1.5vh'>
                        © 2023 The Herbal Digest. All Rights Reserved
                    </Typography>
                    <Box style = {{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Link to = '/privacy' style = {{color: 'white', textDecoration: 'none'}}>
                            <Typography variant = 'body2' fontSize = '1.5vh'>
                                Privacy Policy
                            </Typography>
                        </Link>
                        <Typography variant = 'body2' fontSize = '1.5vh'>
                            &nbsp;  |  &nbsp;
                        </Typography>
                        <Link to = '/terms' style = {{color: 'white', textDecoration: 'none'}}>
                            <Typography variant = 'body2' fontSize = '1.5vh'>
                                Terms and Conditions
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </div>
        );
    };

    return (
        <div>
            <Box style = {{width: '100vw', height: '15vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}} sx = {{borderTop: 1, borderColor: 'white'}}>
                <Typography variant = 'body2' sx = {{textShadow: '0px 0px 10px black'}}>
                    © 2023 The Herbal Digest. All Rights Reserved
                </Typography>
                <Typography variant = 'body2'>
                    &nbsp;  |  &nbsp;
                </Typography>
                <Link to = '/privacy' style = {{color: 'white', textDecoration: 'none'}}>
                    <Typography variant = 'body2' sx = {{textShadow: '0px 0px 10px black', ':hover': {color: '#8b8b8b'}}}>
                        Privacy Policy
                    </Typography>
                </Link>
                <Typography variant = 'body2'>
                    &nbsp;  |  &nbsp;
                </Typography>
                <Link to = '/terms' style = {{color: 'white', textDecoration: 'none'}}>
                    <Typography variant = 'body2' sx = {{textShadow: '0px 0px 10px black', ':hover': {color: '#8b8b8b'}}}>
                        Terms and Conditions
                    </Typography>
                </Link>
            </Box>
        </div>
    );
};


export default Footer;