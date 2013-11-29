(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.IndexView = (function(_super) {
    __extends(IndexView, _super);

    function IndexView() {
      _ref = IndexView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    IndexView.prototype.events = {
      'focus #getStartedForm': 'setUpTags',
      'click button#getStartedButton': 'intialSearch'
    };

    IndexView.prototype.initialize = function(options) {
      this.template = options.template;
      this.tags = [];
      return this;
    };

    IndexView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    IndexView.prototype.intialSearch = function(e) {
      var tag;
      e && e.preventDefault();
      tag = $('#getStartedForm').val();
      if (this.tagExists(tag)) {
        return Backbone.history.navigate("/searchDataSets/" + tag, {
          trigger: true
        });
      } else {
        return Backbone.history.navigate("/searchDataSets/null", {
          trigger: true
        });
      }
    };

    IndexView.prototype.tagExists = function(tag) {
      return this.model.tagExists(tag);
    };

    IndexView.prototype.setUpTags = function() {
      this.tags = this.model.listTags();
      return $('#getStartedForm').autocomplete({
        source: this.tags
      });
    };

    return IndexView;

  })(Backbone.View);

}).call(this);
