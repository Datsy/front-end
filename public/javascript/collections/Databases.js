(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.Databases = (function(_super) {
    __extends(Databases, _super);

    function Databases() {
      _ref = Databases.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Databases.prototype.model = DatsyApp.Database;

    Databases.prototype.initialize = function(params) {
      this.url = params.url;
      return this.fetch();
    };

    return Databases;

  })(Backbone.Collection);

}).call(this);
