const inline = require('inline-source');

// This is a loader that uses inline-source to inline any asset found in a Twig
// template. The source of the inlined content comes either from require or the
// raw file processed by inline-source.
// Long story short, <style src="component.scss"></style> which remove the src
// attribute and replace the contents of the style tag with the compiled SASS
// output.

module.exports = function (content, map, meta) {
  const callback = this.async();
  inline(content, {
    rootpath: this.context,
    handlers: [
      function (source, context, next) {
        this.loadModule(source.filepath, function (err, subSource, sourceMap, module) {
          if (!err) {
            try {
              const result = this.exec(subSource, source.filepath);
              source.content = result[0][1];
            }
            catch (e) {}
          }
          next();
        }.bind(this));
      }.bind(this)
    ]
  }, function (err, html) {
    if (err) {
      callback(err, content, map, meta);
    }
    else {
      callback(null, html, map, meta);
    }
  });
};
