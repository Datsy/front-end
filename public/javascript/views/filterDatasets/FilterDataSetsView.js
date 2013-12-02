(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.FilterDataSetsView = (function(_super) {
    __extends(FilterDataSetsView, _super);

    function FilterDataSetsView() {
      this.updatePage = __bind(this.updatePage, this);
      this.setUpTags = __bind(this.setUpTags, this);
      _ref = FilterDataSetsView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    FilterDataSetsView.prototype.events = {
      'focus #filterTagSearch': 'setUpTags',
      'click #addFilters': 'addFilters',
      'click #seeDataBases': 'loadExploreView'
    };

    FilterDataSetsView.prototype.initialize = function(options) {
      this.datsyModel = options.datsyModel;
      this.tags = this.datsyModel.get('tags');
      this.template = this.datsyModel.get('templates')['filterDatasets'];
      this.loadingTemplate = this.datsyModel.get('templates')['loading'];
      this.currentTags = [options.searchTopic];
      this.filterTags();
      this.mainTag = this.uppercase(options.searchTopic);
      this.tags.on('loaded', this.renderLoaded);
      return this;
    };

    FilterDataSetsView.prototype.render = function() {
      this.$el.html(this.loadingTemplate({
        searchTag: this.mainTag
      }));
      return this;
    };

    FilterDataSetsView.prototype.renderLoaded = function() {
      var singular;
      console.log('loading');
      singular = this.tags.totalDataBases === 1;
      this.$el.html(this.template({
        searchTag: this.mainTag,
        occurance: this.tags.totalDataBases,
        singular: singular
      }));
      return this;
    };

    FilterDataSetsView.prototype.uppercase = function(tag) {
      var tagArr;
      tagArr = tag.split('_');
      tagArr = tagArr.map(function(word) {
        var newWord;
        return newWord = word.charAt(0).toUpperCase() + word.slice(1);
      });
      return tagArr.join(' ');
    };

    FilterDataSetsView.prototype.setUpTags = function() {
      var tagArray;
      tagArray = this.tags.list;
      return $('#filterTagSearch').autocomplete({
        minLength: 1,
        source: tagArray
      });
    };

    FilterDataSetsView.prototype.filterTags = function() {
      return this.tags.filter(this.currentTags);
    };

    FilterDataSetsView.prototype.allowTabs = function(e) {
      if (e.keyCode === 9) {
        return e.preventDefault();
      }
    };

    FilterDataSetsView.prototype.addFilters = function() {
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

    FilterDataSetsView.prototype.updatePage = function(newTag) {
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

    FilterDataSetsView.prototype.loadExploreView = function() {
      this.trigger('startExplore', this.databases);
      return Backbone.history.navigate("/exploreDataSets/" + this.mainTag, {
        trigger: true
      });
    };

    return FilterDataSetsView;

  })(Backbone.View);

}).call(this);
