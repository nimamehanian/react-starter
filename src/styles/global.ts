import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0px;
    padding: 0px;
    outline: none;
    text-rendering: optimizeLegibility;
  }

  @font-face {
    font-family: "";
    src: url("");
  }
`;

export default GlobalStyles;
