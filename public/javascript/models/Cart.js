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
      this.cart = {
        total: 0,
        values: {}
      };
      this.canStoreCart = this.supportsStorage();
      if (this.canStoreCart) {
        this.storageName = "datsy-app";
        return this.checkStorage(this.storageName);
      }
    };

    Cart.prototype.addColumn = function(name, id) {
      this.cart['values'][id] = this.cart['values'][id] || {};
      this.cart['values'][id][name] = true;
      this.cart['total']++;
      if (this.canStoreCart) {
        this.addCartToStorage();
      }
      return this.cart.total;
    };

    Cart.prototype.checkStorage = function(name) {
      var cart;
      cart = localStorage[name];
      if (cart !== void 0) {
        return this.cart = JSON.parse(cart);
      }
    };

    Cart.prototype.addCartToStorage = function() {
      var cart;
      cart = JSON.stringify(this.cart);
      return localStorage[this.storageName] = cart;
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
