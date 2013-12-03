(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.VisualizationData = (function(_super) {
    __extends(VisualizationData, _super);

    function VisualizationData() {
      _ref = VisualizationData.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    VisualizationData.prototype.initialize = function(options) {
      console.log('getting up collection');
      this.columnsForY = [];
      return options.forEach(function(column) {
        var newY;
        newY = new DatsyApp.VisualizationDataColumn({
          column: column
        });
        return this.columnsForY.push(newY);
      });
    };

    return VisualizationData;

  })(Backbone.Collection);

}).call(this);
