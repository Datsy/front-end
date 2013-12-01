(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.DataSetColumnView = (function(_super) {
    __extends(DataSetColumnView, _super);

    function DataSetColumnView() {
      _ref = DataSetColumnView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DataSetColumnView.prototype.tagName = 'li';

    DataSetColumnView.prototype.className = 'column-listing row';

    DataSetColumnView.prototype.events = {
      'click .viewSampleData': 'viewSampleData',
      'click .addColumnForVis': 'addColumnForVis'
    };

    DataSetColumnView.prototype.initialize = function(options) {
      this.template = options.template;
      return this.datasetID = options.datasetID;
    };

    DataSetColumnView.prototype.render = function() {
      this.$el.html(this.template(this.model));
      return this;
    };

    DataSetColumnView.prototype.viewSampleData = function() {
      var sampleData, sampleDataModelView, urlForSample;
      urlForSample = '/sample?id=' + this.datasetID + '&column=' + this.model.name;
      console.log(urlForSample);
      sampleData = new SampleData({
        urlRoot: urlForSample
      });
      sampleDataModelView = new DatsyApp.DataSampleModelView({
        model: sampleData
      });
      return sampleDataModelView.show();
    };

    DataSetColumnView.prototype.addColumnForVis = function() {
      console.log(this.model);
      return this.trigger('addColumn', {
        id: 0
      });
    };

    return DataSetColumnView;

  })(Backbone.View);

}).call(this);
