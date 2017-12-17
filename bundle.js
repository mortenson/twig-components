"use strict";

const fs = require('fs-extra');
const sass = require('node-sass');
const path = require('path');

const args = process.argv.slice(2);
if (args.length === 0) {
  throw new Error('A directory to build from is required.');
}

const basepath = args[0];
if (!fs.existsSync(basepath) || !fs.statSync(basepath).isDirectory()) {
  throw new Error(`The directory "${basepath}" was not found`);
}

const subdirs = fs.readdirSync(basepath).filter(function (file) {
  const subpath = path.join(basepath,  file);
  if (fs.statSync(subpath).isDirectory()) {
    return fs.existsSync(path.join(subpath, file + '.html.twig')) && fs.existsSync(path.join(subpath, file + '.js'));
  }
  return false;
});

if (subdirs.length === 0) {
  throw new Error('No component directories found.');
}

let templates = {};
let entrypoint = '';

subdirs.forEach(function (subdir) {
  const subpath = path.join(basepath, subdir);
  let template = fs.readFileSync(path.join(subpath, subdir + '.html.twig'), 'utf-8');
  if (fs.existsSync(path.join(subpath, subdir + '.scss'))) {
    const output = sass.renderSync({
      data: fs.readFileSync(path.join(subpath, subdir + '.scss'), 'utf-8')
    });
    template = '<style>' + output.css.toString() + "</style>\n" + template;
  }
  templates[subdir] = template;
  const className = 'TwigComponent' + subdir.replace('-', '');
  entrypoint += `
import ${className} from ${JSON.stringify('./' + path.join(subdir, subdir + '.js'))};
customElements.get(${JSON.stringify(subdir)}) || customElements.define(${JSON.stringify(subdir)}, ${className});
customElements.get(${JSON.stringify(subdir)}).template = ${JSON.stringify(template)};`;
});

fs.outputJSONSync(path.join(basepath, 'templates.json'), templates);
fs.outputFileSync(path.join(basepath, 'components.js'), entrypoint);
