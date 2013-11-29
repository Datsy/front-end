describe('DatsyAppView', function() {
  var datsy, datsyAppView;
  datsy = new DatsyApp.Datsy();
  
  $("[type='text/x-handlebars-template']").each(function(index, div){
    templates[div.id] = Handlebars.compile(div.innerHTML);
  });
  datsy.set('templates', templates); 

  datsyAppView = new DatsyApp.DatsyView({model: datsy});

  it('should have a model', function() {
    expect(datsyAppView.model).toBe(datsy);
  });

  it('should have a template', function() {
    expect(datsyAppView.template).toEqual(datsy.get('templates')['datsyApp']);
  });

  it('should generate a router', function() {
    expect(datsyAppView.router).toEqual(jasmine.any(DatsyApp.Router));
  });

});
