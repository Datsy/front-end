(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.SampleData = (function(_super) {
    __extends(SampleData, _super);

    function SampleData() {
      _ref = SampleData.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SampleData.prototype.initialize = function() {
      return this.fetch();
    };

    return SampleData;

  })(Backbone.Model);

}).call(this);
