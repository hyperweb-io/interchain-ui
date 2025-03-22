"use client";

import { useState } from "react";
import {
  Text,
  Box,
  Stack,
  Container,
  Button,
  Avatar,
  Tooltip,
  IconButton,
  TextField,
  Spinner,
  Icon,
  Divider,
  useTheme,
  Tabs,
} from "@interchain-ui/react";
import { VerticalTabs } from "../ui/vertical-tabs";

// Types
interface ComponentExample {
  name: string;
  component: React.ReactNode;
  description?: string;
}

interface ComponentCategory {
  name: string;
  examples: ComponentExample[];
}

// Component categories data
const componentCategories: ComponentCategory[] = [
  {
    name: "Buttons",
    examples: [
      {
        name: "Primary Button",
        component: <Button>Primary Button</Button>,
        description: "Default button with primary styling",
      },
      {
        name: "Secondary Button",
        component: <Button intent="secondary">Secondary Button</Button>,
        description: "Secondary action button",
      },
      {
        name: "Tertiary Button",
        component: <Button intent="tertiary">Tertiary Button</Button>,
        description: "Tertiary action button",
      },
      {
        name: "Ghost Button",
        component: (
          <Button intent="secondary" variant="ghost">
            Ghost Button
          </Button>
        ),
        description: "Button with ghost variant",
      },
      {
        name: "Outlined Button",
        component: (
          <Button intent="secondary" variant="outlined">
            Outlined Button
          </Button>
        ),
        description: "Button with outlined variant",
      },
      {
        name: "Connect Wallet",
        component: <Button leftIcon="walletFilled">Connect Wallet</Button>,
        description: "Button with left icon",
      },
      {
        name: "Button Sizes",
        component: (
          <Stack direction="horizontal" space="$4" align="center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Stack>
        ),
        description: "Different button sizes",
      },
    ],
  },
  {
    name: "Navigation",
    examples: [
      {
        name: "Basic Tabs",
        component: (
          <Box width="100%">
            <Tabs
              tabs={[
                { label: "Overview", content: <Text>Overview content</Text> },
                { label: "Settings", content: <Text>Settings content</Text> },
                { label: "Resources", content: <Text>Resources content</Text> },
              ]}
            />
          </Box>
        ),
        description: "Basic tabbed navigation",
      },
    ],
  },
  {
    name: "Data Display",
    examples: [
      {
        name: "Avatar Sizes",
        component: (
          <Stack direction="horizontal" space="$4" align="center">
            <Avatar name="John Doe" size="sm" />
            <Avatar name="Jane Smith" size="md" />
            <Avatar name="Bob Johnson" size="lg" />
          </Stack>
        ),
        description: "Avatar component in different sizes",
      },
      {
        name: "Avatar with Image",
        component: (
          <Stack direction="horizontal" space="$4" align="center">
            <Avatar
              name="John Doe"
              src="https://avatars.githubusercontent.com/u/1?v=4"
            />
            <Avatar
              name="Jane Smith"
              src="https://avatars.githubusercontent.com/u/2?v=4"
            />
          </Stack>
        ),
        description: "Avatar with image fallback to initials",
      },
      {
        name: "Tooltip Variants",
        component: (
          <Stack direction="horizontal" space="$4" align="center">
            <Tooltip title="Default tooltip">
              <Button size="sm">Hover me</Button>
            </Tooltip>
            <Tooltip title="With arrow">
              <Button size="sm" intent="secondary">
                With Arrow
              </Button>
            </Tooltip>
          </Stack>
        ),
        description: "Tooltip variations",
      },
    ],
  },
  {
    name: "Feedback",
    examples: [
      {
        name: "Spinner Sizes",
        component: (
          <Stack direction="horizontal" space="$4" align="center">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </Stack>
        ),
        description: "Loading spinners in different sizes",
      },
    ],
  },
  {
    name: "Icons",
    examples: [
      {
        name: "Common Icons",
        component: (
          <Stack direction="horizontal" space="$4">
            <Icon name="add" />
            <Icon name="close" />
            <Icon name="arrowDownS" />
            <Icon name="arrowUpS" />
            <Icon name="informationLine" />
            <Icon name="walletFilled" />
            <Icon name="checkLine" />
          </Stack>
        ),
        description: "Commonly used icons",
      },
      {
        name: "Icon Sizes",
        component: (
          <Stack direction="horizontal" space="$4" align="center">
            <Icon name="walletFilled" />
            <Icon name="walletFilled" />
            <Icon name="walletFilled" />
          </Stack>
        ),
        description: "Icons in different sizes",
      },
    ],
  },
  {
    name: "Inputs",
    examples: [
      {
        name: "Text Field Variants",
        component: (
          <Stack direction="vertical" space="$4">
            <TextField
              id="default"
              value="Default Input"
              label="Default Input"
              placeholder="Enter text"
            />
          </Stack>
        ),
        description: "Text field variations",
      },
    ],
  },
];

// Client Components
function ComponentGrid({ category }: { category: ComponentCategory }) {
  const { theme } = useTheme();

  return (
    <Box
      display="grid"
      attributes={{
        style: {
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        },
      }}
    >
      {category.examples.map((example, index) => (
        <Box
          key={index}
          padding="$6"
          borderRadius="$lg"
          bg={theme === "dark" ? "$blackAlpha900" : "$background"}
          transition="all 0.2s ease-in-out"
          _hover={{
            borderColor: "$gray300",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
          }}
        >
          <Text
            fontWeight="$semibold"
            fontSize="$lg"
            color="$accentText"
            attributes={{ marginBottom: "$2" }}
          >
            {example.name}
          </Text>
          {example.description && (
            <Text
              color="$gray600"
              fontSize="$sm"
              attributes={{ marginBottom: "$6" }}
            >
              {example.description}
            </Text>
          )}
          <Box
            padding="$6"
            backgroundColor={theme === "dark" ? "$gray800" : "$gray50"}
            borderRadius="$md"
            overflow="auto"
            maxWidth="100%"
            border="1px solid"
            borderColor={theme === "dark" ? "$gray700" : "$gray200"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="120px"
          >
            {example.component}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

// Main Component
export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(0);
  const { theme } = useTheme();

  return (
    <Box
      width="100%"
      paddingX="$4"
      paddingY="$6"
      backgroundColor={theme === "dark" ? "$gray700" : "$background"}
      minHeight="100vh"
    >
      <Container maxWidth="1200px">
        <Box marginBottom="$8">
          <Text
            as="h1"
            fontSize="$2xl"
            fontWeight="$bold"
            attributes={{ marginBottom: "$2" }}
          >
            Interchain UI Components
          </Text>
          <Text color="$gray600">
            Explore our component library and documentation
          </Text>
        </Box>

        <VerticalTabs
          tabs={componentCategories.map((category) => ({
            label: category.name,
            content: (
              <div>
                <Text
                  as="h2"
                  fontSize="$xl"
                  fontWeight="$bold"
                  color="$text"
                  attributes={{ marginBottom: "$4" }}
                >
                  {category.name} Components
                </Text>
                <Divider />
                <Box marginTop="$6">
                  <ComponentGrid category={category} />
                </Box>
              </div>
            ),
          }))}
          activeTab={activeCategory}
          onTabChange={setActiveCategory}
        />
      </Container>
    </Box>
  );
}
