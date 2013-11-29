describe('DatsyAppView', function() {
  var datsy, datsyAppView;
  datsy = new DatsyApp.Datsy();
  datsyAppView = new DatsyApp.DatsyView({model: datsy});
  $("[type='text/x-handlebars-template']").each(function(index, div){
    templates[div.id] = Handlebars.compile(div.innerHTML);
  });
  datsy.set('templates', templates); 

  beforeEach(function () {
    
  });

  it('should have a model', function() {
    expect(datsyAppView.model).toBe(datsy);
  });

  xit('should have a template', function() {
    expect(datsyAppView.template).toEqual(datsy.get('templates')['datsyApp']);
  });

  xit('should generate a router', function() {
    expect(DatsyView.router).toEqual(jasmine.any(Datsy.Router));
  });

});
