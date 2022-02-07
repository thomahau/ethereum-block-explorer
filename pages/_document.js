import Document, { Html, Head, Main, NextScript } from 'next/document';

class MainDocument extends Document {
  render() {
    return (
      <Html data-theme="halloween" lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MainDocument;
