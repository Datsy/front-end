(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.ColumnCartView = (function(_super) {
    __extends(ColumnCartView, _super);

    function ColumnCartView() {
      this.setTopPos = __bind(this.setTopPos, this);
      this.addColumn = __bind(this.addColumn, this);
      _ref = ColumnCartView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ColumnCartView.prototype.className = 'cart col-md-3';

    ColumnCartView.prototype.events = {
      'click #clear': 'clearCart',
      'click #go': 'loadVisualization',
      'mouseover .cart-text': 'viewSelectedColumns',
      'mouseout .cart-text': 'hideSelectedColumns'
    };

    ColumnCartView.prototype.initialize = function(options) {
      var _this = this;
      this.datsyModel = options.datsyModel;
      this.template = this.datsyModel.get('templates')['columnCart'];
      this.datsyModel.on('addColumn', this.addColumn);
      this.columnData = [];
      this.popoverContent = '<p class="popover-item">No columns selected</p>';
      return $(window).scroll((function() {
        return _this.setTopPos();
      }));
    };

    ColumnCartView.prototype.render = function() {
      var _this = this;
      this.$el.html(this.template);
      setTimeout((function() {
        return $('.cart-text').popover({
          content: _this.popoverContent
        });
      }), 2);
      return this;
    };

    ColumnCartView.prototype.clearCart = function() {
      $('.total-columns-added').text('0');
      this.popoverContent = '<p class="popover-item">No columns selected</p>';
      return this.trigger('clearCart');
    };

    ColumnCartView.prototype.loadVisualization = function() {
      return this.trigger('loadVisualization');
    };

    ColumnCartView.prototype.viewSelectedColumns = function() {
      $('.cart-text').popover('show');
      return $('.popover-content').html(this.popoverContent);
    };

    ColumnCartView.prototype.hideSelectedColumns = function() {
      return $('.cart-text').popover('hide');
    };

    ColumnCartView.prototype.addColumn = function(columnData) {
      this.columnData.push(columnData);
      if (this.popoverContent === '<p class="popover-item">No columns selected</p>') {
        this.popoverContent = '';
      }
      return this.popoverContent += '<p class="popover-item">' + columnData.columnName + '</p>';
    };

    ColumnCartView.prototype.setTopPos = function() {
      return this.$el.css({
        'margin-top': $(window).scrollTop()
      });
    };

    return ColumnCartView;

  })(Backbone.View);

}).call(this);
