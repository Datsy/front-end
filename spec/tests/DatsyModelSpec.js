describe('Datsy Model', function() {

  var datsy;

  beforeEach(function() {
    datsy = new DatsyApp.Datsy();
    datsy.set('templates', templates);
  });

  it('has an app title', function(){
    expect(datsy.get('AppName')).toBe('Datsy');
  });

  it('should store templates', function() {
    expect(datsy.get('templates')).not.toBeUndefined();
    expect(datsy.get('templates')['datsyApp']).toEqual(templates['datsyApp']);
  });

});
