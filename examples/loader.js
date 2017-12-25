// This is a loader that uses inline-source to inline any asset found in a Twig
// template. The source of the inlined content comes either from require or the
// raw file processed by inline-source.
// Long story short, <style src="./component.scss"></style> ends up being the
// same as '<style>' + require(__dirname + './component.scss') + '</style>'

const inline = require('inline-source');
const Module = require('module');

function exec(code, filename) {
  const module = new Module(filename, this);
  module.paths = Module._nodeModulePaths(this.context);
  module.filename = filename;
  module._compile(code, filename);
  return module.exports;
}

module.exports = function (content, map, meta) {
  // @see https://github.com/webpack/webpack.js.org/issues/1268#issuecomment-313513988
  this.exec = exec;
  const callback = this.async();
  inline(content, {
    rootpath: this.context,
    handlers: [
      function (source, context, next) {
        this.loadModule(source.filepath, function (err, subSource, sourceMap, module) {
          if (!err) {
            const result = this.exec(subSource, source.filepath);
            source.content = result[0][1];
          }
          next();
        }.bind(this));
      }.bind(this)
    ]
  }, function (err, html) {
    if (!err) {
      content = html;
    }
    callback(err, content, map, meta);
  });
};
