(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.Tag = (function(_super) {
    __extends(Tag, _super);

    function Tag() {
      _ref = Tag.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Tag.prototype.defaults = {
      label: "",
      id: void 0
    };

    return Tag;

  })(Backbone.Model);

}).call(this);
