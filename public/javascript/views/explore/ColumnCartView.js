(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.ColumnCartView = (function(_super) {
    __extends(ColumnCartView, _super);

    function ColumnCartView() {
      this.addColumn = __bind(this.addColumn, this);
      this.setTopPos = __bind(this.setTopPos, this);
      _ref = ColumnCartView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ColumnCartView.prototype.className = 'cart col-md-3';

    ColumnCartView.prototype.events = {
      'click #clear': 'clearCart',
      'click #go': 'loadVisualization'
    };

    ColumnCartView.prototype.initialize = function(options) {
      var _this = this;
      this.datsyModel = options.datsyModel;
      this.template = this.datsyModel.get('templates')['columnCart'];
      this.datsyModel.on('addColumn', this.addColumn);
      return $(window).scroll((function() {
        return _this.setTopPos();
      }));
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
      return this.datsyModel.setVisualizationData();
    };

    ColumnCartView.prototype.setTopPos = function() {
      return this.$el.css({
        'margin-top': $(window).scrollTop()
      });
    };

    ColumnCartView.prototype.addColumn = function(params) {
      return $('.total-columns-added').text(params.total);
    };

    return ColumnCartView;

  })(Backbone.View);

}).call(this);
