const fs = require('fs');
const templates = require(__dirname + '/dist/templates.js');

fs.writeFileSync(__dirname + '/dist/templates.json', JSON.stringify(templates, null, 2));
