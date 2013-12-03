(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.Database = (function(_super) {
    __extends(Database, _super);

    function Database(attributes) {
      this.attributes = attributes;
    }

    Database.prototype.getColumns = function() {
      return this.attributes.columns;
    };

    Database.prototype.getId = function() {
      return this.attributes.id;
    };

    return Database;

  })(Backbone.Model);

}).call(this);
