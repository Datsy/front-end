describe('Datsy Model', function() {
  var datsy = new DatsyApp.Datsy();

  it('has an app title', function(){
    expect(datsy.get('AppName')).toBe('Datsy');
  });

});
