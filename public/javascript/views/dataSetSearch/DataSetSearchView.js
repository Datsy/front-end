(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.DataSetSearchView = (function(_super) {
    __extends(DataSetSearchView, _super);

    function DataSetSearchView() {
      this.updatePage = __bind(this.updatePage, this);
      _ref = DataSetSearchView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DataSetSearchView.prototype.events = {
      'focus #filterTagSearch': 'setUpTags',
      'click #addFilters': 'addFilters',
      'click #seeDataBases': 'loadExploreView'
    };

    DataSetSearchView.prototype.initialize = function(options) {
      var _this = this;
      this.template = options.template;
      this.loadingTemplate = options.loadingTemplate;
      this.tags = options.tags;
      this.filterTags(options.searchTopic);
      this.mainTag = this.uppercase(options.searchTopic);
      this.databases = new DatsyApp.Databases({
        url: '/search?tag=' + options.searchTopic
      });
      setTimeout((function() {
        return _this.databases.on('add', _this.renderLoaded());
      }), 500);
      return this;
    };

    DataSetSearchView.prototype.render = function() {
      this.$el.html(this.loadingTemplate({
        searchTag: this.mainTag
      }));
      return this;
    };

    DataSetSearchView.prototype.renderLoaded = function() {
      var singular;
      this.databases.off('add', this.renderLoaded);
      singular = this.databases.length === 1;
      this.$el.html(this.template({
        searchTag: this.mainTag,
        occurance: this.databases.length,
        singular: singular
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

    DataSetSearchView.prototype.setUpTags = function() {
      return $('#filterTagSearch').autocomplete({
        minLength: 1,
        source: this.tags
      });
    };

    DataSetSearchView.prototype.filterTags = function(used) {
      var usedTerm;
      usedTerm = this.tags.indexOf(used);
      this.tags.splice(usedTerm, 1);
      return this.setUpTags();
    };

    DataSetSearchView.prototype.allowTabs = function(e) {
      if (e.keyCode === 9) {
        return e.preventDefault();
      }
    };

    DataSetSearchView.prototype.addFilters = function() {
      var index, newTag;
      newTag = $('#filterTagSearch').val();
      if (newTag === '') {
        return false;
      }
      index = this.tags.indexOf(newTag);
      if (index === -1) {
        return false;
      } else {
        this.databases.filterByTags(newTag);
      }
      return this.updatePage(newTag);
    };

    DataSetSearchView.prototype.updatePage = function(newTag) {
      var _this = this;
      this.filterTags(newTag);
      newTag = this.uppercase(newTag);
      this.mainTag += " & " + newTag;
      this.$el.html("");
      this.render();
      return setTimeout((function() {
        return _this.databases.on('change', _this.renderLoaded());
      }), 500);
    };

    DataSetSearchView.prototype.loadExploreView = function() {
      this.trigger('startExplore', this.databases);
      return Backbone.history.navigate("/exploreDataSets", {
        trigger: true
      });
    };

    return DataSetSearchView;

  })(Backbone.View);

}).call(this);
