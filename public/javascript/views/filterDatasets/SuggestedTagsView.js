(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.SuggestedTagsView = (function(_super) {
    __extends(SuggestedTagsView, _super);

    function SuggestedTagsView() {
      _ref = SuggestedTagsView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SuggestedTagsView.prototype.className = 'col-md-3';

    SuggestedTagsView.prototype.events = {
      'click .tag-suggestion': 'addTagToFilters'
    };

    SuggestedTagsView.prototype.initialize = function(options) {
      this.tags = options.tags;
      this.template = this.model.get('templates')['suggestedTags'];
      return this;
    };

    SuggestedTagsView.prototype.render = function() {
      this.$el.html(this.template({
        tags: this.tags
      }));
      return this;
    };

    SuggestedTagsView.prototype.addTagToFilters = function() {
      return this.trigger('addTag');
    };

    return SuggestedTagsView;

  })(Backbone.View);

}).call(this);
