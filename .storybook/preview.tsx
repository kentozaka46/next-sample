import type { Preview } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { theme } from "../src/themes";
import Image from "next/image";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  textarea {
    padding: 0;
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    transition: .25s;
    color: #000;
  }
`;

Image.propTypes = {
  unoptimized: undefined,
};

Image.defaultProps = {
  unoptimized: true,
};
