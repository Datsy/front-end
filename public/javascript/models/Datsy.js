(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.Datsy = (function(_super) {
    __extends(Datsy, _super);

    function Datsy() {
      _ref = Datsy.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Datsy.prototype.initialize = function() {
      return this.set('AppName', 'Datsy');
    };

    return Datsy;

  })(Backbone.Model);

}).call(this);
