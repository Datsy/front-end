(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.FilterDataSetsView = (function(_super) {
    __extends(FilterDataSetsView, _super);

    function FilterDataSetsView() {
      this.updatePage = __bind(this.updatePage, this);
      this.newSearchForTag = __bind(this.newSearchForTag, this);
      this.setUpTags = __bind(this.setUpTags, this);
      this.renderLoaded = __bind(this.renderLoaded, this);
      _ref = FilterDataSetsView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    FilterDataSetsView.prototype.className = 'container filter-page';

    FilterDataSetsView.prototype.events = {
      'focus #filterTagSearch': 'setUpTags',
      'click .input-group-btn': 'addFilters',
      'click .tag-suggestion': 'addSuggestedFilter',
      'click #seeDataBases': 'loadExploreView',
      'click #seeAllDataBases': 'loadAllExploreView',
      'click .glyphicon-remove-sign': 'removeTopic'
    };

    FilterDataSetsView.prototype.initialize = function(options) {
      var _this = this;
      this.datsyModel = options.datsyModel;
      this.tags = this.datsyModel.get('tags');
      this.template = this.datsyModel.get('templates')['filterDatasets'];
      this.loadingTemplate = this.datsyModel.get('templates')['loading'];
      this.noResultsTemplate = this.datsyModel.get('templates')['noResultsTemplate'];
      if (options.searchTopic.length) {
        this.currentTags = this.buildTags(options.searchTopic);
        this.filterTags();
        this.mainTag = this.uppercase(this.currentTags);
        this.tags.on('loaded', function() {
          return setTimeout((function() {
            return _this.renderLoaded();
          }), 1000);
        });
      } else {
        this.currentTags = [];
        this.mainTag = 'All databases';
        setTimeout((function() {
          return _this.renderLoaded();
        }), 1000);
      }
      return this;
    };

    FilterDataSetsView.prototype.render = function() {
      this.$el.html(this.loadingTemplate({
        searchTag: this.mainTag
      }));
      return this;
    };

    FilterDataSetsView.prototype.renderLoaded = function() {
      var maintags, singular, suggested, suggestedTags, tags, tagsToShow;
      if (this.tags.totalDataBases) {
        maintags = this.mainTag.split(' & ');
        if (maintags[0] === "") {
          tagsToShow = false;
        } else {
          tagsToShow = true;
        }
        tags = this.tags.list();
        singular = this.tags.totalDataBases === 1;
        this.$el.html(this.template({
          tagsToShow: tagsToShow,
          tags: maintags,
          occurance: this.tags.totalDataBases,
          singular: singular
        }));
      } else {
        this.$el.html(this.noResultsTemplate({
          tagsToShow: tagsToShow,
          tags: maintags,
          singular: singular
        }));
      }
      suggestedTags = this.getRandomTags();
      suggested = new DatsyApp.SuggestedTagsView({
        model: this.datsyModel,
        tags: suggestedTags
      });
      suggested.on('addTag', this.newSearchForTag);
      this.$el.append(suggested.render().el);
      return this;
    };

    FilterDataSetsView.prototype.getRandomTags = function() {
      return this.tags.random(10);
    };

    FilterDataSetsView.prototype.uppercase = function(tags) {
      var array,
        _this = this;
      array = tags.map(function(tag) {
        var tagArr;
        tagArr = tag.split(' ').map(function(word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        });
        return tagArr.join(' ');
      });
      if (array.length === 1) {
        return array[0];
      }
      return array.join(' & ');
    };

    FilterDataSetsView.prototype.setUpTags = function() {
      var tagArray;
      tagArray = this.tags.list();
      return $('#filterTagSearch').autocomplete({
        minLength: 1,
        source: tagArray
      });
    };

    FilterDataSetsView.prototype.filterTags = function() {
      return this.tags.filter(this.currentTags);
    };

    FilterDataSetsView.prototype.removeTopic = function() {
      var index, tag;
      tag = event.target.parentElement.innerText.toLowerCase();
      index = this.currentTags.indexOf(tag);
      this.currentTags.splice(index, index + 1);
      this.filterTags();
      return this.updatePage();
    };

    FilterDataSetsView.prototype.addFilters = function() {
      var newTag, tagArray;
      newTag = $('#filterTagSearch').val();
      if (newTag === '') {
        this.noteError('Please enter a keyword to search');
        return false;
      }
      tagArray = this.tags.list();
      if (tagArray.indexOf(newTag) === -1) {
        this.noteError('This keyword has no matches to your current search');
        return false;
      }
      this.currentTags.push(newTag);
      this.filterTags();
      return this.updatePage();
    };

    FilterDataSetsView.prototype.newSearchForTag = function(tag) {
      this.currentTags = this.buildTags(tag);
      this.filterTags();
      return this.updatePage();
    };

    FilterDataSetsView.prototype.updatePage = function() {
      var url,
        _this = this;
      this.mainTag = this.uppercase(this.currentTags);
      this.$el.html("");
      this.render();
      url = '/filterDatasets';
      this.currentTags.forEach(function(tag) {
        return url += '/' + tag;
      });
      Backbone.history.navigate(url, {
        trigger: false
      });
      return setTimeout((function() {
        return _this.renderLoaded();
      }), 1000);
    };

    FilterDataSetsView.prototype.loadExploreView = function() {
      var url,
        _this = this;
      url = '/explore';
      if (this.currentTags.length) {
        this.currentTags.forEach(function(tag) {
          if (tag.split(' ').length > 1) {
            tag = tag.split(' ').join('_');
          }
          return url += '/' + tag;
        });
      }
      return Backbone.history.navigate(url, {
        trigger: true
      });
    };

    FilterDataSetsView.prototype.loadAllExploreView = function() {
      return Backbone.history.navigate('/explore', {
        trigger: true
      });
    };

    FilterDataSetsView.prototype.buildTags = function(tags) {
      var _this = this;
      tags = tags.split('/');
      return tags.map(function(tag) {
        return tag.split('_').join(' ');
      });
    };

    FilterDataSetsView.prototype.noteError = function(error) {
      if ($('#filterTagSearch').val() !== '') {
        $('#filterTagSearch').val('');
      }
      return $('#filterTagSearch').attr("placeholder", error);
    };

    return FilterDataSetsView;

  })(Backbone.View);

}).call(this);
