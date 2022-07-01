import React from 'react';
import Document, { Head, Main, NextScript, Html } from 'next/document';
import { GTM } from '~services';
import { ampStyles } from '~utils';

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const isAmp = initialProps?.html.includes('amp-header');

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {isAmp && <style dangerouslySetInnerHTML={{ __html: ampStyles }} />}
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta name="application-name" content="BuyaCar" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="BuyaCar" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#213846" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/pwa/apple-touch-icon.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico?v=2" />
          <GTM.GTM_JS />
        </Head>
        <body>
          <noscript>Your browser does not support JavaScript!</noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
