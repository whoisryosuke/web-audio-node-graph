import {
  createSystem,
  defaultBaseConfig,
  defaultSystem,
  defineConfig,
  defineTokens,
} from "@chakra-ui/react";

// Extend or override the Chakra UI theme variables here
const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: { value: "IBM Plex Mono, sans-serif" },
        heading: { value: ["IBM Plex Mono", "sans-serif"] },
      },
    },
  },
});
export const system = createSystem(defaultSystem._config, customConfig);

// const tokens = defineTokens({
//   fonts: {
//     body: { value: "IBM Plex Mono, sans-serif" },
//     heading: { value: ["IBM Plex Mono", "sans-serif"] },
//   },
// });

// export const system = createSystem({
//   theme: { tokens },
// });
