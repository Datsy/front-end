(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.Tags = (function(_super) {
    __extends(Tags, _super);

    function Tags() {
      this.triggerLoaded = __bind(this.triggerLoaded, this);
      this.buildTags = __bind(this.buildTags, this);
      _ref = Tags.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Tags.prototype.rootUrl = 'http://datsy-dev.azurewebsites.net/search/tag';

    Tags.prototype.initialize = function() {
      this.time = new Date().getTime();
      this.tagList = {};
      this.totalDataBases = 0;
      return this.fetch(this.rootUrl);
    };

    Tags.prototype.fetch = function(url) {
      var _this = this;
      return $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {
          return _this.buildTags(data);
        }
      });
    };

    Tags.prototype.buildTags = function(data) {
      var newTime,
        _this = this;
      console.log(data);
      newTime = new Date().getTime();
      console.log(newTime - this.time);
      data = {
        total: 1,
        tags: data
      };
      this.totalDataBases = data.total;
      this.tagList = {};
      data.tags.forEach(function(datum) {
        return _this.tagList[datum] = true;
      });
      return this.triggerLoaded();
    };

    Tags.prototype.has = function(tag) {
      if (this.tagList[tag]) {
        return true;
      } else {
        return false;
      }
    };

    Tags.prototype.list = function() {
      var _this = this;
      return _(this.tagList).map(function(id, tag) {
        return tag;
      });
    };

    Tags.prototype.filter = function(tags) {
      return this.fetch(this.rootUrl);
    };

    Tags.prototype.triggerLoaded = function() {
      return this.trigger('loaded');
    };

    return Tags;

  })(Backbone.Model);

}).call(this);
