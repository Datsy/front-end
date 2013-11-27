DatsyApp.VisView = Backbone.View.extend({

  className: 'visView',

  events: {
    'keyup #inputData2, #inputData1': 'queryPossibleResults',
    'click #inputButton1, #inputButton2': 'addColumn'
  },

  initialize: function() {
    this.template = this.model.get('templates')['visualizations'];
    this.selectedColumns = new DatsyApp.VisData();
    this.droppableView = new DatsyApp.DropAxisView({ template: this.model.get('templates')['dropper'] });
    this.droppableView.on('renderChart', this.swapGraph.bind(this));
    this.availableColumns = [];

    $(window).on("resize.DatsyApp", _.bind(this.resize, this));
  },

  resize: function() {
    this.$graph.empty();
    // SUB VIEWS NEED TO LISTEN FOR RESIZE AND DRAW.
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
    this.$graph.append( this.droppableView.render() );
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
    this.selectedColumns.add(model1);
    var dataSet = (clickID === 'inputButton1') ? 'dataSetsOne' : 'dataSetsTwo';
    $('#' + dataSet).append(model1View.render().el);
    this.updateDragNDrop(columnName);
  },

  swapGraph: function(args) {
    var w = this.$graph.width();
    var h = this.$graph.height();
    this.$graph.empty();
    if (args.chartView) {
      var dataX = args.x;
      var dataY = args.y;
      var graphView = new DatsyApp.GraphView({ width: w, height: h, dataX: dataX, dataY: dataY });
      this.$graph.append( graphView.el );
      graphView.render()
    } else {
      this.$graph.append( new DatsyApp.DropAxisView({ template: this.model.get('templates')['dropper'] }).render() );
    }
  },

  updateDragNDrop: function(columnName) {
    var self = this;
    $('.dataCol').draggable({ containment: ".container", revert: true, });
    $( ".droppable" ).droppable({
      accept: ".dataCol",
      activeClass: "axis-state-hover",
      hoverClass: "axis-state-active",
      drop: function( event, ui ) {
        var thisModel = self.selectedColumns.getModel(columnName);
        if ($(this).hasClass('xAxis')) {
          self.droppableView.addXModel(thisModel);
        } else {
          self.droppableView.addYModel(thisModel);
        }
        $( this ).addClass( "axis-state-highlight" )
          .find( "p" ).html( columnName + " added!" );
      }
    });
  }

});
