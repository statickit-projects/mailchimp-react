import React from 'react';
import Head from 'next/head';
import OptInForm from '../components/OptInForm';

const Home = () => (
  <div>
    <Head>
      <title>Mailchimp React Example</title>
      <link rel="icon" href="/favicon.png" />
    </Head>
    <OptInForm />
  </div>
);

export default Home;
