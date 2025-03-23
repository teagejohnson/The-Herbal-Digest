import {useEffect, useState} from 'react';
import {InView} from 'react-intersection-observer';
import {Fade} from 'react-awesome-reveal';
import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';

import {Box, Typography} from '@mui/material';


const Privacy = () => {
    const width = useState(window.innerWidth)[0];
    const height = useState(window.innerHeight)[0];

    const windowWidth = width >= 750 ? '100vw' : width;

    const [line, setLine] = useState(false);
    const [position, setPosition] = useState(0);

    const handlePositionY = () => {
        setPosition(window.scrollY);
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
                    Privacy | The Herbal Digest
                </title>
            </Helmet>
            <div>
                {width >= 750 ?
                    <Box style = {{width: '100vw', height: '115vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}} mb = '-15vh'>
                        <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688634520/Hedge_privacy_tqo5oe.avif'})`, backgroundSize: 'cover', backgroundPositionX: 'center', backgroundPositionY: -position * 0.5, backgroundAttachment: 'fixed'}}>
                            <Box style = {{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                                <Fade duration = {1500}>
                                    <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px black'}}>
                                        Privacy Policy
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
                    <Box style = {{width: width, height: height * 0.625, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${'https://res.cloudinary.com/ddoitjx1o/image/upload/v1688634520/Hedge_privacy_tqo5oe.avif'})`, backgroundSize: 'cover',  backgroundPosition: 'center'}}>
                        <Box style = {{width: width, height: height * 0.625, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}} sx = {{backgroundColor: 'rgba(0, 0, 0, 0.30)'}}>
                            <Box style = {{width: width, height: height * 0.50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Fade duration = {1500}>
                                    <Typography variant = 'h1' fontFamily = 'Big Caslon, serif' fontWeight = 'regular' sx = {{textShadow: '0px 0px 10px rgba(23, 23, 23, 0.70)'}}>
                                        Privacy Policy
                                    </Typography>
                                </Fade>
                                <InView onChange = {(inView, entry) => setLine(!line)}>
                                    <Box style = {{width: line ? width * 0.40 : 0, opacity: '75%'}} sx = {{border: 1, borderColor: 'white', transition: 'width 1.5s ease-out'}} mt = '6%' mb = '6%' />
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
                        <Typography variant = 'body1' fontStyle = 'italic' align = 'center' mt = '6%' mb = '3%'>
                            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' mt = '3%' mb = '3%'>
                            Interpretation and Definitions
                        </Typography>
                        <Typography variant = 'h3' align = 'center' mb = '1.5%'>
                            Interpretation
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                        </Typography>
                        <Typography variant = 'h3' align = 'center' mt = '1.5%' mb = '1.5%'>
                            Definitions
                        </Typography>
                        <Typography variant = 'body1'>
                            For the purposes of this Privacy Policy:
                        </Typography>
                        <Box style = {{width: width >= 750 ? '70vw' : width * 0.80}}>
                            <ul style = {{listStyle: 'disc', fontFamily: 'Quicksand', fontSize: width >= 750 ? '1.5vw' : '1.5vh', margin: 0, padding: 0}}>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to The Herbal Digest.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Country</strong> refers to: California, United States
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Service</strong> refers to the Website.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Website</strong> refers to The Herbal Digest, accessible from{' '}
                                        <Link to = '/' style = {{color: 'black'}}>
                                            https://theherbaldigest.com
                                        </Link>
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
                                    </Typography>
                                </li>
                            </ul>
                        </Box>
                        <Typography variant = 'h2' align = 'center' mt = '3%' mb = '3%'>
                            Collecting and Using Your Personal Data
                        </Typography>
                        <Typography variant = 'h2' align = 'center' mt = '1.5%' mb = '3%'>
                            Types of Data Collected
                        </Typography>
                        <Typography variant = 'h3' align = 'center' mb = '1.5%'>
                            Personal Data
                        </Typography>
                        <Typography variant = 'body1'>
                            While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                        </Typography>
                        <ul style = {{listStyle: 'disc', fontFamily: 'Quicksand', fontSize: width >= 750 ? '1.5vw' : '1.5vh'}}>
                            <li>
                                <Typography variant = 'body1' mb = '1.5%'>
                                    Email address
                                </Typography>
                            </li>
                            <li>
                                <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                    First name and last name
                                </Typography>
                            </li>
                            <li>
                                <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                    Usage Data
                                </Typography>
                            </li>
                        </ul>
                        <Typography variant = 'h3' align = 'center' mt = '1.5%' mb = '1.5%'>
                            Usage Data
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            Usage Data is collected automatically when using the Service.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.
                        </Typography>
                        <Typography variant = 'h3' align = 'center' mt = '1.5%' mb = '1.5%'>
                            Tracking Technologies and Cookies
                        </Typography>
                        <Typography variant = 'body1'>
                            We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:
                        </Typography>
                        <Box style = {{width: width >= 750 ? '70vw' : width * 0.80}}>
                            <ul style = {{listStyle: 'disc', fontFamily: 'Quicksand', fontSize: width >= 750 ? '1.5vw' : '1.5vh', margin: 0, padding: 0}}>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).
                                    </Typography>
                                </li>
                            </ul>
                        </Box>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.
                        </Typography>
                        <Typography variant = 'body1'>
                            We use both Session and Persistent Cookies for the purposes set out below:
                        </Typography>
                        <Typography variant = 'body1' alignSelf = 'flex-start' mt = '1.5%'>
                            <strong>Necessary / Essential Cookies</strong>
                        </Typography>
                        <Box style = {{width: width >= 750 ? '70vw' : width * 0.80}}>
                            <ul style = {{listStyle: 'disc', fontFamily: 'Quicksand', fontSize: width >= 750 ? '1.5vw' : '1.5vh', margin: 0, padding: 0}}>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Type</strong>: Session Cookies
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Administered by</strong>: Us
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Purpose</strong>: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.
                                    </Typography>
                                </li>
                            </ul>
                        </Box>
                        <Typography variant = 'body1' alignSelf = 'flex-start'>
                            <strong>Cookies Policy / Notice Acceptance Cookies</strong>
                        </Typography>
                        <Box style = {{width: width >= 750 ? '70vw' : width * 0.80}}>
                            <ul style = {{listStyle: 'disc', fontFamily: 'Quicksand', fontSize: width >= 750 ? '1.5vw' : '1.5vh', margin: 0, padding: 0}}>                                
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Type</strong>: Persistent Cookies
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Administered by</strong>: Us
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Purpose</strong>: These Cookies identify if users have accepted the use of cookies on the Website.
                                    </Typography>
                                </li>
                            </ul>
                        </Box>
                        <Typography variant = 'body1' alignSelf = 'flex-start'>
                            <strong>Functionality Cookies</strong>
                        </Typography>
                        <Box style = {{width: width >= 750 ? '70vw' : width * 0.80}}>
                            <ul style = {{listStyle: 'disc', fontFamily: 'Quicksand', fontSize: width >= 750 ? '1.5vw' : '1.5vh', margin: 0, padding: 0}}>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Type</strong>: Persistent Cookies
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Administered by</strong>: Us
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>Purpose</strong>: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.
                                    </Typography>
                                </li>
                            </ul>
                        </Box>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' mt = '3%' mb = '3%'>
                            Use of Your Personal Data
                        </Typography>
                        <Typography variant = 'body1'>
                            The Company may use Personal Data for the following purposes:
                        </Typography>
                        <Box style = {{width: width >= 750 ? '70vw' : width * 0.80}}>
                            <ul style = {{listStyle: 'disc', fontFamily: 'Quicksand', fontSize: width >= 750 ? '1.5vw' : '1.5vh', margin: 0, padding: 0}}>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>To manage Your Account</strong>: to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>For the performance of a contract</strong>: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>To contact You</strong>: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>To manage Your requests</strong>: To attend and manage Your requests to Us.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>For business transfers</strong>: We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.
                                    </Typography>
                                </li>
                            </ul>
                        </Box>
                        <Typography variant = 'body1' mt = '1.5%'>
                            We may share Your personal information in the following situations:
                        </Typography>
                        <Box style = {{width: width >= 750 ? '70vw' : width * 0.80}}>
                            <ul style = {{listStyle: 'disc', fontFamily: 'Quicksand', fontSize: width >= 750 ? '1.5vw' : '1.5vh', margin: 0, padding: 0}}>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>With Service Providers</strong>: We may share Your personal information with Service Providers to monitor and analyze the use of our Service,  to contact You.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>For business transfers</strong>: We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>With Affiliates</strong>: We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>With business partners</strong>: We may share Your information with Our business partners to offer You certain products, services or promotions.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>With other users</strong>: when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                        <strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.
                                    </Typography>
                                </li>
                            </ul>
                        </Box>
                        <Typography variant = 'h2' align = 'center' mt = '3%' mb = '3%'>
                            Retention of Your Personal Data
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' mt = '3%' mb = '3%'>
                            Transfer of Your Personal Data
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' mt = '3%' mb = '3%'>
                            Delete Your Personal Data
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.
                        </Typography>
                        <Typography variant = 'body1' alignSelf = 'flex-start' mt = '1.5%' mb = '1.5%'>
                            Our Service may give You the ability to delete certain information about You from within the Service.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' mt = '3%' mb = '3%'>
                            Disclosure of Your Personal Data
                        </Typography>
                        <Typography variant = 'h3' align = 'center' mb = '1.5%'>
                            Business Transactions
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
                        </Typography>
                        <Typography variant = 'h3' align = 'center' mt = '1.5%' mb = '1.5%'>
                            Law Enforcement
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
                        </Typography>
                        <Typography variant = 'h3' align = 'center' mt = '1.5%' mb = '1.5%'>
                            Other Legal Requirements
                        </Typography>
                        <Typography variant = 'body1'>
                            The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:
                        </Typography>
                        <ul style = {{listStyle: 'disc', fontFamily: 'Quicksand', fontSize: width >= 750 ? '1.5vw' : '1.5vh'}}>
                            <li>
                                <Typography variant = 'body1' mb = '1.5%'>
                                    Comply with a legal obligation
                                </Typography>
                            </li>
                            <li>
                                <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                    Protect and defend the rights or property of the Company
                                </Typography>
                            </li>
                            <li>
                                <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                    Prevent or investigate possible wrongdoing in connection with the Service
                                </Typography>
                            </li>
                            <li>
                                <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                    Protect the personal safety of Users of the Service or the public
                                </Typography>
                            </li>
                            <li>
                                <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                                    Protect against legal liability
                                </Typography>
                            </li>
                        </ul>
                        <Typography variant = 'h2' align = 'center' mt = '3%' mb = '3%'>
                            Security of Your Personal Data
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' mt = '3%' mb = '3%'>
                            Children's Privacy
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' mt = '3%' mb = '3%'>
                            Links to Other Websites
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' mt = '3%' mb = '3%'>
                            Changes to this Privacy Policy
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.
                        </Typography>
                        <Typography variant = 'body1' mt = '1.5%' mb = '1.5%'>
                            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                        </Typography>
                        <Typography variant = 'h2' align = 'center' mt = '3%' mb = '3%'>
                            Contact Us
                        </Typography>
                        <Typography variant = 'body1' mb = '1.5%'>
                            If you have any questions about this Privacy Policy, You can contact us:
                        </Typography>
                        <Typography variant = 'body1' mb = '6%'>
                            By email:{' '}
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


export default Privacy;