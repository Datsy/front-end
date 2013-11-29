describe('Datsy Model', function() {
  var datsy;

  beforeEach(function() {
    datsy = new DatsyApp.Datsy();
  });

  it('has an app title', function(){
    expect(datsy.get('AppName')).toBe('Datsy');
  });

});
