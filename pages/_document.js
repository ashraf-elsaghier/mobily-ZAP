// pages/_document.js

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    // ✅ READ THE NONCE FROM THE RESPONSE HEADER SET BY MIDDLEWARE.JS
    // Note: ctx.res is only available on the server
    const nonce = ctx.res?.getHeader("X-Nonce") || "";

    // IMPORTANT: When using nonces, Next.js requires pages to be dynamically rendered.
    // If you are still seeing 'unsafe-inline' errors, ensure no pages are using SSG
    // or use a different CSP strategy for those pages (e.g., hash-based).

    return {
      ...initialProps,
      locale: ctx?.locale || "en",
      nonce, // <--- Pass nonce to render
    };
  }

  render() {
    const clarityID = process.env.NEXT_PUBLIC_CLARITY_ID;

    // Retrieve the nonce from props
    const nonce = this.props.nonce;

    return (
      <Html
        dir={this.props.locale === "ar" ? "rtl" : "ltr"}
        lang={this.props.locale}
      >
        <Head>
          {/* Note: In Next.js, the 'nonce' attribute is automatically applied to NextScript
              but must be manually applied to any custom inline scripts like below.
              It's good practice to also put nonce on Head, but often redundant if NextScript has it. */}

          <link rel="shortcut icon" href="/favicon.ico" />
          {/* ... other external stylesheets/links (no changes needed) ... */}

          {/* Load Clarity and GA scripts */}
          {clarityID && (
            <>
              {/* Apply nonce to the Clarity inline script */}
              <script
                type="text/javascript"
                nonce={nonce} // <--- NONCE APPLIED HERE
                dangerouslySetInnerHTML={{
                  __html: `
                    (function(c,l,a,r,i,t,y){
                      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "${clarityID}");
                  `,
                }}
              />
              <script
                async
                // Note: No nonce needed for external script tags like this unless strict-dynamic is used
                src={`https://www.googletagmanager.com/gtag/js?id=G-V3S8895Y82`}
              ></script>

              {/* Apply nonce to the Google Analytics inline script */}
              <script
                nonce={nonce} // <--- NONCE APPLIED HERE
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-V3S8895Y82');
                  `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          {/* Apply nonce to NextScript for Next.js internal inline scripts/styles */}
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
// import Document, { Html, Head, Main, NextScript } from "next/document";

// class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     const initialProps = await Document.getInitialProps(ctx);
//     return { ...initialProps, locale: ctx?.locale || "en" };
//   }

//   render() {
//     const isProduction = process.env.NODE_ENV === "production";
//     const clarityID = process.env.NEXT_PUBLIC_CLARITY_ID;
//     return (
//       <Html
//         dir={this.props.locale === "ar" ? "rtl" : "ltr"}
//         lang={this.props.locale}>
//         <Head>
//           <link rel="shortcut icon" href="/favicon.ico" />
//           <link rel="preconnect" href="https://fonts.googleapis.com" />
//           <link rel="preconnect" href="https://fonts.gstatic.com" />
//           <link
//             href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap"
//             rel="stylesheet"
//           />
//           <link
//             rel="stylesheet"
//             href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
//             integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
//             crossOrigin="anonymous"
//             referrerPolicy="no-referrer"
//           />
//           <link
//             rel="stylesheet"
//             type="text/css"
//             href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
//           />
//           {/* Load Clarity script only in production */}
//           {isProduction && clarityID && (
//             <>
//               <script
//                 type="text/javascript"
//                 dangerouslySetInnerHTML={{
//                   __html: `
//                 (function(c,l,a,r,i,t,y){
//                   c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
//                   t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
//                   y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
//                 })(window, document, "clarity", "script", "${clarityID}");
//                 `,
//                 }}
//               />
//               <script
//                 async
//                 src={`https://www.googletagmanager.com/gtag/js?id=G-V3S8895Y82`}></script>
//               <script
//                 dangerouslySetInnerHTML={{
//                   __html: `
//                 window.dataLayer = window.dataLayer || [];
//                 function gtag(){dataLayer.push(arguments);}
//                 gtag('js', new Date());
//                 gtag('config', 'G-V3S8895Y82');
//               `,
//                 }}
//               />
//             </>
//           )}
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// export default MyDocument;
