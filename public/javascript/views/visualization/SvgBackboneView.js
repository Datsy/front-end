(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.SvgBackboneView = (function(_super) {
    __extends(SvgBackboneView, _super);

    function SvgBackboneView() {
      _ref = SvgBackboneView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SvgBackboneView.prototype.nameSpace = "http://www.w3.org/2000/svg";

    SvgBackboneView.prototype._ensureElement = function() {
      var $el, attrs;
      if (!this.el) {
        attrs = _.extend({}, _.result(this, "attributes"));
        if (this.id) {
          attrs.id = _.result(this, "id");
        }
        if (this.className) {
          attrs["class"] = _.result(this, "className");
        }
        $el = $(window.document.createElementNS(_.result(this, "nameSpace"), _.result(this, "tagName"))).attr(attrs);
        return this.setElement($el, false);
      } else {
        return this.setElement(_.result(this, "el"), false);
      }
    };

    return SvgBackboneView;

  })(Backbone.View);

}).call(this);
