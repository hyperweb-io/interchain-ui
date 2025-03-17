export const breakpoints = {
  mobile: 0,
  mdMobile: 568,
  smTablet: 666,
  tablet: 768,
  desktop: 1200,
};

export type Breakpoint = keyof typeof breakpoints;

export const breakpointNames = Object.keys(breakpoints) as Breakpoint[];
