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
- `dist/[tag-name].js` - A file for each component transpiled to ES5, _without_
any polyfills or the Twig.js library. This is useful for performance reasons,
as a pages should only have to include the minimum JS required to render.

# Supporting server side rendering

To support server side rendering in PHP, it is recommended that Twig templates
are distributed in `dist/templates`, in the same relative directory structure
as their source.

Let's say you have a component template in `proper-name/proper-name.twig`,
which has the statement `{% '../header.twig' %}`. Your distributed templates
should be `dist/templates/proper-name/proper-name.twig` and
`dist/templates/header.twig`.

By keeping the template structure relatively the same, server side renderers
can process your template without errors. 

# A note on using Twig's import, include, extends and embed

Twig provides a variety of methods to re-use templates, but in the context of
Web Components, things can get tricky.

Let's say you have a template that looks like this:

```twig
{% embed "reused.twig" %}
  {% block foo %} {{ attribute_name }} {% endblock %}
{% endembed %}
```

If you render this with Twig.js, an HTTP call will be made to fetch
`reused.html.twig` every time the Web Component is rendered. But if you're
just distributing JS files, that `embed` will be made relative to `dist`,
and likely fail. Yikes!

In my experience, the best way around this problem is to pre-compile the
template before distribution, using something like
[twig-loader](https://github.com/zimmo-be/twig-loader). Twig loader will parse
your template as a part of your Webpack build, which means faster render times
for clients, and support for re-using templates.

# Example project

For an example project that follows this specification, see:
[generator-twig-components-webpack](https://github.com/mortenson/generator-twig-components-webpack)
