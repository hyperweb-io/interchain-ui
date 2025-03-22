"use client";

import { useState } from "react";
import clsx from "clsx";
import { useTheme } from "@interchain-ui/react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface VerticalTabsProps {
  tabs: Tab[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
}

export function VerticalTabs({
  tabs,
  activeTab: controlledActiveTab,
  onTabChange,
}: VerticalTabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(0);
  const { themeClass } = useTheme();

  // Use controlled or uncontrolled active tab
  const activeTab =
    typeof controlledActiveTab !== "undefined"
      ? controlledActiveTab
      : internalActiveTab;

  const handleTabClick = (index: number) => {
    if (onTabChange) {
      onTabChange(index);
    } else {
      setInternalActiveTab(index);
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-col md:flex-row gap-6 min-h-[400px]",
        themeClass,
      )}
    >
      {/* Tab List */}
      <div className="md:w-64 flex-shrink-0">
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={clsx(
                "flex items-center px-4 py-3 text-left w-full rounded-lg transition-all duration-200",
                "whitespace-nowrap md:whitespace-normal",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                {
                  "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm":
                    activeTab === index,
                  "text-gray-600 dark:text-gray-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/50":
                    activeTab !== index,
                },
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 min-w-0">
        <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 text-foreground rounded-lg p-6 h-full border border-gray-200/50 dark:border-gray-800/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          {tabs[activeTab]?.content}
        </div>
      </div>
    </div>
  );
}
