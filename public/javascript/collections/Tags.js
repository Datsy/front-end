(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.Tags = (function(_super) {
    __extends(Tags, _super);

    function Tags() {
      this.triggerLoaded = __bind(this.triggerLoaded, this);
      _ref = Tags.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Tags.prototype.model = DatsyApp.Tag;

    Tags.prototype.url = '/tags';

    Tags.prototype.initialize = function() {
      return this.fetch({
        success: this.triggerLoaded
      });
    };

    Tags.prototype.has = function(tag) {
      var model, models, _i, _len;
      models = this.models;
      for (_i = 0, _len = models.length; _i < _len; _i++) {
        model = models[_i];
        if (model.attributes.label === tag) {
          return true;
        }
      }
      return false;
    };

    Tags.prototype.list = function() {
      var models;
      models = this.models;
      return this.models.map(function(model) {
        return model.get('label');
      });
    };

    Tags.prototype.triggerLoaded = function() {
      return this.trigger('loaded');
    };

    return Tags;

  })(Backbone.Collection);

}).call(this);
