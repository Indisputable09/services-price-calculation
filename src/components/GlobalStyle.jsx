import { createGlobalStyle } from 'styled-components';
import 'normalize.css';
export const GlobalStyle = createGlobalStyle`
  body {
  margin: 0;
  font-family: 'Nunito', sans-serif;
  color: ${p => p.theme.colors.primaryTextColor};
  line-height: ${p => p.theme.lineHeights.body};
  }
  main {
    background-color: ${p => p.theme.colors.mainBg};
  }
ul {
  list-style: none;
}
h1, h2, h3, h4, h5, h6, p, ul {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
button {
cursor: pointer;
padding: 0;
color: ${p => p.theme.colors.primaryTextColor};
}
a {
  text-decoration: none;
  color: ${p => p.theme.colors.primaryTextColor};
}
`;
