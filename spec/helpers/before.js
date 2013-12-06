var DatsyApp = {};

var templates = {};
$("[type='text/x-handlebars-template']").each(function(index, div){
  templates[div.id] = Handlebars.compile(div.innerHTML);
});

window.universalTemplates = {};
$("[type='text/y-handlebars-template']").each(function(index, div){
  universalTemplates[div.id] = Handlebars.compile(div.innerHTML);
});