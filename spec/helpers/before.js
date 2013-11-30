var DatsyApp = {};
var templates = {};

$("[type='text/x-handlebars-template']").each(function(index, div){
  templates[div.id] = Handlebars.compile(div.innerHTML);
});
