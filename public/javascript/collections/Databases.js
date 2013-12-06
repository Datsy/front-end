(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.Databases = (function(_super) {
    __extends(Databases, _super);

    function Databases() {
      this.each = __bind(this.each, this);
      this.addModels = __bind(this.addModels, this);
      _ref = Databases.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Databases.prototype.initialize = function(params) {
      this.url = params.url;
      this.databases = [];
      return this.fetch();
    };

    Databases.prototype.filterByTags = function(tag) {
      this.models = this.models.filter(function(model) {
        return model.get('tags').indexOf(tag) !== -1;
      });
      return this.length = this.models.length;
    };

    Databases.prototype.fetch = function() {
      var _this = this;
      return $.ajax({
        url: this.url,
        method: 'GET',
        success: function(data) {
          return _this.addModels(data);
        }
      });
    };

    Databases.prototype.addModels = function(data) {
      var _this = this;
      data.forEach(function(database) {
        var model;
        model = new DatsyApp.Database(database);
        return _this.databases.push(model);
      });
      console.log(this.databases);
      this.sortBy('table_name');
      return this.trigger('add');
    };

    Databases.prototype.sortBy = function(sortType) {
      return this.databases.sort(function(a, b) {
        if (a.attributes[sortType].toLowerCase() > b.attributes[sortType].toLowerCase()) {
          return 1;
        }
        if (a.attributes[sortType].toLowerCase() < b.attributes[sortType].toLowerCase()) {
          return -1;
        }
        return 0;
      });
    };

    Databases.prototype.each = function(cb) {
      var _this = this;
      return this.databases.forEach(function(database) {
        return cb(database);
      });
    };

    return Databases;

  })(Backbone.Collection);

}).call(this);
