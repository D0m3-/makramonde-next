import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { fetchHome } from '../src/api/contentful';
import styles from '../styles/Home.module.css';

const Home = ({ content }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div>{documentToReactComponents(content)}</div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { page } = await fetchHome();
  return { props: { content: page.fields.content } };
};

export default Home;
