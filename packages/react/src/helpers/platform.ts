import { debug } from "./debug";

export enum Platform {
  Default = "default",
  Angular = "angular",
  Preact = "preact",
  Qwik = "qwik",
  React = "react",
  Solid = "solid",
  Svelte = "svelte",
  Vue = "vue",
  Webcomponents = "webcomponent",
}

let platform = Platform.Default;

export function setPlatform(newPlatform: Platform) {
  debug(`Setting new platform ${newPlatform}`);

  platform = newPlatform;
}

export function getPlatform(): Platform {
  return platform;
}

export function isSSR(): boolean {
  try {
    return typeof window === undefined;
  } catch (error) {}

  return true;
}

export function closestBodyElement(node: HTMLElement) {
  let parent = node.parentElement;
  while (parent) {
    if (parent.tagName === "BODY") {
      return parent as HTMLIFrameElement;
    }
    parent = parent.parentElement;
  }
  return null;
}

export function getOwnerDocument(node: HTMLElement) {
  return node.ownerDocument;
}
