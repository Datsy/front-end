DatsyApp.VisView = Backbone.View.extend({

  className: 'visView',

  events: {
    'keyup #inputData1': 'queryPossibleResults',
    'keyup #inputData2': 'queryPossibleResults',
  },

  initialize: function() {
    this.template = this.model.get('templates')['visualizations'];
    this.availableColumns = [];
  },

  render: function() {
    this.$el.html( this.template(this.model.attributes) );
    var graph = this.$el.find('#graph');
    var self = this;
    setTimeout(function() {
      graph.append( new DatsyApp.GraphView({ width: graph.width() }).render() );
      $('.dataCol').draggable({ containment: ".container", revert: true, });
     },1);
    return this;
  },

  queryPossibleResults: function(event) {
    var queryID = event.target.id;
    var self = this;
    $.ajax({
      method: 'POST',
      url: '/data',
      data: event.target.value,
      contentType: 'text/plain',
      success: function(data) {
        self.availableColumns = data;
        $('#' + queryID).autocomplete({ source: self.availableColumns });
      }
    });
  },

  queryPossibleResults2: function(event) {
    $('#dataSetsTwo > .dataCol').text('').text(event.target.value);
  },

});
