describe('DatsyAppView', function() {
  var datsy = new DatsyApp.Datsy();
  datsy.set('templates', templates);

  var datsyAppView = new DatsyApp.DatsyView({model: datsy});

  describe('initialize', function() {
    it('should have a model', function() {
      expect(datsyAppView.model).toBe(datsy);
    });

    it('should have a template', function() {
      expect(datsyAppView.template).toEqual(datsy.get('templates')['datsyApp']);
    });

    it('should generate a router', function() {
      expect(datsyAppView.router).toEqual(jasmine.any(DatsyApp.Router));
    });

    it('starts Backbone history', function() {
      Backbone.history.started = null;
      Backbone.history.stop();
      spyOn(Backbone.history, "start");
      datsyAppView.initialize();

      expect(Backbone.history.start).toHaveBeenCalled();
    });

  });

});
