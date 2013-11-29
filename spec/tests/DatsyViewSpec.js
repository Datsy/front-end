describe('DatsyAppView', function() {
  var datsy = new DatsyApp.Datsy();
  datsy.set('templates', templates);

  var datsyAppView = new DatsyApp.DatsyView({model: datsy});

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
