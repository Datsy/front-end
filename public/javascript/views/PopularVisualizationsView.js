(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.PopularVisualizationsView = (function(_super) {
    __extends(PopularVisualizationsView, _super);

    function PopularVisualizationsView() {
      _ref = PopularVisualizationsView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PopularVisualizationsView.prototype.initialize = function(options) {
      this.template = this.model.get('templates')['popularVisualizations'];
      return this;
    };

    PopularVisualizationsView.prototype.render = function() {
      this.$el.html(this.template());
      return this;
    };

    return PopularVisualizationsView;

  })(Backbone.View);

}).call(this);
