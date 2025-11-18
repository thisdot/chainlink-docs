# ChangelogSnippet Component

## What This Component Does

The ChangelogSnippet component displays the most recent changelog entry for a specific product or topic. It searches through changelog entries and shows the latest update in a card format with an expandable description.

## Notes

On pages like "CCIP" (individual product pages), the changelog card has a border and has slightly different styling than the component shown on the Changelog page. This component has no border and some different hover effects. This styling is controlled by the "showBorder" prop. The showBorder prop when set to true (true is the default value) is what you see on individual product pages. This will be the default styling when using the changelog components. On the Changelog page you can see the styling when showBorder is set to false.

## How to Use It

Import the component into your MDX file and provide a search query:

```astro
import ChangelogSnippet from "@components/ChangelogSnippet/ChangelogSnippet.astro"

<ChangelogSnippet query="ccip" />
```

## Props

| Prop         | Type    | Required | Description                                                                                 |
| ------------ | ------- | -------- | ------------------------------------------------------------------------------------------- |
| `query`      | string  | Yes      | The search term used to find relevant changelog entries (e.g., "ccip", "vrf", "automation") |
| `showBorder` | boolean | No       | Whether to show a border around the card. Defaults to true.                                 |

## Complete Example

Here's a full example of using the component in your documentation page:

```astro
---
import ChangelogSnippet from "@components/ChangelogSnippet/ChangelogSnippet.astro"
---

# CCIP Documentation Learn about Cross-Chain Interoperability Protocol.

<ChangelogSnippet query="ccip" />
```

This will display the latest CCIP-related changelog entry with a link to view the full changelog.
