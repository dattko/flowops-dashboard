import type { Preview } from "@storybook/nextjs-vite"

import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css"
import "../app/globals.css"

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
