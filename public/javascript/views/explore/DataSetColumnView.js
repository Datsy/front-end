(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.DataSetColumnView = (function(_super) {
    __extends(DataSetColumnView, _super);

    function DataSetColumnView() {
      this.deleteModalView = __bind(this.deleteModalView, this);
      this.showModal = __bind(this.showModal, this);
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
      this.datasetName = options.datasetName;
      return this.datsyModel = options.datsyModel;
    };

    DataSetColumnView.prototype.render = function() {
      this.$el.html(this.template(this.model));
      return this;
    };

    DataSetColumnView.prototype.viewSampleData = function() {
      this.sampleDataModelView = new DatsyApp.DataSampleModelView({
        datasetName: this.datasetName,
        columnName: this.model.name
      });
      this.sampleDataModelView.once('ready', this.showModal);
      return this.sampleDataModelView.once('done', this.deleteModalView);
    };

    DataSetColumnView.prototype.addColumnForVis = function() {
      return this.datsyModel.addColumn(this.model.name, this.datasetName);
    };

    DataSetColumnView.prototype.showModal = function() {
      return this.sampleDataModelView.show();
    };

    DataSetColumnView.prototype.deleteModalView = function() {
      return delete this.sampleDataModelView;
    };

    return DataSetColumnView;

  })(Backbone.View);

}).call(this);
