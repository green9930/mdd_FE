import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NanumSquareNeo';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  } 

  * {
    font-size: 14px;    
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    ::-webkit-scrollbar {
      display: none;
    }
    /* @media screen and (max-width: 360px){
      font-size: 12px;
    } */
  }

  html, body {
    box-sizing: border-box;
    margin: 0 auto;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  ul, ol, li {
    list-style: none;
    padding: 0;
  }

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  .a11y-hidden {
    overflow: hidden;
    position: absolute;
    clip: rect(0, 0, 0, 0);
    clip-path: circle(0);
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
  }
`;

export default GlobalStyle;
