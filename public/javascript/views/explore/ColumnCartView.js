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
      var _this = this;
      this.$el.html(this.template);
      setTimeout((function() {
        _this.columnList = $('#selectedColumns');
        $('.list-group-item').popover();
        return _this.addExistingCart(_this.datsyModel.cartInStorage());
      }), 1);
      return this;
    };

    ColumnCartView.prototype.clearCart = function() {
      $('.addColumnForVis').each(function() {
        return $(this).attr('disabled', false);
      });
      $('.total-columns-added').text('0');
      $('#go').prop('disabled', true);
      $('#selectedColumns').html('<li class="list-group-item" data-container="body" data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="No Selected Columns">No Columns Selected</li>');
      $('.list-group-item').popover();
      return this.trigger('clearCart');
    };

    ColumnCartView.prototype.loadVisualization = function() {
      this.trigger('loadVisualization');
      return this.datsyModel.setVisualizationData();
    };

    ColumnCartView.prototype.setTopPos = function() {
      if ($(window).width() > 991) {
        return this.$el.css({
          'margin-top': $(window).scrollTop()
        });
      }
    };

    ColumnCartView.prototype.addColumn = function(params) {
      var newColumn;
      if ($('#selectedColumns .list-group-item').get(0)) {
        if ($('#selectedColumns .list-group-item').get(0).innerHTML === 'No Columns Selected') {
          $('#selectedColumns .list-group-item').get(0).remove();
        }
      }
      this.columnList.append('<li class="list-group-item" data-container="body" data-trigger="hover" data-toggle="popover" data-placement="bottom">' + params.columnName + '</li>');
      newColumn = this.columnList.find('li').last();
      newColumn.popover({
        html: true,
        content: '<ul class="popover-listing-desc"><li class="popover-listing-title">Dataset Name:</li><li class="popover-listing-param">' + params.datasetID.split('_').join(' ') + '</li><li class="popover-listing-title">Column Name:</li><li class="popover-listing-param">' + params.columnName + '</li></ul>'
      });
      $('.total-columns-added').text(params.total);
      return $('#go').prop('disabled', false);
    };

    ColumnCartView.prototype.addExistingCart = function(cart) {
      var columnArray, id, _ref1,
        _this = this;
      if (cart) {
        $('#go').prop('disabled', false);
        _ref1 = cart.values;
        for (id in _ref1) {
          columnArray = _ref1[id];
          columnArray.forEach(function(column) {
            return _this.addColumn({
              columnName: column,
              datasetID: id
            });
          });
        }
        return $('.total-columns-added').text(cart.total);
      } else {
        return $('#go').prop('disabled', true);
      }
    };

    return ColumnCartView;

  })(Backbone.View);

}).call(this);
