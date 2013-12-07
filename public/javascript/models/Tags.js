(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.Tags = (function(_super) {
    __extends(Tags, _super);

    function Tags() {
      this.random = __bind(this.random, this);
      this.triggerLoaded = __bind(this.triggerLoaded, this);
      this.buildTags = __bind(this.buildTags, this);
      _ref = Tags.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Tags.prototype.rootUrl = 'http://datsy-dev.azurewebsites.net/search/tag';

    Tags.prototype.initialize = function() {
      this.allTags = [];
      this.tagList = [];
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
      var _this = this;
      console.log('Tags loaded');
      this.tagList = [];
      this.totalDataBases = data.total;
      data.tag.forEach(function(tag) {
        tag = tag.toLowerCase();
        if (_this.tagList.indexOf(tag) === -1) {
          return _this.tagList.push(tag);
        }
      });
      if (!this.allTags.length) {
        this.allTags = this.tagList;
      }
      return this.triggerLoaded();
    };

    Tags.prototype.has = function(tag) {
      if (this.tagList.indexOf(tag) === -1) {
        return false;
      }
      return true;
    };

    Tags.prototype.list = function() {
      return this.tagList;
    };

    Tags.prototype.filter = function(tags) {
      var url,
        _this = this;
      url = this.rootUrl + '?';
      tags.forEach(function(tag) {
        if (tag.split(' ').length > 1) {
          tag = tag.split(' ').join('+');
        }
        return url += 'tag=' + tag + '&';
      });
      url = url.slice(0, url.length - 1);
      return this.fetch(url);
    };

    Tags.prototype.triggerLoaded = function() {
      return this.trigger('loaded');
    };

    Tags.prototype.random = function(num) {
      var result, used, _i, _results,
        _this = this;
      if (num >= this.allTags.length) {
        return this.allTags;
      }
      result = [];
      used = {};
      (function() {
        _results = [];
        for (var _i = 1; 1 <= num ? _i <= num : _i >= num; 1 <= num ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).forEach(function() {
        var index;
        index = Math.floor(Math.random() * _this.allTags.length);
        while (used[index] === true) {
          index = Math.floor(Math.random() * _this.allTags.length);
        }
        used[index] = true;
        return result.push(_this.allTags[index]);
      });
      return result;
    };

    return Tags;

  })(Backbone.Model);

}).call(this);
