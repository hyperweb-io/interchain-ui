# Interchain UI Kit

<p align="center" width="100%">
    <img height="250" src="https://github.com/cosmology-tech/interchain-ui/assets/545047/d08ac5da-cba7-461b-b707-d0fe2e2205fd" />
</p>

<p align="center" width="100%">
Interchain UI for React
</p>

<p align="center" width="100%">
  <a href="https://www.npmjs.com/package/@interchain-ui/react"><img height="20" src="https://img.shields.io/github/package-json/v/cosmology-tech/interchain-ui?filename=packages%2Freact%2Fpackage.json"/></a>
  <a href="https://github.com/cosmology-tech/interchain-ui/blob/main/LICENSE"><img height="20" src="https://img.shields.io/badge/license-MIT-blue.svg"/></a>
  <a href="https://www.npmjs.com/package/@interchain-ui/react">
    <img height="20" src="https://img.shields.io/npm/dt/@interchain-ui/react" />
  </a>
</p>

## 🎨 What is Interchain UI?

Interchain UI is a foundation library for UI elements used in [cosmos-kit](https://github.com/cosmology-tech/cosmos-kit) and other packages. It provides developers with pre-built components and a foundation for creating user interfaces across different frameworks, such as VueJS, React, Angular, Svelte, SolidJS, and Web Components, enabling developers to customize UI elements and themes. This gives us the ability to code a component once, and it will compile to all framework targets.

## Usage

First install using your favorite package manager
```bash
npm i @interchain-ui/react

yarn add @interchain-ui/react

pnpm add @interchain-ui/react
```

Then in your root route/layout, import `ThemeProvider` and CSS

```TSX
// layout.tsx
import { ThemeProvider, OverlaysManager } from '@interchain-ui/react';
import '@interchain-ui/react/styles';

export function RootLayout(props: LayoutProps) {
  return (
    <ThemeProvider>
      {props.children}
      <OverlaysManager />
    </ThemeProvider>
  )
}
```

After these steps are done, you can import and use `@interchain-ui/react` components.


## Setup and scripts for development

- `pnpm install` to bootstrap the repo
- `pnpm run dev` to watch the repo for changes and then recompile
- `pnpm run compile` to compile from mitosis components to other packages, you can give it a flag `-p` or `--platforms` .ie `yarn compile -p react vue`
- `pnpm run c:react` or `pnpm run c:vue` to compile specifically to react or vue
- `pnpm run clean` to clean `.node_modules` or `pnpm run clean:assets` to clean build/compile output

## Icon

Check [Icon guide](./docs/icons.md) to know how to add more icons

## Our Website

⚛️ https://cosmology.zone/products/interchain-ui

## Related

Checkout these related projects:

* [telescope](https://github.com/cosmology-tech/telescope) Your Frontend Companion for Building with TypeScript with Cosmos SDK Modules.
* [@cosmwasm/ts-codegen](https://github.com/CosmWasm/ts-codegen) Convert your CosmWasm smart contracts into dev-friendly TypeScript classes.
* [chain-registry](https://github.com/cosmology-tech/chain-registry) Everything from token symbols, logos, and IBC denominations for all assets you want to support in your application.
* [cosmos-kit](https://github.com/cosmology-tech/cosmos-kit) Experience the convenience of connecting with a variety of web3 wallets through a single, streamlined interface.
* [create-cosmos-app](https://github.com/cosmology-tech/create-cosmos-app) Set up a modern Cosmos app by running one command.
* [interchain-ui](https://github.com/cosmology-tech/interchain-ui) The Interchain Design System, empowering developers with a flexible, easy-to-use UI kit.
* [starship](https://github.com/cosmology-tech/starship) Unified Testing and Development for the Interchain.

## Credits

Checkout [`mitosis`](https://github.com/BuilderIO/mitosis) from BuilderIO to compile lite JSX. 

🛠 Built by Hyperweb (formerly Cosmology) — if you like our tools, please checkout and contribute to [our github ⚛️](https://github.com/hyperweb-io)
