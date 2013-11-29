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

    ListDataSetsView.prototype.initialize = function(options) {
      return this.template = options.template;
    };

    ListDataSetsView.prototype.render = function() {
      return this.$el.html(this.template);
    };

    return ListDataSetsView;

  })(Backbone.View);

}).call(this);
