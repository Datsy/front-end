var DatsyApp = {};

var templates = {};

for (var prop in window['compTemplates']) {
  var name = prop.split('/')[3];
  name = name.split('.')[0];
  templates[name] = window['compTemplates'][prop];
}
