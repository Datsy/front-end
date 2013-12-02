(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.Tag = (function(_super) {
    __extends(Tag, _super);

    function Tag() {
      this.triggerLoaded = __bind(this.triggerLoaded, this);
      _ref = Tag.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Tag.prototype.defaults = {
      label: "",
      id: void 0
    };

    Tag.prototype.rootUrl = '/tags';

    Tag.prototype.initialize = function() {
      this.tagList = [];
      return this.fetch({
        success: this.triggerLoaded
      });
    };

    Tag.prototype.fetch = function(options) {
      var _this = this;
      return $.ajax({
        url: this.rootUrl,
        method: 'GET',
        success: function(data) {
          return console.log(data);
        }
      });
    };

    Tag.prototype.has = function(tag) {};

    Tag.prototype.list = function() {};

    Tag.prototype.filter = function(tags) {};

    Tag.prototype.triggerLoaded = function() {
      return this.trigger('loaded');
    };

    return Tag;

  })(Backbone.Model);

}).call(this);
