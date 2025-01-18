# Interchain UI Kit

<p align="center" width="100%">
    <img height="250" src="https://github.com/cosmology-tech/interchain-ui/assets/545047/d08ac5da-cba7-461b-b707-d0fe2e2205fd" />
</p>

<p align="center" width="100%">
Interchain UI for VueJS
</p>

<p align="center" width="100%">
  <a href="https://www.npmjs.com/package/@interchain-ui/vue"><img height="20" src="https://img.shields.io/github/package-json/v/cosmology-tech/interchain-ui?filename=packages%2Fvue%2Fpackage.json"/></a>
  <a href="https://github.com/cosmology-tech/interchain-ui/blob/main/LICENSE"><img height="20" src="https://img.shields.io/badge/license-MIT-blue.svg"/></a>
  <a href="https://www.npmjs.com/package/@interchain-ui/vue">
    <img height="20" src="https://img.shields.io/npm/dt/@interchain-ui/vue" />
  </a>
</p>

## 🎨 What is Interchain UI?

Interchain UI is a foundation library for UI elements used in [cosmos-kit](https://github.com/cosmology-tech/cosmos-kit) and other packages. It provides developers with pre-built components and a foundation for creating user interfaces across different frameworks, such as VueJS, React, Angular, Svelte, SolidJS, and Web Components, enabling developers to customize UI elements and themes. This gives us the ability to code a component once, and it will compile to all framework targets.

## Setup

```bash
# If you use react
yarn add @interchain-ui/react

# If you use vue
yarn add @interchain-ui/vue
```

## Setup and scripts for development

- `pnpm install` to bootstrap the repo
- `pnpm run dev` to watch the repo for changes and then recompile
- `pnpm run compile` to compile from mitosis components to other packages, you can give it a flag `-p` or `--platforms` .ie `pnpm run compile -p react vue`
- `pnpm run c:react` or `pnpm run c:vue` to compile specifically to react or vue
- `pnpm run clean` to clean `.node_modules` or `pnpm run clean:assets` to clean build/compile output

## Overview and structure

![Overview](./docs/overview-ui-kit.png)
We create components inside a single source of truth folder `<root>/src` with Mitosis lite JSX format, then through our compiler, it's going to compile our components and build it in sub packages' `src` and `dist`.

When we publish packages, we are actually publishing the sub packages generated from `<root>/src`, which are `packages/react` and `packages/vue`, not the `<root>/src` itself.

The compiler is a wrapper over `@builder.io/mitosis` CLI with some extra source code handling logic and some nice CLI add-ons like arguments handling...etc.

There are some rules of thumbs and some tips for creating Mitosis components:

- File names must end with `*.lite.tsx`
- Style sheets must be in `*.css.ts` files, this is because we use a styling solution called `vanilla-extract` to have a CSS-in-JS API across all frameworks.
- For a component, you must use default export, not named export. This is a limitation of Mitosis
- There are more rules and limitations, please read more about Mitosis [here](https://github.com/BuilderIO/mitosis/tree/main/docs)
- To quickly test to see the compilation result from one Mitosis to any framework source code, please use
[mitosis sandbox](https://mitosis.builder.io/). It's similar to TS playground but for Mitosis testing purpose.

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
