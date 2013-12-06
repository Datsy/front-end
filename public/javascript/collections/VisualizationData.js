(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.VisualizationData = (function(_super) {
    __extends(VisualizationData, _super);

    function VisualizationData() {
      this.tagLoaded = __bind(this.tagLoaded, this);
      _ref = VisualizationData.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    VisualizationData.prototype.initialize = function(options) {
      this.columnsForY = [];
      this.columnsForX = [];
      this.totalLoaded = 0;
      this.total = 0;
      return this;
    };

    VisualizationData.prototype.setVisualizationData = function(cart) {
      var columnArray, id;
      for (id in cart) {
        columnArray = cart[id];
        if (columnArray.indexOf('date') === -1) {
          columnArray.push('date');
        }
      }
      return this.makeRequests(cart);
    };

    VisualizationData.prototype.makeRequests = function(cart) {
      var columnArray, id,
        _this = this;
      for (id in cart) {
        columnArray = cart[id];
        columnArray.forEach(function(name) {
          var newX, newY;
          _this.total++;
          if (name === 'date') {
            newX = new DatsyApp.VisualizationDataColumn({
              columnName: 'date',
              datasetID: id
            });
            _this.columnsForX.push(newX);
            return newX.on('loaded', _this.tagLoaded);
          } else {
            newY = new DatsyApp.VisualizationDataColumn({
              columnName: name,
              datasetID: id
            });
            _this.columnsForY.push(newY);
            return newY.on('loaded', _this.tagLoaded);
          }
        });
      }
      return this;
    };

    VisualizationData.prototype.tagLoaded = function() {
      this.totalLoaded++;
      if (this.totalLoaded === this.total) {
        this.trigger('loaded');
      }
      return this;
    };

    return VisualizationData;

  })(Backbone.Collection);

}).call(this);
