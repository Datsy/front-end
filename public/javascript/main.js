$(document).ready(function() {
  var templates = {};
  var datsy = new DatsyApp.Datsy();

  $("[type='text/x-handlebars-template']").each(function(index, div){
    templates[div.id] = Handlebars.compile(div.innerHTML);
  });
  datsy.set('templates', templates);
  
  var datsyAppView = new DatsyApp.DatsyView({ model: datsy });
  
});