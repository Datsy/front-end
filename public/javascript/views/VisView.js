DatsyApp.VisView = Backbone.View.extend({

  className: 'visView',

  events: {
    'keyup #inputData1': 'queryPossibleResults',
    'keyup #inputData2': 'queryPossibleResults',
    'click #inputButton1': 'addColumn',
    'click #inputButton2': 'addColumn'
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

  addColumn: function(event) {
    var clickID = event.target.id;
    var columnName = (clickID === 'inputButton1') ? $('#inputData1').value() : $('#inputData2').value();
    console.log(columnName);
//    $.get('/data', event.target.)
  }

});
