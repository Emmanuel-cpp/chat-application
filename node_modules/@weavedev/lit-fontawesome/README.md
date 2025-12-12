# lit-fontawesome

[![Build Status - Travis CI](https://img.shields.io/travis/weavedev/lit-fontawesome.svg)](https://travis-ci.org/weavedev/lit-fontawesome)
[![Test Coverage - Code Climate](https://img.shields.io/codeclimate/coverage/weavedev/lit-fontawesome.svg)](https://codeclimate.com/github/weavedev/lit-fontawesome/test_coverage)
[![MIT](https://img.shields.io/github/license/weavedev/lit-fontawesome.svg)](https://github.com/weavedev/lit-fontawesome/blob/master/LICENSE)
[![NPM](https://img.shields.io/npm/v/@weavedev/lit-fontawesome.svg)](https://www.npmjs.com/package/@weavedev/lit-fontawesome)

Convert Fontawesome SVG definitions to LitElement compatible SVGs and data URLs for inline use and in CSS

## Install

```
npm i @weavedev/lit-fontawesome
```

## API documentation

We generate API documentation with [TypeDoc](https://typedoc.org).

[![API Documentation](https://img.shields.io/badge/API-Documentation-blue?style=for-the-badge&logo=typescript)](https://weavedev.github.io/lit-fontawesome/)

## Usage

### Icons in your CSS and HTML

You can use the Fontawesome icons in your HTML as inline SVGs, and in your CSS as data URLs.

```ts
import { css, html } from 'lit-element';

import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';
import { litFontawesome, urlFontawesome } from '@weavedev/lit-fontawesome';

// Use it in your CSS
css`
    .myCoffeeIcon {
        background-image: url('${urlFontawesome(faCoffee)}');
    }
`;

// Use it in your HTML
html`
    <div>${litFontawesome(faCoffee)}</div>
`;
```

### Options

Set custom colors and class-names

```ts
litFontawesome(
    faCoffee, // Icon
    // Options
    {
        // Custom class-names
        className: 'myClassName',
        
        // Custom colors
        color: 'palevioletred'
    }
);
```

## License

[MIT](https://github.com/weavedev/lit-fontawesome/blob/master/LICENSE)

Made by [Paul Gerarts](https://github.com/gerarts) and [Weave](https://weave.nl)
