const path = require("path");

// Location of root node_modules
const modulesDir = path.join(process.cwd(), "node_modules");

// https://github.com/storybookjs/storybook/pull/13300#issuecomment-756675536
const updateEmotionAliases = (config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      "@emotion/core": path.join(modulesDir, "@emotion/react"),
      "@emotion/styled": path.join(modulesDir, "@emotion/styled"),
      "@emotion/styled-base": path.join(modulesDir, "@emotion/styled"),
      "emotion-theming": path.join(modulesDir, "@emotion/react")
    }
  }
});

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-apollo-client"
  ],
  core: {
    builder: "webpack5"
  },
  // https://github.com/storybookjs/storybook/issues/15336
  typescript: {
    reactDocgen: false
  },
  managerWebpack: updateEmotionAliases,
  webpackFinal: async (config) => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];
    // Use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve("babel-loader");
    // Use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve("@babel/preset-react"),
      require.resolve("@babel/preset-env")
    ];
    config.module.rules[0].use[0].options.plugins = [
      // Use @babel/plugin-proposal-class-properties for class arrow functions
      require.resolve("@babel/plugin-proposal-class-properties"),
      // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      require.resolve("babel-plugin-remove-graphql-queries")
    ];
    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ["browser", "module", "main"];
    // Typescript setup
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]],
        plugins: [
          require.resolve("@babel/plugin-proposal-class-properties"),
          // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
          require.resolve("babel-plugin-remove-graphql-queries")
        ]
      }
    });
    config.resolve.extensions.push(".ts", ".tsx");
    // Svg setup
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test(".svg"));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      enforce: "pre",
      use: ["@svgr/webpack"],
      exclude: /fonts\/.*\.svg/,
      include: path.resolve(__dirname, "../")
    });
    return updateEmotionAliases(config);
  }
};
