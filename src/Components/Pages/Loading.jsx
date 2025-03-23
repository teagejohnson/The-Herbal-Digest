import {useState} from 'react';
import {Box, Typography} from '@mui/material';


const Loading = () => {
    const width = useState(window.innerWidth)[0];
    const height = useState(window.innerHeight)[0];

    return (
        <Box style = {{width: width >= 750 ? '100vw' : width, height: width >= 750 ? '100vh': height, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
            <Typography variant = 'body1'>
                Loading...
            </Typography>
        </Box>
    );
};


export default Loading;