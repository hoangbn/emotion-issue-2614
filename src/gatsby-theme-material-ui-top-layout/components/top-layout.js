import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import ThemeTopLayout from "gatsby-theme-material-ui-top-layout/src/components/top-layout";
import React from "react";

const muiCache = createCache({
  key: "mui",
  prepend: true
});


const TopLayout = ({ children, theme }) => {
  return (
      <CacheProvider value={muiCache}>
        <ThemeTopLayout theme={theme}>
          {children}
        </ThemeTopLayout>
      </CacheProvider>
  );
};

export default TopLayout;
