describe('Cart Model', function() {

  var datsy, cart;

  beforeEach(function() {
    datsy = new DatsyApp.Datsy();
    cart = datsy.get('cart');
    cart.cart = { total: 0, values: { } };
  });

  it('has a cart object to store values', function(){
    expect(cart.cart).toEqual(jasmine.any(Object));
    expect(cart.cart.total).toEqual(jasmine.any(Number));
    expect(cart.cart.values).toEqual(jasmine.any(Object));
  });

  it('should reset the cart when clearCart is called' , function() {
    cart.cart.total = 2;
    expect(cart.cart.total).toEqual(2);
    spyOn(cart, 'clearCart').andCallThrough();
    datsy.clearCart();
    expect(cart.cart.total).toEqual(0);
    expect(cart.clearCart).toHaveBeenCalled();
  });

  it('should be able to add columns to the cart', function() {
    oldCartTotal = cart.cart.total;
    datsy.addColumn('apple', 'stock');
    newCartTotal = cart.cart.total;
    expect(oldCartTotal).not.toEqual(newCartTotal);
    expect(cart.cart.values['stock']).toEqual(['apple']);
  });
  
  it('should get all column values from the cart', function() {
     cart.addColumn('apple', 'stock');
     cart.addColumn('samsung', 'stock');
     cart.addColumn('microsoft', 'stock');
     var columns = cart.getColumns();
     expect(columns).toEqual({stock: ['apple', 'samsung', 'microsoft']});
  });

});
