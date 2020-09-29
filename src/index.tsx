import React, { useEffect, ReactElement } from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './app/css/styles';
import App from './app';
import api from './client/api';

api.startSocketListeners();

const Routes = (): ReactElement => {
  useEffect(() => {
    async function fetchState() {
      api.fetchState();
    }
    fetchState();
  });

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}
const StyledRoutes = withStyles(styles)(Routes);

hydrate((
    <StyleContext.Provider value={{ insertCss }}>
      <StyledRoutes />
    </StyleContext.Provider>
  ),
  document.getElementById('root')
);
