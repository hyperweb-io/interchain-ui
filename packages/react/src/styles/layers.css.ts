import { globalLayer } from "@vanilla-extract/css";

// CSS Layers
// Last layer defined here will have the most power
// See: https://vanilla-extract.style/documentation/api/layer/#layer
export const baseLayer = globalLayer("base");
export const themeLayer = globalLayer("theme");
