import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import CategoriesSection from '../components/CategoriesSection';
import FeaturedProducts from '../components/FeaturedProducts';
import PaymentMethods from '../components/PaymentMethods';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>MahsuratShop - Your Fashion Destination</title>
        <meta name="description" content="Shop the latest fashion trends at MahsuratShop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <HeroBanner />
      <CategoriesSection />
      <FeaturedProducts />
      <PaymentMethods />
    </Layout>
  );
} 