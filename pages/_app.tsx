import Head from 'next/head';

const GA_MEASUREMENT_ID = process.env.GOOGLE_ANALYTICS_ID;

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        {/* Global site tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GA_MEASUREMENT_ID}');
`,
          }}
        ></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
