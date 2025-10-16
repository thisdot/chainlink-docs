# TutorialSection Component

A tabbed interface for displaying tutorial links organized by category.

## What is this?

The TutorialSection component displays a collection of tutorials in a clean, organized layout with tabs. Each tab represents a category of tutorials (like "Getting Started" or "Advanced"), and clicking on a tab shows the relevant tutorials as clickable cards.

This component is useful when you have multiple tutorials and want to group them by topic or difficulty level, making it easier for users to find what they need.

## Usage

```tsx
import { TutorialSection } from "@components/TutorialSection/TutorialSection"

;<TutorialSection
  tabs={[
    {
      name: "Getting Started",
      links: [
        {
          title: "Quick Start Guide",
          description: "Learn the basics in 5 minutes",
          link: "/docs/quickstart",
        },
        {
          title: "Installation",
          description: "Set up your development environment",
          link: "/docs/installation",
        },
      ],
    },
    {
      name: "Advanced",
      links: [
        {
          title: "Architecture Overview",
          description: "Understand the system design",
          link: "/docs/architecture",
        },
      ],
    },
  ]}
/>
```

## How to set it up

The component requires a `tabs` prop, which is an array of tab objects. Each tab object contains:

- A **name** (the label shown on the tab button)
- A list of **links** (the tutorials shown when that tab is active)

Each tutorial link needs three pieces of information:

- **title** - The name of the tutorial
- **description** - A short sentence explaining what the tutorial covers
- **link** - The URL where the tutorial can be found

## Props Reference

### `TutorialSection`

| Prop   | Type    | Required | Description                                           |
| ------ | ------- | -------- | ----------------------------------------------------- |
| `tabs` | `Tab[]` | Yes      | List of tabs, each containing a category of tutorials |

### `Tab`

| Property | Type             | Required | Description                                              |
| -------- | ---------------- | -------- | -------------------------------------------------------- |
| `name`   | `string`         | Yes      | The label displayed on the tab (e.g., "Getting Started") |
| `links`  | `TutorialLink[]` | Yes      | The list of tutorials to show when this tab is selected  |

### `TutorialLink`

| Property      | Type     | Required | Description                                  |
| ------------- | -------- | -------- | -------------------------------------------- |
| `title`       | `string` | Yes      | The tutorial's heading                       |
| `description` | `string` | Yes      | A brief explanation of what users will learn |
| `link`        | `string` | Yes      | The URL path to the tutorial page            |

## Components

- **TutorialSection** - Main container with tabs and header
- **TutorialGrid** - Grid layout for tutorial cards
- **TutorialCard** - Individual tutorial card with hover effects
