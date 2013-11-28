DatsyApp.BaseModalView = Backbone.View.extend({

    className: 'modal fade',

    events: {
      'hidden': 'teardown'
    },

    initialize: function() {
    },

    show: function() {
      this.$el.modal('show');
    },

    teardown: function() {
      this.$el.data('modal', null);
      this.remove();
    },

    render: function() {
      this.$el.html(this.template());
      this.$el.modal({show:false}); // dont show modal on instantiation
      return this;
    },

 });
