(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.ColumnCartView = (function(_super) {
    __extends(ColumnCartView, _super);

    function ColumnCartView() {
      _ref = ColumnCartView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ColumnCartView.prototype.className = 'cart col-md-4';

    ColumnCartView.prototype.events = {
      'click #clear': 'clearCart',
      'click #go': 'loadVisualization'
    };

    ColumnCartView.prototype.initialize = function(options) {
      this.datsyModel = options.datsyModel;
      return this.template = this.datsyModel.get('templates')['columnCart'];
    };

    ColumnCartView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    ColumnCartView.prototype.clearCart = function() {
      $('.total-columns-added').text('0');
      return this.trigger('clearCart');
    };

    ColumnCartView.prototype.loadVisualization = function() {
      return this.trigger('loadVisualization');
    };

    return ColumnCartView;

  })(Backbone.View);

}).call(this);
