describe('Cart Model', function() {

  var datsy, cart;

  beforeEach(function() {
    datsy = new DatsyApp.Datsy();
    cart = new DatsyApp.Cart();
  });

  it('has a cart object to store values', function(){
    expect(cart.cart).toEqual(jasmine.any(Object));
    expect(cart.cart.total).toEqual(jasmine.any(Number));
    expect(cart.cart.values).toEqual(jasmine.any(Object));
  });

  it('should reset the cart when clearCart is called' , function() {
    cart.cart.total = 2;
    cart.cart.values['one'] = 'one';
    cart.cart.values['two'] = 'two';
    spyOn(cart, 'clearCart').andCallThrough();
    datsy.clearCart();
    expect(cart.clearCart).toHaveBeenCalled();
  });

});
