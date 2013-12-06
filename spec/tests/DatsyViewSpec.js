describe('DatsyAppView', function() {
 
  var datsy, datsyAppView;
 
  beforeEach(function () {
    datsy = new DatsyApp.Datsy();
    datsy.set('templates', templates);
    datsyAppView = new DatsyApp.DatsyView({ model: datsy });
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
