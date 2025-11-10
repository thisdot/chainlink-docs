# TryItOut Component

A component that displays an interactive accordion of features alongside a code sample preview.

## Usage

```astro
<TryItOut
  codeSampleSrc="/samples/YourCodeFile.sol"
  accordionTabs={[
    {
      title: "Your Feature Title",
      text: "A brief description of what this feature does.",
    },
  ]}
/>
```

## Props

### `codeSampleSrc` (required)

The file path to the code sample you want to display. This should point to a file in the `/samples/` folder.

**Example:** `"/samples/ChainlinkFunctions/AutomatedFunctionsConsumerExample.sol"`

### `accordionTabs` (required)

A list of expandable sections that describe different features. Each tab needs:

- **title**: The heading text for the accordion item
- **text**: The description that appears when the accordion is expanded

**Example:**

```js
;[
  {
    title: "Transfer Tokens",
    text: "Move tokens between different blockchains easily.",
  },
  {
    title: "Fetch Data",
    text: "Get real-time information from external sources.",
  },
]
```
