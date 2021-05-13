import styled, { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  };

  body {
    background-color: #f7f9ff;
  }
`;

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global />
      <Component {...pageProps} />
    </>
  );
}
