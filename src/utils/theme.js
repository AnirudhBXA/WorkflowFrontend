import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem({
  ...defaultConfig,
  preflight: false,
  theme: {
    ...defaultConfig.theme,
    tokens: {
      ...defaultConfig.theme?.tokens,
      fonts: {
        body: {
          value: `"Segoe UI Variable", "Segoe UI", system-ui, sans-serif`,
        },
        heading: {
          value: `"Segoe UI Variable", "Segoe UI", system-ui, sans-serif`,
        },
      },
    },
  },
});
