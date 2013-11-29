(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.DataSetSearchView = (function(_super) {
    __extends(DataSetSearchView, _super);

    function DataSetSearchView() {
      _ref = DataSetSearchView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DataSetSearchView.prototype.initialize = function(options) {
      this.template = options.template;
      this.loadingTemplate = options.loadingTemplate;
      this.mainTag = this.uppercase(options.searchTopic);
      this.databases = new DatsyApp.Databases({
        url: '/search?tag=' + options.searchTopic
      });
      return this;
    };

    DataSetSearchView.prototype.render = function() {
      this.$el.html(this.loadingTemplate({
        searchTag: this.mainTag
      }));
      return this;
    };

    DataSetSearchView.prototype.uppercase = function(tag) {
      var tagArr;
      tagArr = tag.split(' ');
      tagArr = tagArr.map(function(word) {
        var newWord;
        return newWord = word.charAt(0).toUpperCase() + word.slice(1);
      });
      return tagArr.join(' ');
    };

    return DataSetSearchView;

  })(Backbone.View);

}).call(this);
