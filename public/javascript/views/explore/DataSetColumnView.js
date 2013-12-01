(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.DataSetColumnView = (function(_super) {
    __extends(DataSetColumnView, _super);

    function DataSetColumnView() {
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
      this.datasetID = options.datasetID;
      return this.sampleDataModelView = null;
    };

    DataSetColumnView.prototype.render = function() {
      this.$el.html(this.template(this.model));
      return this;
    };

    DataSetColumnView.prototype.viewSampleData = function() {
      this.sampleDataModelView = new DatsyApp.DataSampleModelView({
        datasetID: this.datasetID,
        columnName: this.model.name
      });
      return this.sampleDataModelView.once('ready', this.showModal);
    };

    DataSetColumnView.prototype.addColumnForVis = function() {
      console.log(this.model);
      return this.trigger('addColumn', {
        id: 0
      });
    };

    DataSetColumnView.prototype.showModal = function() {
      return this.sampleDataModelView.show();
    };

    return DataSetColumnView;

  })(Backbone.View);

}).call(this);
