(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.ListDataSetsView = (function(_super) {
    __extends(ListDataSetsView, _super);

    function ListDataSetsView() {
      _ref = ListDataSetsView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ListDataSetsView.prototype.className = 'explore-datasets';

    ListDataSetsView.prototype.events = {
      'mouseover .dataset-table-listing': 'showMoreInfo',
      'mousemove .dataset-table-listing': 'updateXY',
      'mouseleave .dataset-table-listing': 'hideMoreInfo'
    };

    ListDataSetsView.prototype.initialize = function(options) {
      this.datsyModel = options.datsyModel;
      this.dataSetColumnTemplate = options.dataSetColumnTemplate;
      return this.databases = options.databases;
    };

    ListDataSetsView.prototype.render = function() {
      var _this = this;
      this.databases.each(function(model) {
        var panel, shortenedNames;
        panel = new DatsyApp.DataSetItemView({
          datsyModel: _this.datsyModel,
          dataSetColumnTemplate: _this.dataSetColumnTemplate,
          model: model
        });
        shortenedNames = _this.shortenNames(model.attributes);
        _this.$el.append('<div class="dataset-table-listing" data-name="' + model.attributes.title + '" data-source="' + model.attributes.author + '"><div class="dataset-table-name" data-name="' + model.attributes.title + '" data-source="' + model.attributes.author + '">' + shortenedNames.title + '</div><div class="dataset-source" data-name="' + model.attributes.title + '" data-source="' + model.attributes.author + '">' + shortenedNames.author + '</div><div class="dataset-rating" data-name="' + model.attributes.title + '" data-source="' + model.attributes.author + '"><span class="glyphicon glyphicon-star" data-name="' + model.attributes.title + '" data-source="' + model.attributes.author + '"></span></div></div>');
        return _this.$el.append(panel.render().el);
      });
      setTimeout((function() {
        return _this.$el.accordion({
          collapsible: true,
          heightStyle: 'content',
          active: false,
          icons: false
        });
      }), 0);
      return this;
    };

    ListDataSetsView.prototype.shortenNames = function(attributes) {
      var names;
      names = {};
      names.title = attributes.title;
      if (names.title.length > 30) {
        names.title = names.title.slice(0, 30);
        names.title += '...';
      }
      names.author = attributes.author;
      if (names.author.length > 26) {
        names.author = names.author.slice(0, 26);
        names.author += '...';
      }
      return names;
    };

    ListDataSetsView.prototype.showMoreInfo = function(event) {
      var _this = this;
      if (this.showMore) {
        clearTimeout(this.showMore);
      }
      return this.showMore = setTimeout((function() {
        var name, source;
        if (_this.showMore) {
          name = event.target.dataset.name;
          source = event.target.dataset.source;
          return $('#showMoreBox').html('<p>' + name + '</p><p>' + source + '</p>').fadeIn(300);
        }
      }), 1000);
    };

    ListDataSetsView.prototype.hideMoreInfo = function() {
      clearTimeout(this.showMore);
      return $('#showMoreBox').fadeOut(300);
    };

    ListDataSetsView.prototype.updateXY = function() {
      return $('#showMoreBox').css({
        top: event.clientY + 20,
        left: event.clientX - 150
      });
    };

    return ListDataSetsView;

  })(Backbone.View);

}).call(this);
