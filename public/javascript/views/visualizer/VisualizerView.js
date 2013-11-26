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
    this.$el.html( this.template() );
    var w = $('.container').width();
    var h = w / 2;
    this.$graph = this.$el.find('#graph');
    this.$graph.css({'height': h, 'width': w });

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
    event && event.preventDefault();
    var self = this;
    var clickID = event.target.id;
    var columnName = (clickID === 'inputButton1') ? $('#inputData1').val() : $('#inputData2').val();
    if (columnName !== '') {
      $.ajax({
        url: '/data/' + columnName,
        method: 'GET',
        success: function(data) {
          self.addSingleColumn(data, columnName, clickID);
        }
      });
    }
  },

  addSingleColumn: function(data, columnName, clickID) {
    var model1 = new DatsyApp.VisDatum({ column: data, colTitle: columnName });
    var model1View = new DatsyApp.ColumnModelView({ model: model1, template: this.model.get('templates')['columnModel'] });
    var dataSet = (clickID === 'inputButton1') ? 'dataSetsOne' : 'dataSetsTwo';
    $('#' + dataSet).append(model1View.render().el);
    $('.dataCol').draggable({ containment: ".container", revert: true, });
  },

  swapGraph: function(chart, dataX, dataY) {
    this.$graph.empty();
    if (chart) {
      this.$graph.append( new DatsyApp.GraphView({ width: w, height: h, dataX: dataX, dataY: dataY }).render() );
    } else {
      this.$graph.append( new DatsyApp.DropAxisView({ template: this.model.get('templates')['dropper'] }).render() );
    }
  }

});
