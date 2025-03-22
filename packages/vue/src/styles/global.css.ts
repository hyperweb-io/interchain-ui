import { globalStyle } from "@vanilla-extract/css";
import { SYSTEM_FONT_STACK } from "../styles/tokens/typography";

globalStyle(`*, *::before, *::after`, {
  boxSizing: `border-box`,
});

globalStyle(`*`, {
  margin: 0,
});

globalStyle(`html, body`, {
  height: `100%`,
  fontFamily: `Inter, ${SYSTEM_FONT_STACK}`,
});

globalStyle(`body`, {
  lineHeight: 1.5,
  WebkitFontSmoothing: `antialiased`,
});

globalStyle(`img, picture, video, canvas, svg`, {
  display: `block`,
  maxWidth: `100%`,
});

globalStyle(`input, button, textarea, select, output`, {
  font: `inherit`,
});

// Avoid text overflow
globalStyle(`p, h1, h2, h3, h4, h5, h6`, {
  overflowWrap: `break-word`,
});

// Create a root stacking context
globalStyle(`#root`, {
  isolation: `isolate`,
});
