"use client";

import { useState, useEffect } from "react";
import {
  ThemeProvider as InterchainThemeProvider,
  Box,
  IconButton,
  useTheme,
} from "@interchain-ui/react";
import clsx from "clsx";

const lightTheme = {
  name: "light",
  vars: {
    colors: {
      background: "#ffffff",
      foreground: "#171717",
    },
  },
};

const darkTheme = {
  name: "dark",
  vars: {
    colors: {
      background: "#0a0a0a",
      foreground: "#ededed",
    },
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, themeClass, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <InterchainThemeProvider themeDefs={[lightTheme, darkTheme]}>
      <div className={clsx("app", themeClass)}>
        <Box
          position="relative"
          backgroundColor={theme === "dark" ? "$gray700" : "$white"}
        >
          <Box
            // Prevent flash of unstyled background on Safari
            bg={isMounted ? "$background" : "transparent"}
            transition="all 0.3s ease"
            attributes={{
              id: "layout-container",
            }}
          >
            {children}
          </Box>

          <Box position="absolute" top="$4" right="$6">
            <IconButton
              variant="outlined"
              intent="tertiary"
              size="sm"
              icon={theme === "dark" ? "sunLine" : "moonLine"}
              onClick={() => {
                if (theme === "light") {
                  return setTheme("dark");
                }
                return setTheme("light");
              }}
            />
          </Box>
        </Box>
      </div>
    </InterchainThemeProvider>
  );
}
