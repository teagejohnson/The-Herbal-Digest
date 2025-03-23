import {lazy, React, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';

import Loading from './Components/Pages/Loading.jsx';

const Header = lazy(() => import('./Components/Features/Header.jsx'));
const Footer = lazy(() => import('./Components/Features/Footer.jsx'));

const Home = lazy(() => import('./Components/Pages/Home.jsx'));
const About = lazy(() => import('./Components/Pages/About.jsx'));
const Blog = lazy(() => import('./Components/Pages/Blog.jsx'));
const BlogPage = lazy(() => import('./Components/Pages/BlogPage.jsx'));
const Botanicals = lazy(() => import('./Components/Pages/Botanicals.jsx'));
const BotanicalsPage = lazy(() => import('./Components/Pages/BotanicalsPage.jsx'));
const Contact = lazy(() => import('./Components/Pages/Contact.jsx'));
const Privacy = lazy(() => import('./Components/Pages/Privacy.jsx'));
const Remedies = lazy(() => import('./Components/Pages/Remedies.jsx'));
const RemediesPage = lazy(() => import('./Components/Pages/RemediesPage.jsx'));
const Search = lazy(() => import('./Components/Pages/Search.jsx'));
const SearchPage = lazy(() => import('./Components/Pages/SearchPage.jsx'));
const Shop = lazy(() => import('./Components/Pages/Shop.jsx'));
const Subscribe = lazy(() => import('./Components/Pages/Subscribe.jsx'));
const Terms = lazy(() => import('./Components/Pages/Terms.jsx'));
const Unsubscribe = lazy(() => import('./Components/Pages/Unsubscribe.jsx'));
const NotFound = lazy(() => import('./Components/Pages/NotFound.jsx'));


const App = () => {
	return (
    	<HelmetProvider>
            <Suspense fallback = {<Loading />}>
                <Header />
                <Routes>
                    <Route path = '/' element = {<Home />} />
                    <Route path = '/about' element = {<About />} />
                    <Route path = '/blog' element = {<Blog />} />
                    <Route path = '/blog/:slug' element = {<BlogPage />} />  
                    <Route path = '/botanicals' element = {<Botanicals />} />
                    <Route path = '/botanicals/:slug' element = {<BotanicalsPage />} />
                    <Route path = '/contact' element = {<Contact />} />
                    <Route path = '/privacy' element = {<Privacy />} />
                    <Route path = '/remedies' element = {<Remedies />} />
                    <Route path = '/remedies/:slug' element = {<RemediesPage />} />
                    <Route path = '/search' element = {<Search />} />
                    <Route path = '/search/:search' element = {<SearchPage />} />
                    <Route path = '/shop' element = {<Shop />} />
                    <Route path = '/subscribe' element = {<Subscribe />} />
                    <Route path = '/terms' element = {<Terms />} />
                    <Route path = '/unsubscribe' element = {<Unsubscribe />} />
                    <Route path = '*' element = {<NotFound />} />
                </Routes>
                <Footer />
            </Suspense>
        </HelmetProvider>
    );
};


export default App;
