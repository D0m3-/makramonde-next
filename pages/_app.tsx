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

        <meta httpEquiv="x-ua-compatible" content="ie=edge"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        ></meta>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml"></link>
        <link rel="manifest" href="/manifest.webmanifest"></link>
        <meta name="theme-color" content="#1890ff"></meta>
        <link
          rel="apple-touch-icon"
          sizes="48x48"
          href="_next/image?url=%2Fimages%2Fmakramonde-transparent.png&w=48&q=90"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="_next/image?url=%2Fimages%2Fmakramonde-transparent.png&w=72&q=90"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="96x96"
          href="_next/image?url=%2Fimages%2Fmakramonde-transparent.png&w=96&q=90"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="_next/image?url=%2Fimages%2Fmakramonde-transparent.png&w=144&q=90"
        ></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
