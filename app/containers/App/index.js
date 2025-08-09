/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import Introduce from 'containers/Introduce/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';
import { Showroom } from '../Showroom';
import { News } from '../News';
import { Products } from '../Products';
import Detail from '../Products/component/Detail';
import './style.css';
import { FaFacebookF, FaArrowUp } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';

import { Cart } from '../Cart';
import { Payment } from '../Payment';
import NewsDetail from '../News/component/DetailNews';
import ScrollToTop from '../../components/ScrollToTop';

const AppWrapper = styled.div`
  // max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  overflow-x: hidden;
  // padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppWrapper>
      <ScrollToTop />
      <Helmet
        // titleTemplate="%s - Vinfast An Nhiên"
        titleTemplate="Vinfast An Nhiên"
        defaultTitle="Vinfast An Nhiên"
      >
        <meta name="description" content="Vinfast An Nhiên" />
      </Helmet>
      <Header />
      <div style={{ margin: '2rem' }} />
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="/introduce" component={Introduce} />
        <Route path="/showroom" component={Showroom} />
        <Route path="/product" component={Products} />
        <Route path="/products/:slug" component={Detail} />
        <Route path="/news" component={News} />
        <Route path="/new/:slug" component={NewsDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/payment" component={Payment} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />

      {/* Hotline bên trái */}
      <div className="fixed-hotline">
        <a href="tel:0988062969">Hotline: 0988062969</a>
      </div>

      {/* Mạng xã hội bên phải */}
      <div className="fixed-social">
        <a
          href="https://zalo.me"
          target="_blank"
          rel="noopener noreferrer"
          title="Zalo"
        >
          <SiZalo className="social-icon" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
        >
          <FaFacebookF className="social-icon" />
        </a>
      </div>

      {/* <button
        className={`scroll-top-btn ${showScroll ? 'show' : ''}`}
        onClick={scrollToTop}
        title="Lên đầu trang"
      >
        ↑
      </button> */}
      <button
        className={`scroll-top-btn ${showScroll ? 'show' : ''}`}
        onClick={scrollToTop}
        title="Lên đầu trang"
      >
        <FaArrowUp />
      </button>
      <GlobalStyle />
    </AppWrapper>
  );
}
