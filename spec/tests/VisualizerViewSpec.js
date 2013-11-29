describe('VisualizerView', function() {
  datsy = new DatsyApp.Datsy();
  
  $("[type='text/x-handlebars-template']").each(function(index, div){
    templates[div.id] = Handlebars.compile(div.innerHTML);
  });
  datsy.set('templates', templates); 

  var view = new DatsyApp.VisView({model: datsy});

  beforeEach(function() {
    
  });

});