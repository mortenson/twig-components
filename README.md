[![npm](https://img.shields.io/npm/v/twig-components.svg)]() [![Build Status](https://travis-ci.org/mortenson/twig-components.svg?branch=master)](https://travis-ci.org/mortenson/twig-components)

# Twig Components

An experimental repository to use Twig templates in Web Components.

This project provides a base web component that others can extend, and
specifications for what distributed Twig components should look like.

Beyond being useful to users already using something like [Twig.js](https://github.com/twigjs/twig.js)
, using Twig templates opens the door to server side rendering _without_
Javascript. This is critical for progressive enhancement, SEO, and
accessibility.

If you're using PHP and want to try out server side rendering, check out
[twig-components-ssr](https://github.com/mortenson/twig-components-ssr).

# Installation

`npm install --save-dev twig-components`

# Extending the base component

The base component in `twig-base.js` can be extended minimally by implementing
the `observedAttributes` and `getTemplate` methods:

```js
import TwigBase from 'twig-components/twig-base';

class MyComponent extends TwigBase {

  static get observedAttributes() {
    return ['name'];
  }

  getTemplate() {
    return 'Hello {{ name }}!';
  }

}

customElements.define('my-component', MyComponent);
```

Then, when `<my-component name="World"></my-component>` is placed on a page,
the template will be compiled and rendered with the current attributes.

You can read the [Wiki page](https://github.com/mortenson/twig-components/wiki/Building-your-first-component-from-scratch) on this topic for more detailed information.

# Creating a component library with Webpack

While extending the base component in the above example seems easy, getting it
working in production has a few hard problems:

- Distributing one JS file for multiple components
- Supporting older browsers
- Bundling Web Component polyfills
- Splitting up assets into distinct files (ex: .js, .twig, and .scss)
- Building a templates.json file

To ease some of this pain, a Yeoman generator is available to quickly spin up a
new component library, which has a complex Webpack configuration that does all
of this out of the box. See [generator-twig-components-webpack](https://github.com/mortenson/generator-twig-components-webpack)
for more details.

# Example project

An example project with some useful Twig Components is maintained at [twig-components-example](https://github.com/mortenson/twig-components-example). If you want to view a live demo of the example project, [click here](https://mortenson.coffee/twig-components-example/).

The project was built using Yeoman, please check it out!

# Distribution specification

To help keep various distribution and bundling methods consistent, a
specification is maintained in [DISTRIBUTION.md](DISTRIBUTION.md).

# Running tests

Tests for the base class are written with the [web-component-tester](https://github.com/Polymer/web-component-tester)
package.

To run tests:

1. Ensure that Java is available in your `PATH`
1. Run `npm install -g bower rollup web-component-tester`
1. Run `npm run test`

# Todo

- [x] Create base custom element
- [x] Import SCSS/Twig from a file during build
- [x] Create a Yeoman generator for new components
- [x] Figure out what production packaging looks like
- [x] Write unit test coverage for the base class
- [x] Implment server-side-rendering with PHP Twig
- [x] Write a ton of docs
