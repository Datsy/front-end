(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.DataSampleModelView = (function(_super) {
    __extends(DataSampleModelView, _super);

    function DataSampleModelView() {
      _ref = DataSampleModelView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DataSampleModelView.prototype.initialize = function(options) {};

    DataSampleModelView.prototype.render = function() {};

    return DataSampleModelView;

  })(DatsyApp.BaseModalView);

}).call(this);
