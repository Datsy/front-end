(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.Cart = (function(_super) {
    __extends(Cart, _super);

    function Cart() {
      _ref = Cart.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Cart.prototype.initialize = function() {
      this.cart = [];
      this.canStoreCart = this.supportsStorage();
      if (this.canStoreCart) {
        this.storageName = "datsy-app";
        return this.checkStorage(this.storageName);
      }
    };

    Cart.prototype.addColumn = function(name, id) {
      this.cart.push([name, id]);
      this.addCartToStorage();
      return this.cart.length;
    };

    Cart.prototype.checkStorage = function(name) {
      var cart;
      cart = localStorage[name];
      if (cart !== null) {
        return this.cart = cart;
      }
    };

    Cart.prototype.addCartToStorage = function() {
      return localStorage[this.storageName] = this.cart;
    };

    Cart.prototype.supportsStorage = function() {
      var e;
      try {
        return 'localStorage' in window && window['localStorage'] !== null;
      } catch (_error) {
        e = _error;
        return false;
      }
    };

    return Cart;

  })(Backbone.Model);

}).call(this);
