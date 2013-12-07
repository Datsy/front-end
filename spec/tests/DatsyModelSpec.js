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

  it('should have tags, cart and visualization data models / collections stored on it', function() {
    expect(datsy.get('tags')).not.toBeUndefined();
    expect(datsy.get('visualizationData')).not.toBeUndefined();
    expect(datsy.get('cart')).not.toBeUndefined();
  });

  it('should let me know if a given tag exists', function() {
    datsy.get('tags').tagList.push('fitbit');
    expect(datsy.tagExists('fitbit')).toBe(true);
  });

  it('should retrive a list of tags from the tags model', function() {
    datsy.get('tags').tagList.push('fitbit');
    datsy.get('tags').tagList.push('health');
    datsy.get('tags').tagList.push('san francisco');
    expect(datsy.listTags()).toEqual(['fitbit', 'health', 'san francisco']);
  });

  it('should be able to add a column to the cart model', function() {
    var cart = datsy.get('cart');
    spyOn(cart, 'addColumn').andCallThrough();
    datsy.addColumn('price','stock_data');
    expect(cart.addColumn).toHaveBeenCalled();
    expect(cart.addColumn.calls.length).toEqual(1);
    expect(cart.cart.values['stock_data'].indexOf('price')).not.toBe(-1);
  });

});
