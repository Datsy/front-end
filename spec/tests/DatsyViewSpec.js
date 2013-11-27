describe('DatsyAppView', function() {
 
  var datsy, datsyAppView;
 
  beforeEach(function () {
    datsy = new DatsyApp.Datsy();
    datsyAppView = new DatsyApp.DatsyView({model: datsy});
  });

  it('should have a model', function() {
    expect(datsyAppView.model).toBe(datsy);
  });

  it('should have a template', function() {
    expect(datsyAppView.template).toEqual(datsy.get('templates')['datsyApp']);
  });

  it('should generate a router', function() {
    expect(DatsyView.router).toEqual(jasmine.any(Datsy.Router));
  });

});
