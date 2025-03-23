import {useEffect, useState} from 'react';
import {InView} from 'react-intersection-observer';
import {Fade} from 'react-awesome-reveal';
import {Helmet} from 'react-helmet-async';

import {Box, Typography} from '@mui/material';


const About = () => {
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
                        About | The Herbal Digest
                    </title>
                    <meta name = 'description' content = 'Meet Ellie Boock, the founder of The Herbal Digest.' />
                    <meta property = 'og:title' content = 'About | The Herbal Digest' />
                    <meta property = 'og:description' content = 'Meet Ellie Boock, the founder of The Herbal Digest.' />
                    <meta name = 'twitter:title' content = 'About | The Herbal Digest' />
                    <meta name = 'twitter:description' content = 'Meet Ellie Boock, the founder of The Herbal Digest.' />
                </Helmet>
                <div>
                    <Box style = {{width: width, height: height * 0.625, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688632504/Jars_about_lit18t.avif'})`, backgroundSize: 'cover',  backgroundPosition: 'center'}}>
                        <Box style = {{width: width, height: height * 0.625, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                            <Box style = {{width: width, height: height * 0.50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Fade duration = {1500}>
                                    <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        About
                                    </Typography>
                                </Fade>
                                <InView onChange = {(inView, entry) => setLine(!line)}>
                                    <Box style = {{width: line ? width * 0.40 : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '6%' mb = '6%' />
                                </InView>
                                <Fade duration = {3000}>
                                    <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' style = {{width: width * 0.80}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        meet the author
                                    </Typography>
                                </Fade>
                            </Box>
                        </Box>
                    </Box>
                    <Box style = {{width: width, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', textAlign: 'justify'}}>
                        <Box style = {{width: width * 0.80, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Typography variant = 'body1' mt = '9%' mb = '4.5%'>
                                Welcome to The Herbal Digest, your one-stop-shop for all things botanical! My name is Ellie, and I'm thrilled to have you here as we delve into the incredible world of plants and their ability to promote well-being and vitality.
                            </Typography>
                            <Typography variant = 'body1' mb = '6%'>
                                As an herbalist and scientist, I created this platform to share reliable and comprehensible information about herbs. The internet is full of people recommending various plant-based treatments as ‘cure-alls’ for any affliction. However, these resources rarely present substantive explanations behind how these treatments actually work. Too often, herbalism is presented as mysticism rather than science. My goal is to create an accessible space where people can gain an in-depth understanding of plants, their properties, and how—<em>and when</em>—herbal remedies can be used effectively.
                            </Typography>
                            <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688632939/Ellie_1_about_luepoi.avif' alt = 'Ellie Boock, the founder of The Herbal Digest, embracing a redwood tree in Redwood National Park, California' style = {{width: width * 0.60, height: height * 0.50, objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.85)'}} />
                            <Typography variant = 'body1' mt = '6%' mb = '4.5%'>
                                At The Herbal Digest, I believe firmly in the power of nature and its ability to assist and restore balance within the human body. Through the platform, I aim to provide <em>digestible</em> and engaging content that explores the ancient traditions, chemical properties, modern applications, and scientific research surrounding herbs. Whether you're seeking natural remedies for common ailments or a holistic approach to overall well-being, The Herbal Digest has something for you.
                            </Typography>
                            <Typography variant = 'body1' mb = '4.5%'>
                                I invite you to engage with us by sharing your experiences, insights, and questions. Together, we can create a supportive space where everyone can learn and grow. Let's plant the seed and embark on a journey towards a healthier, happier life!
                            </Typography>
                            <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688632939/Ellie_2_about_fgfpds.avif' alt = 'Ellie Boock, the founder of The Herbal Digest, frolicking in a meadow in Jackson Hole, Wyoming' style = {{width: width * 0.60, height: height * 0.50, objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.85)'}} />
                            <Typography variant = 'body1' mt = '9%'>
                                All the best,
                            </Typography>
                            <Typography variant = 'body1'>
                                Ellie Boock
                            </Typography>
                            <Typography variant = 'body1' fontStyle = 'italic' mb = '9%'>
                                Founder, The Herbal Digest
                            </Typography>
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
                    About | The Herbal Digest
                </title>
                <meta name = 'description' content = 'Meet Ellie Boock, the founder of The Herbal Digest.' />
                <meta property = 'og:title' content = 'About | The Herbal Digest' />
                <meta property = 'og:description' content = 'Meet Ellie Boock, the founder of The Herbal Digest.' />
                <meta name = 'twitter:title' content = 'About | The Herbal Digest' />
                <meta name = 'twitter:description' content = 'Meet Ellie Boock, the founder of The Herbal Digest.' />
            </Helmet>
            <div>
                <Box style = {{width: '100vw', height: '115vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688632504/Jars_about_lit18t.avif'})`, backgroundSize: 'cover',  backgroundPositionX: 'center', backgroundPositionY: -position * 0.5, backgroundAttachment: 'fixed'}}>
                        <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                            <Fade duration = {1500}>
                                <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px black'}}>
                                    About
                                </Typography>
                            </Fade>
                            <InView onChange = {(inView, entry) => setLine(!line)}>
                                <Box style = {{width: line ? '40vw' : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '3%' mb = '3%' />
                            </InView>
                            <Fade duration = {3000}>
                                <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' style = {{width: '75vw'}} sx = {{textShadow: '0px 0px 10px black'}}>
                                    meet the author
                                </Typography>
                            </Fade>
                        </Box>
                    </Box>
                </Box>
                <Box style = {{width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}} mt = '-15vh'>
                    <Box style = {{width: '75%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} mt = '6%'> 
                        <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688632939/Ellie_1_about_luepoi.avif' alt = 'Ellie Boock, the founder of The Herbal Digest, embracing a redwood tree in Redwood National Park, California' style = {{width: '25vw', height: '60vh', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.85)'}} />
                        <Box style = {{width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'justify'}}> 
                            <Typography variant = 'body1' mb = '3%'>
                                Welcome to The Herbal Digest, your one-stop-shop for all things botanical! My name is Ellie, and I'm thrilled to have you here as we delve into the incredible world of plants and their ability to promote well-being and vitality.
                            </Typography>
                            <Typography variant = 'body1'>
                                As an herbalist and scientist, I created this platform to share reliable and comprehensible information about herbs. The internet is full of people recommending various plant-based treatments as ‘cure-alls’ for any affliction. However, these resources rarely present substantive explanations behind how these treatments actually work. Too often, herbalism is presented as mysticism rather than science. My goal is to create an accessible space where people can gain an in-depth understanding of plants, their properties, and how—<em>and when</em>—herbal remedies can be used effectively.
                            </Typography>
                        </Box>
                    </Box>
                    <Box style = {{width: '75%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} mt = '4.5%' mb = '4.5%'> 
                        <Box style = {{width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'justify'}}> 
                            <Typography variant = 'body1' mb = '3%'>
                                At The Herbal Digest, I believe firmly in the power of nature and its ability to assist and restore balance within the human body. Through the platform, I aim to provide <em>digestible</em> and engaging content that explores the ancient traditions, chemical properties, modern applications, and scientific research surrounding herbs. Whether you're seeking natural remedies for common ailments or a holistic approach to overall well-being, The Herbal Digest has something for you.
                            </Typography>
                            <Typography variant = 'body1'>
                                I invite you to engage with us by sharing your experiences, insights, and questions. Together, we can create a supportive space where everyone can learn and grow. Let's plant the seed and embark on a journey towards a healthier, happier life!
                            </Typography>
                        </Box>
                        <img src = 'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688632939/Ellie_2_about_fgfpds.avif' alt = 'Ellie Boock, the founder of The Herbal Digest, frolicking in a meadow in Jackson Hole, Wyoming' style = {{width: '25vw', height: '55vh', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.85)'}} />
                    </Box>
                    <Typography variant = 'body1' mt = '1.5%'>
                        All the best,
                    </Typography>
                    <Typography variant = 'body1'>
                        Ellie Boock
                    </Typography>
                    <Typography variant = 'body1' fontStyle = 'italic' mb = '6%'>
                        Founder, The Herbal Digest
                    </Typography>
                </Box>
            </div>
        </>
    );
};


export default About;