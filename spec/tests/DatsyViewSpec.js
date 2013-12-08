describe('DatsyAppView', function() {
 
  var datsy, datsyAppView;
  datsy = new DatsyApp.Datsy();
  datsy.set('templates', templates);
  var click = jQuery.Event( "click" );
 
  beforeEach(function () {
    datsyAppView = new DatsyApp.DatsyView({ model: datsy });
  });

  afterEach(function() {
    Backbone.history.stop();
  });

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
