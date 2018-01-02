# Distributing a Twig Component library

To keep various distributions of Twig Components consistent, it's recommended
this specification be followed if you're not already using the Webpack
generator.

# Required files

- `dist/components.js` - The components transpiled to ES5, _without_ any
polyfills or the Twig.js library. This is useful if one page includes multiple
component libraries.
- `dist/components.bundled.js` - The components transpiled to ES5, _with_
Twig.js and the polyfills included. You should be able to include this on
any HTML page.
- `dist/templates.js` - A Node compatible module that exports an object mapping
tag names to Twig templates. This is useful for server side rendering in Node.
- `dist/templates.json` - A JSON file mapping tag names to Twig templates. This
is useful for server side rendering in PHP (see below).

# Supporting server side rendering

To support server side rendering in PHP, it is recommended that a JSON file be
distributed with production JS files named `templates.json`. The JSON in this
file should contain an object that maps tag names to Twig templates.

For example, the earlier `MyComponent` example would be represented as:

```json
{
  "my-component": "Hello {{ name }}!"
}
```

Only include components in this file that can be rendered on the server,
if a Javascript runtime is required to represent the initial state of the
component simply omit it from `templates.json`.

# A note on using Twig's import, include, extends and embed

Twig provides a variety of methods to re-use templates, but in the context of
Web Components and server side rendering, things can get tricky.

Let's say you have a template that looks like this:

```twig
{% embed "reused.html.twig" %}
  {% block foo %} {{ attribute_name }} {% endblock %}
{% endembed %}
```

If you render this with Twig.js, an HTTP call will be made to fetch
`reused.html.twig` every time the Web Component is rendered. But if you're
just distributing JS files, that `embed` will be made relative to `dist`,
and likely fail. Yikes!

In my experience, the best way around this problem is to pre-compile the
template before distribution, using something like
[twig-loader](https://github.com/zimmo-be/twig-loader).

This is a great solution for JS-only Twig Components, but PHP Twig can't
process a compiled Twig.js template - it has to access a "raw" template file.
If you put the template above in `/dist/templates.json`, PHP would look for
`reused.html.twig` inside `dist`. You could add all the re-usable templates to
`dist` yourself, but that's hard to automate with a build process.

There are a few solutions on the table for server side rendering with other
templates, but none feel "right" yet:
 
1. Don't use import/include/extends/embed in your Twig Component templates.
Instead, create new components for shared templates instead and nest your
components.
1. Change this specification so that instead of `templates.json`, all the
 template files are distributed in `dist` in the same directory structure as
 the source.
1. Make it clear in documentation that if you use shared templates, server side
rendering will just not work.

Any input on the above in issues or private messages are welcome.
