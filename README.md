# Twig Components

An experimental repository to use Twig templates in Web Components.

The goal of this project is to share Twig templates between the server and
client, which has a few benefits:

1. The client can re-render Twig templates without contacting the server
1. The server and a separate frontend application using React/Angular/Vue can
share templates and styling
1. Server side rendering without a Javascript engine is possible

# Installation and development

More docs will come soon, but you can run a dev server with

```
$ npm install
$ npm run dev-example
```

# Server side rendering proof of concept

A proof of concept for server side rendering with PHP can be seen by running:

```
$ npm install
$ npm run build-example
$ cd example
$ composer install
$ php -S 127.0.0.1:12345
```

# Todo

- [x] Create base custom element
- [x] Import SCSS/Twig from a file during build
- [ ] Create a Yeoman generator for new components
- [ ] Figure out what production packaging looks like (50%)
- [ ] Implment server-side-rendering with PHP Twig (50%)
- [ ] Write a ton of docs
