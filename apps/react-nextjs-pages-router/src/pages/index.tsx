import { useState } from "react";
import localFont from "next/font/local";
import Image from "next/image";
import {
  Text,
  Box,
  Stack,
  Container,
  Tabs,
  Button,
  Avatar,
  Tooltip,
  IconButton,
  TextField,
  Spinner,
  Icon,
  Divider,
} from "@interchain-ui/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Define the structure for our component examples
interface ComponentExample {
  name: string;
  component: React.ReactNode;
  description?: string;
}

// Define the structure for our component categories
interface ComponentCategory {
  name: string;
  examples: ComponentExample[];
}

// Create our component categories with manually defined examples
const componentCategories: ComponentCategory[] = [
  {
    name: "Buttons",
    examples: [
      {
        name: "Primary Button",
        component: <Button intent="primary">Primary Button</Button>,
        description: "Primary action button with default styling",
      },
      {
        name: "Secondary Button",
        component: <Button intent="secondary">Secondary Button</Button>,
        description: "Secondary action button with muted styling",
      },
      {
        name: "Success Button",
        component: <Button intent="success">Success Button</Button>,
        description: "Button indicating a successful action",
      },
      {
        name: "Warning Button",
        component: <Button intent="warning">Warning Button</Button>,
        description: "Button indicating a warning or caution",
      },
      {
        name: "Danger Button",
        component: <Button intent="danger">Danger Button</Button>,
        description: "Button indicating a destructive action",
      },
      {
        name: "Icon Button",
        component: <IconButton icon="add" />,
        description: "Button with only an icon",
      },
    ],
  },
  {
    name: "Layout",
    examples: [
      {
        name: "Accordion Example",
        component: (
          <Box border="1px solid" borderColor="$gray200" borderRadius="$md">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding="$4"
              backgroundColor="$gray100"
              cursor="pointer"
            >
              <Text fontWeight="$semibold">Section 1</Text>
              <Icon name="arrowDownS" />
            </Box>
            <Box padding="$4">
              <Text>Content for section 1</Text>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding="$4"
              backgroundColor="$gray100"
              cursor="pointer"
            >
              <Text fontWeight="$semibold">Section 2</Text>
              <Icon name="arrowDownS" />
            </Box>
            <Box padding="$4">
              <Text>Content for section 2</Text>
            </Box>
          </Box>
        ),
        description: "Collapsible content sections",
      },
      {
        name: "Stack - Horizontal",
        component: (
          <Stack direction="horizontal" space="$4">
            <Box backgroundColor="$primary" padding="$4" color="$white">
              <Text>Item 1</Text>
            </Box>
            <Box backgroundColor="$primary" padding="$4" color="$white">
              <Text>Item 2</Text>
            </Box>
            <Box backgroundColor="$primary" padding="$4" color="$white">
              <Text>Item 3</Text>
            </Box>
          </Stack>
        ),
        description: "Horizontal stack layout with spacing",
      },
      {
        name: "Stack - Vertical",
        component: (
          <Stack direction="vertical" space="$4">
            <Box backgroundColor="$primary" padding="$4" color="$white">
              <Text>Item 1</Text>
            </Box>
            <Box backgroundColor="$primary" padding="$4" color="$white">
              <Text>Item 2</Text>
            </Box>
            <Box backgroundColor="$primary" padding="$4" color="$white">
              <Text>Item 3</Text>
            </Box>
          </Stack>
        ),
        description: "Vertical stack layout with spacing",
      },
    ],
  },
  {
    name: "Data Display",
    examples: [
      {
        name: "Avatar",
        component: (
          <Stack direction="horizontal" space="$4">
            <Avatar name="John Doe" />
            <Avatar name="Jane Smith" />
            <Avatar name="Bob Johnson" />
          </Stack>
        ),
        description: "User avatar with initials",
      },
      {
        name: "Tooltip",
        component: (
          <Tooltip title="This is a tooltip">
            <Button>Hover me</Button>
          </Tooltip>
        ),
        description: "Informational tooltip on hover",
      },
    ],
  },
  {
    name: "Feedback",
    examples: [
      {
        name: "Spinner",
        component: <Spinner size="md" />,
        description: "Loading indicator",
      },
    ],
  },
  {
    name: "Navigation",
    examples: [
      {
        name: "Tabs",
        component: (
          <Tabs
            tabs={[
              { label: "Tab 1", content: <Text>Content for Tab 1</Text> },
              { label: "Tab 2", content: <Text>Content for Tab 2</Text> },
              { label: "Tab 3", content: <Text>Content for Tab 3</Text> },
            ]}
          />
        ),
        description: "Tabbed navigation",
      },
    ],
  },
  {
    name: "Icons",
    examples: [
      {
        name: "Basic Icons",
        component: (
          <Stack direction="horizontal" space="$4">
            <Icon name="add" />
            <Icon name="close" />
            <Icon name="arrowDownS" />
            <Icon name="arrowUpS" />
            <Icon name="informationLine" />
          </Stack>
        ),
        description: "Basic icon set",
      },
    ],
  },
  {
    name: "Inputs",
    examples: [
      {
        name: "Text Field",
        component: (
          <TextField id="text-field-1" value="" placeholder="Enter text here" />
        ),
        description: "Basic text input field",
      },
      {
        name: "Text Field with Label",
        component: (
          <TextField
            id="text-field-2"
            value=""
            label="Username"
            placeholder="Enter username"
          />
        ),
        description: "Text input with label",
      },
    ],
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(
    componentCategories[0].name,
  );

  // Find the active category
  const currentCategory =
    componentCategories.find((cat) => cat.name === activeCategory) ||
    componentCategories[0];

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-[family-name:var(--font-geist-sans)]`}
    >
      <Box
        padding="$6"
        backgroundColor="$primary"
        color="$white"
        marginBottom="$6"
      >
        <Container>
          <Stack
            direction="horizontal"
            space="$4"
            attributes={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack
              direction="horizontal"
              space="$4"
              attributes={{ alignItems: "center" }}
            >
              <Image
                src="/cosmology.svg"
                alt="Cosmology logo"
                width={120}
                height={25}
                priority
              />
              <Text fontWeight="$bold" fontSize="$xl">
                Interchain UI Playground
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container>
        <Box marginBottom="$6">
          <Tabs
            tabs={componentCategories.map((category) => ({
              label: category.name,
              content: null, // We're handling content display separately
            }))}
            activeTab={componentCategories.findIndex(
              (cat) => cat.name === activeCategory,
            )}
            onActiveTabChange={(index) =>
              setActiveCategory(componentCategories[index].name)
            }
          />
        </Box>

        <Box marginBottom="$10">
          <Text
            as="h1"
            fontSize="$2xl"
            fontWeight="$bold"
            attributes={{ marginBottom: "$4" }}
          >
            {currentCategory.name} Components
          </Text>
          <Divider />
        </Box>

        <Box
          display="grid"
          attributes={{
            style: {
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
            },
          }}
        >
          {currentCategory.examples.map((example, index) => (
            <Box
              key={index}
              padding="$4"
              border="1px solid"
              borderColor="$gray200"
              borderRadius="$md"
              backgroundColor="$cardBg"
            >
              <Text fontWeight="$bold" attributes={{ marginBottom: "$2" }}>
                {example.name}
              </Text>
              {example.description && (
                <Text
                  color="$gray600"
                  fontSize="$sm"
                  attributes={{ marginBottom: "$4" }}
                >
                  {example.description}
                </Text>
              )}
              <Box padding="$4" backgroundColor="$gray100" borderRadius="$md">
                {example.component}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </div>
  );
}
