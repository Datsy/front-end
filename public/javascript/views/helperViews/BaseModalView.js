(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.BaseModalView = (function(_super) {
    __extends(BaseModalView, _super);

    function BaseModalView() {
      _ref = BaseModalView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BaseModalView.prototype.className = 'modal fade';

    BaseModalView.prototype.events = {
      'hidden': 'teardown'
    };

    BaseModalView.prototype.show = function() {
      return this.$el.modal('show');
    };

    BaseModalView.prototype.teardown = function() {
      this.$el.data('modal', null);
      return this.remove();
    };

    BaseModalView.prototype.render = function() {
      this.$el.html(this.template());
      this.$el.modal({
        show: false
      });
      return this;
    };

    return BaseModalView;

  })(Backbone.View);

}).call(this);
