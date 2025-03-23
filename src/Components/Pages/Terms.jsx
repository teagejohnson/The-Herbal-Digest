import {useEffect, useRef, useState} from 'react';
import {InView} from 'react-intersection-observer';
import {Fade} from 'react-awesome-reveal';
import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';

import {Box, Typography} from '@mui/material';


const Terms = () => {
    const width = useState(window.innerWidth)[0];
    const height = useState(window.innerHeight)[0];

    const windowWidth = width >= 750 ? '100vw' : width;

    const refList = useRef([]);

    const [line, setLine] = useState(false);
    const [position, setPosition] = useState(0);

    const handlePositionY = () => {
        setPosition(window.scrollY);
    };

    const handleScroll = (ref) => {
        window.scrollTo({
            top: ref.offsetTop,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.scrollTo({top: 0});
        
        window.addEventListener("scroll", handlePositionY);

        return () => {
            window.removeEventListener("scroll", handlePositionY);
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>
                    Terms | The Herbal Digest
                </title>
            </Helmet>
            <div>
                {width >= 750 ?
                    <Box style = {{width: '100vw', height: '115vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}} mb = '-15vh'>
                        <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688634380/Cactus_terms_w24tmd.avif'})`, backgroundSize: 'cover', backgroundPositionX: 'center', backgroundPositionY: -position * 0.5, backgroundAttachment: 'fixed'}}>
                            <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                                <Fade duration = {1500}>
                                    <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px black'}}>
                                        Terms and Conditions
                                    </Typography>
                                </Fade>
                                <InView onChange = {(inView, entry) => setLine(!line)}>
                                    <Box style = {{width: line ? '40vw' : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '3%' mb = '3%' />
                                </InView>
                                <Fade duration = {3000}>
                                    <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' style = {{width: '75vw'}} sx = {{textShadow: '0px 0px 10px black'}}>
                                        last updated: June 22, 2023
                                    </Typography>
                                </Fade>
                            </Box>
                        </Box>
                    </Box>
                :
                    <Box style = {{width: width, height: height * 0.625, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688634380/Cactus_terms_w24tmd.avif'})`, backgroundSize: 'cover',  backgroundPosition: 'center'}}>
                        <Box style = {{width: width, height: height * 0.625, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                            <Box style = {{width: width, height: height * 0.50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Fade duration = {1500}>
                                    <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        Terms and
                                    </Typography>
                                    <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        Conditions
                                    </Typography>
                                </Fade>
                                <InView onChange = {(inView, entry) => setLine(!line)}>
                                    <Box style = {{width: line ? width * 0.40 : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '12%' mb = '12%' />
                                </InView>
                                <Fade duration = {3000}>
                                    <Typography variant = 'h2' fontFamily = 'Bad Script' fontWeight = 'regular' align = 'center' style = {{width: width * 0.80}} sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        last updated: June 22, 2023
                                    </Typography>
                                </Fade>
                            </Box>
                        </Box>
                    </Box>
                }
                <Box style = {{width: windowWidth, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                    <Box style = {{width: width >= 750 ? '75%' : '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'justify'}} >
                        <Typography variant = 'h2' align = 'center' mt = '6%' mb = '3%'>
                            AGREEMENT TO OUR LEGAL TERMS
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            We are The Herbal Digest (<strong>"Company," "we," "us," "our"</strong>).
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            We operate the website{' '}
                            <Link to = '/' style = {{color: 'black'}}>
                                https://theherbaldigest.com
                            </Link>
                            {' '}(the <strong>"Site"</strong>), as well as any other related products and services that refer or link to these legal terms (the <strong>"Legal Terms"</strong>) (collectively, the <strong>"Services"</strong>).
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            You can contact us by email at:{' '}
                            <Link to = 'mailto:contact@theherbaldigest.com' style = {{color: 'black'}}>
                                contact@theherbaldigest.com
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (<strong>"you"</strong>), and The Herbal Digest, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms from time to time. We will alert you about any changes by updating the "Last updated" date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            We recommend that you print a copy of these Legal Terms for your records.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' mt = '3%' mb = '3%'>
                            TABLE OF CONTENTS
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[0])} style = {{color: 'black'}}>
                                1. OUR SERVICES
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[1])} style = {{color: 'black'}}>
                                2. INTELLECTUAL PROPERTY RIGHTS
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[2])} style = {{color: 'black'}}>
                                3. USER REPRESENTATIONS
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[3])} style = {{color: 'black'}}>
                                4. PROHIBITED ACTIVITIES
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[4])} style = {{color: 'black'}}>
                                5. USER GENERATED CONTRIBUTIONS
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[5])} style = {{color: 'black'}}>
                                6. CONTRIBUTION LICENSE
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[6])} style = {{color: 'black'}}>
                                7. THIRD-PARTY WEBSITES AND CONTENT
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[7])} style = {{color: 'black'}}>
                                8. SERVICES MANAGEMENT
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[8])} style = {{color: 'black'}}>
                                9. PRIVACY POLICY
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[9])} style = {{color: 'black'}}>
                                10. TERM AND TERMINATION
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[10])} style = {{color: 'black'}}>
                                11. MODIFICATIONS AND INTERRUPTIONS
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[11])} style = {{color: 'black'}}>
                                12. GOVERNING LAW
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[12])} style = {{color: 'black'}}>
                                13. DISPUTE RESOLUTION
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[13])} style = {{color: 'black'}}>
                                14. CORRECTIONS
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[14])} style = {{color: 'black'}}>
                                15. DISCLAIMER
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[15])} style = {{color: 'black'}}>
                                16. LIMITATIONS OF LIABILITY
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[16])} style = {{color: 'black'}}>
                                17. INDEMNIFICATION
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[17])} style = {{color: 'black'}}>
                                18. USER DATA
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[18])} style = {{color: 'black'}}>
                                19. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[19])} style = {{color: 'black'}}>
                                20. CALIFORNIA USERS AND RESIDENTS
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[20])} style = {{color: 'black'}}>
                                21. MISCELLANEOUS
                            </Link>
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <Link onClick = {() => handleScroll(refList[21])} style = {{color: 'black'}}>
                                22. CONTACT US
                            </Link>
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[0] = el} mt = '3%' mb = '3%'>
                            1. OUR SERVICES
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[1] = el} mt = '3%' mb = '3%'>
                            2. INTELLECTUAL PROPERTY RIGHTS
                        </Typography>
                        <Typography variant = 'h3' align = 'center' mb = '1.5%'>
                            Our intellectual property
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use or internal business purpose only.
                        </Typography>
                        <Typography variant = 'h3' align = 'center' mt = '1.5%' mb = '1.5%'>
                            Your use of our Services
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            Subject to your compliance with these Legal Terms, including the{' '}
                            <Link onClick = {() => handleScroll(refList[3])} style = {{color: 'black'}}>
                                "PROHIBITED ACTIVITIES"
                            </Link>
                            {' '}section below, we grant you a non-exclusive, non-transferable, revocable license to access the Services; and download or print a copy of any portion of the Content to which you have properly gained access. This is solely for your personal, non-commercial use or internal business purpose.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to:{' '}
                            <Link to = 'mailto:contact@theherbaldigest.com' style = {{color: 'black'}}>
                                contact@theherbaldigest.com
                            </Link>
                            . If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.
                        </Typography>
                        <Typography variant = 'h3' align = 'center' mt = '1.5%' mb = '1.5%'>
                            Your submissions
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            Please review this section and the{' '}
                            <Link onClick = {() => handleScroll(refList[3])} style = {{color: 'black'}}>
                                "PROHIBITED ACTIVITIES"
                            </Link>
                            {' '}section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            <strong>Submissions</strong>: By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services ("Submissions"), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%'>
                            <strong>You are responsible for what you post or upload</strong>: By sending us Submissions through any part of the Services you:
                        </Typography>
                        <Box style = {{width: width >= 750 ? '70vw' : width * 0.80}}>
                            <ul style = {{listStyle: 'disc', fontFamily: 'Quicksand', fontSize: width >= 750 ? '1.5vw' : '1.5vh', margin: 0, padding: 0}}>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        confirm that you have read and agree with our{' '}
                                        <Link onClick = {() => handleScroll(refList[3])} style = {{color: 'black'}}>
                                            "PROHIBITED ACTIVITIES"
                                        </Link>
                                        {' '}and will not post, send, publish, upload, or transmit through the Services any Submission that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading;
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        to the extent permissible by applicable law, waive any and all moral rights to any such Submission;
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        warrant that any such Submission are original to you or that you have the necessary rights and licenses to submit such Submissions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions; and
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        warrant and represent that your Submissions do not constitute confidential information.
                                    </Typography>
                                </li>
                            </ul>
                        </Box>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            You are solely responsible for your Submissions and you expressly agree to reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third party’s intellectual property rights, or (c) applicable law.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[2] = el} mt = '3%' mb = '3%'>
                            3. USER REPRESENTATIONS
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            By using the Services, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Legal Terms; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (4) you will not use the Services for any illegal or unauthorized purpose; and (5) your use of the Services will not violate any applicable law or regulation.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[3] = el} mt = '3%' mb = '3%'>
                            4. PROHIBITED ACTIVITIES
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%'>
                            As a user of the Services, you agree not to:
                        </Typography>
                        <Box style = {{width: width >= 750 ? '70vw' : width * 0.80}}>
                            <ul style = {{listStyle: 'disc', fontFamily: 'Quicksand', fontSize: width >= 750 ? '1.5vw' : '1.5vh', margin: 0, padding: 0}}>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Use any information obtained from the Services in order to harass, abuse, or harm another person.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Make improper use of our support services or submit false reports of abuse or misconduct.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Use the Services in a manner inconsistent with any applicable laws or regulations.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Engage in unauthorized framing of or linking to the Services.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Delete the copyright or other proprietary rights notice from any Content.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Attempt to impersonate another user or person or use the username of another user.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats ("gifs"), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as "spyware" or "passive collection mechanisms" or "pcms").
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorized script or other software.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Use a buying agent or purchasing agent to make purchases on the Services.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Systematically retrieving data or content from your Site to create a collection or database without written permission from you.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Circumvent, disable, or otherwise interfere with security-related features of your Site. This includes features that prevent/restrict the use of any content limits site usage.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Disparage, tarnish, or otherwise harm, in our opinion, your company and/or your Site.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Harass, abuse, or harm another person using any information obtained from your site.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Use the support services improperly, or submit false reports of abuse or misconduct.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Use your site inconsistently with any applicable laws or regulations.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Attempt to upload or transmit viruses, Trojan horses, or other materials (including excessive use of capital letters and spamming) that interferes with any party's uninterrupted use of your Site and its features.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Use scripts, data-mining, robots, or similar data gathering tools to send comments or messages.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Interfere, disrupt, or create an undue burden on your Site, networks, or services.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of your Site to you.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Bypass measures of your Site designed to prevent/restrict access.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Copy/adapt your Site's software (includes Flash, PHP, HTML, JavaScript, or other code).
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Decipher, decompile, disassemble, or reverse engineer any of the software that makes up your Site.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Site, or using or launching any unauthorized script or other software.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Use any automated system (spiders, robots, cheat utility, scraper, offline reader) to access the site, or launch any unauthorized script or software (Unless as a result of a standard search engine or internet browser usage).
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Use your site in an unauthorized way (collecting names or email addresses of users for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses).
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Use your site in an effort to compete with you, or otherwise use your Site and/or the content Content for any revenue-generating endeavor or commercial enterprise.
                                    </Typography>
                                </li>
                            </ul>
                        </Box>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[4] = el} mt = '3%' mb = '3%'>
                            5. USER GENERATED CONTRIBUTIONS
                        </Typography>
                        <Typography variant = 'body1'>
                            The Services does not offer users to submit or post content. We may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Services and through third-party websites. As such, any Contributions you transmit may be treated in accordance with the Services' Privacy Policy. When you create or make available any Contributions, you thereby represent and warrant that:
                        </Typography>
                        <Box style = {{width: width >= 750 ? '70vw' : width * 0.80}}>
                            <ul style = {{listStyle: 'disc', fontFamily: 'Quicksand', fontSize: width >= 750 ? '1.5vw' : '1.5vh', margin: 0, padding: 0}}>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Services, and other users of the Services to use your Contributions in any manner contemplated by the Services and these Legal Terms.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Services and these Legal Terms.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Your Contributions are not false, inaccurate, or misleading.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Your Contributions do not violate any applicable law, regulation, or rule.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Your Contributions do not violate the privacy or publicity rights of any third party.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        Your Contributions do not otherwise violate, or link to material that violates, any provision of these Legal Terms, or any applicable law or regulation.
                                    </Typography>
                                </li>
                            </ul>
                        </Box>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other things, termination or suspension of your rights to use the Services.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[5] = el} mt = '3%' mb = '3%'>
                            6. CONTRIBUTION LICENSE
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            You and Services agree that we may access, store, process, and use any information and personal data that you provide following the terms of the Privacy Policy and your choices (including settings).
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            By submitting suggestions or other feedback regarding the Services, you agree that we can use and share such feedback for any purpose without compensation to you.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Services. You are solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[6] = el} mt = '3%' mb = '3%'>
                            7. THIRD-PARTY WEBSITES AND CONTENT
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            The Services may contain (or you may be sent via the Site) links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ("Third-Party Content"). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Services or any Third-Party Content posted on, available through, or installed from the Services, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Services and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Legal Terms no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Services or relating to any applications you use or install from the Services. Any purchases you make through Third-Party Websites will be through other websites and from other companies, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the applicable third party. You agree and acknowledge that we do not endorse the products or services offered on Third-Party Websites and you shall hold us blameless from any harm caused by your purchase of such products or services. Additionally, you shall hold us blameless from any losses sustained by you or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[7] = el} mt = '3%' mb = '3%'>
                            8. SERVICES MANAGEMENT
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[8] = el} mt = '3%' mb = '3%'>
                            9. PRIVACY POLICY
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            We care about data privacy and security. Please review our Privacy Policy:{' '}
                            <Link to = '/privacy' style = {{color: 'black'}}>
                                https://theherbaldigest.com/privacy
                            </Link>
                            . By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in the United States. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United States, then through your continued use of the Services, you are transferring your data to the United States, and you expressly consent to have your data transferred to and processed in the United States.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[9] = el} mt = '3%' mb = '3%'>
                            10. TERM AND TERMINATION
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[10] = el} mt = '3%' mb = '3%'>
                            11. MODIFICATIONS AND INTERRUPTIONS
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[11] = el} mt = '3%' mb = '3%'>
                            12. GOVERNING LAW
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            These Legal Terms and your use of the Services are governed by and construed in accordance with the laws of the State of California applicable to agreements made and to be entirely performed within the State of California, without regard to its conflict of law principles.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[12] = el} mt = '3%' mb = '3%'>
                            13. DISPUTE RESOLUTION
                        </Typography>
                        <Typography variant = 'h3' align = 'center' mb = '1.5%'>
                            Informal Negotiations
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms (each a "Dispute" and collectively, the "Disputes") brought by either you or us (individually, a "Party" and collectively, the "Parties"), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.
                        </Typography>
                        <Typography variant = 'h3' align = 'center' mt = '1.5%' mb = '1.5%'>
                            Binding Arbitration
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute (except those Disputes expressly excluded below) will be finally and exclusively resolved by binding arbitration. YOU UNDERSTAND THAT WITHOUT THIS PROVISION, YOU WOULD HAVE THE RIGHT TO SUE IN COURT AND HAVE A JURY TRIAL. The arbitration shall be commenced and conducted under the Commercial Arbitration Rules of the American Arbitration Association ("AAA") and, where appropriate, the AAA’s Supplementary Procedures for Consumer Related Disputes ("AAA Consumer Rules"), both of which are available at the{' '}
                            <Link to = 'https://adr.org' style = {{color: 'black'}}>
                                American Arbitration Association (AAA) website
                            </Link>
                            . Your arbitration fees and your share of arbitrator compensation shall be governed by the AAA Consumer Rules and, where appropriate, limited by the AAA Consumer Rules. The arbitration may be conducted in person, through the submission of documents, by phone, or online. The arbitrator will make a decision in writing, but need not provide a statement of reasons unless requested by either Party. The arbitrator must follow applicable law, and any award may be challenged if the arbitrator fails to do so. Except where otherwise required by the applicable AAA rules or applicable law, the arbitration will take place in Los Angeles, California. Except as otherwise provided herein, the Parties may litigate in court to compel arbitration, stay proceedings pending arbitration, or to confirm, modify, vacate, or enter judgment on the award entered by the arbitrator.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            If for any reason, a Dispute proceeds in court rather than arbitration, the Dispute shall be commenced or prosecuted in the state and federal courts located in Los Angeles, California, and the Parties hereby consent to, and waive all defenses of lack of personal jurisdiction, and forum non conveniens with respect to venue and jurisdiction in such state and federal courts. Application of the United Nations Convention on Contracts for the International Sale of Goods and the Uniform Computer Information Transaction Act (UCITA) are excluded from these Legal Terms.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            In no event shall any Dispute brought by either Party related in any way to the Services be commenced more than one (1) years after the cause of action arose. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.
                        </Typography>
                        <Typography variant = 'h3' align = 'center' mt = '1.5%' mb = '1.5%'>
                            Restrictions
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilize class action procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.
                        </Typography>
                        <Typography variant = 'h3' align = 'center' mt = '1.5%' mb = '1.5%'>
                            Exceptions to Informal Negotiations and Arbitration
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            The Parties agree that the following Disputes are not subject to the above provisions concerning informal negotiations binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.
                        </Typography>
                        <Typography variant = 'h2' ref = {el => refList[13] = el} mt = '3%' mb = '3%'>
                            14. CORRECTIONS
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[14] = el} mt = '3%' mb = '3%'>
                            15. DISCLAIMER
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[15] = el} mt = '3%' mb = '3%'>
                            16. LIMITATIONS OF LIABILITY
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[16] = el} mt = '3%' mb = '3%'>
                            17. INDEMNIFICATION
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) use of the Services; (2) breach of these Legal Terms; (3) any breach of your representations and warranties set forth in these Legal Terms; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Services with whom you connected via the Services. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[17] = el} mt = '3%' mb = '3%'>
                            18. USER DATA
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[18] = el} mt = '3%' mb = '3%'>
                            19. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[19] = el} mt = '3%' mb = '3%'>
                            20. CALIFORNIA USERS AND RESIDENTS
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[20] = el} mt = '3%' mb = '3%'>
                            21. MISCELLANEOUS
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' ref = {el => refList[21] = el} mt = '3%' mb = '3%'>
                            22. CONTACT US
                        </Typography>
                        <Typography variant = 'body1' mb = '6%'>
                            In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:{' '}
                            <Link to = 'mailto:contact@theherbaldigest.com' style = {{color: 'black'}}>
                                contact@theherbaldigest.com
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </div>
        </>
    );
};


export default Terms;