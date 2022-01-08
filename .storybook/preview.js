import { MockedProvider } from "@apollo/client/testing";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { action } from "@storybook/addon-actions";
import { addDecorator } from "@storybook/react";
import React from "react";
import theme from "../src/gatsby-theme-material-ui-top-layout/theme";

// Gatsby config
global.___loader = {
  enqueue: () => {},
  hovering: () => {}
};
global.__BASE_PATH__ = "/";
if (window) {
  window.___navigate = (pathname) => {
    action("NavigateTo:")(pathname);
  };
}

export const muiCache = createCache({
  key: "mui",
  prepend: true
});

const StylesDecorator = (storyFn) => (
  <CacheProvider value={muiCache}>
    <ThemeProvider theme={theme}>
      <>
        <CssBaseline />
        {storyFn()}
      </>
    </ThemeProvider>
  </CacheProvider>
);

addDecorator(StylesDecorator);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  apolloClient: {
    MockedProvider
  }
};
