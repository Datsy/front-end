DatsyApp.DatsyView = Backbone.View.extend({

  className: 'qwerty',

  initialize: function() {
    this.template = this.model.get('templates')['datsyApp'];
    $('body').prepend(this.render().el);
    this.router = new DatsyApp.Router({ el: this.$el.find('#wrapper'), model: this.model });

    Backbone.history.start({pushstate:true});
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  loadIndex: function() {
    this.router.navigate("/", {trigger: true} );
  }

});