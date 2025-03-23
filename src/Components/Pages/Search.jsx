import {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';

import {Box, Button, TextField, Typography} from '@mui/material';
import {SearchOutlined} from '@mui/icons-material';


const Search = () => {
    const width = useState(window.innerWidth)[0];
    const height = useState(window.innerHeight)[0];

    const [searchValue, setSearchValue] = useState('');
    
    const handleClickSearch = (event) => {
        event.preventDefault();

        if (searchValue.trim()) {
            window.location.href = '/search/' + searchValue;
        };
    };
    
    useEffect(() => {
        window.scrollTo({top: 0}); 
    }, []);

    if (width < 750) {
        return (
            <>
                <Helmet>
                    <title>
                        Search | The Herbal Digest
                    </title>
                </Helmet>
                <div>
                    <Box style = {{width: width, height: height * 0.75, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688624640/Blue_sky_header.avif'})`, backgroundSize: 'cover',  backroundPosition: 'center'}} mt = {`${height * 0.125}px`}>
                        <Box style = {{width: width, height: height * 0.75, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', color: 'white'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.10)'}}>
                            <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '3vh' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}} mt = '40%' mb = '4.5%'>
                                What are you looking for?
                            </Typography>
                            <Box style = {{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <TextField variant = 'standard' value = {searchValue} placeholder = 'SEARCH…' autoComplete = 'off' onChange = {event => setSearchValue(event.target.value)} onKeyDown = {event => event.key === 'Enter' ? handleClickSearch(event) : null} inputProps = {{style: {color: 'white', fontSize: '1.5vh', filter: 'drop-shadow(0px 0px 10px black)'}, sx: {'&::placeholder': {color: 'white', opacity: 1}}}} InputProps = {{disableUnderline: true, sx: {borderBottom: 1, borderTop: 1, borderBottomColor: 'white', borderTopColor: 'transparent', ':hover': {borderBottom: 2, borderTop: 2, borderBottomColor: 'white', borderTopColor: 'transparent'}, ':after': {borderBottom: 1.5, borderTop: 1.5, borderBottomColor: 'white', borderTopColor: 'transparent'}}}} />
                                <Button onClick = {(event) => handleClickSearch(event)} style = {{color: 'white', minWidth: 0, margin: 0, padding: '0.5vh', borderRadius: 100}}>
                                    <SearchOutlined style = {{fontSize: '2vh', filter: 'drop-shadow(0px 0px 10px rgba(23, 23, 23, 0.70))'}}  />
                                </Button>
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
                    Search | The Herbal Digest
                </title>
            </Helmet>
            <div>
                <Box style = {{width: '100vw', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688624640/Blue_sky_header.avif'})`, backgroundSize: 'cover',  backroundPosition: 'center'}} mt = '15vh'>
                    <Box style = {{width: '100vw', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', color: 'white'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.10)'}}>
                        <Typography variant = 'body1' fontFamily = 'Segoe UI, sans-serif' fontSize = '3vw' sx = {{textShadow: '0px 0px 10px black'}} mt = '9%' mb = '4.5%'>
                            What are you looking for?
                        </Typography>
                        <Box style = {{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <TextField variant = 'standard' value = {searchValue} placeholder = 'SEARCH…' autoComplete = 'off' onChange = {event => setSearchValue(event.target.value)} onKeyDown = {event => event.key === 'Enter' ? handleClickSearch(event) : null} inputProps = {{style: {color: 'white', fontSize: '1.5vw', filter: 'drop-shadow(0px 0px 10px black)'}, sx: {'&::placeholder': {color: 'white', opacity: 1}}}} InputProps = {{disableUnderline: true, sx: {borderBottom: 1, borderTop: 1, borderBottomColor: 'white', borderTopColor: 'transparent', ':hover': {borderBottom: 2, borderTop: 2, borderBottomColor: 'white', borderTopColor: 'transparent'}, ':after': {borderBottom: 1.5, borderTop: 1.5, borderBottomColor: 'white', borderTopColor: 'transparent'}}}} />
                            <Button onClick = {(event) => handleClickSearch(event)} style = {{color: 'white', minWidth: 0, margin: 0, padding: '0.5vw', borderRadius: 100}}>
                                <SearchOutlined style = {{fontSize: '2vw', filter: 'drop-shadow(0px 0px 10px black)'}}  />
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </div>
        </>
    );
};


export default Search;