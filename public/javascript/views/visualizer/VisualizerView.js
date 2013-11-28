DatsyApp.VisView = Backbone.View.extend({

  className: 'visView',

  events: {
    'click #selectDataSetOne': 'buildSelectionView'
  },

  initialize: function() {
    this.template = this.model.get('templates')['visualizations'];
    this.selectedColumns = new DatsyApp.VisData();
    this.availableColumns = [];
    this.currentGraphView = this.droppableView;

    $(window).on("resize.DatsyApp", _.bind(this.resize, this));
  },

  resize: function() {
    var w = $('.container').width();
    var h = w / 2;
    this.$graph = this.$el.find('#graph');
    this.$graph.css({'height': h, 'width': w });
  },

  render: function() {
    this.$el.html( this.template() );
    var w = $('.container').width();
    var h = w / 2;
    this.$graph = this.$el.find('#graph');
    this.$graph.css({'height': h, 'width': w });
    return this;
  },

  buildSelectionView: function() {
    var selectionModel = new DatsyApp.DataSelectionModel();
    var dataSelectionModelView = new DatsyApp.DataSelectionModelView({ model: selectionModel, template: this.model.get('templates')['model'] });
    dataSelectionModelView.show();
  }



});
