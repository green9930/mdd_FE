import { createGlobalStyle } from "styled-components";

export const MOBILE_MAX_W = 601;
export const TABLET_MAX_W = 1024;
export const WINDOW_W =
  window.innerWidth > MOBILE_MAX_W ? MOBILE_MAX_W : window.innerWidth;
export const WINDOW_H = window.innerHeight;

export const calcRem = (size: number) => `${size / 14}rem`;

const GlobalStyle = createGlobalStyle`

  * {
    font-size: 14px;    
    box-sizing: border-box;

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
