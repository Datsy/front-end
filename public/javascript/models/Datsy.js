(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.Datsy = (function(_super) {
    __extends(Datsy, _super);

    function Datsy() {
      this.triggerVisDataLoaded = __bind(this.triggerVisDataLoaded, this);
      _ref = Datsy.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Datsy.prototype.initialize = function() {
      this.set('AppName', 'Datsy');
      this.set('tags', new DatsyApp.Tags());
      return this;
    };

    Datsy.prototype.tagExists = function(tag) {
      var tags;
      tags = this.get('tags');
      return tags.has(tag);
    };

    Datsy.prototype.listTags = function() {
      var tags;
      tags = this.get('tags');
      return tags.list();
    };

    Datsy.prototype.triggerAddColumn = function(columnName, datasetID) {
      return this.trigger('addColumn', {
        columnName: columnName,
        datasetID: datasetID
      });
    };

    Datsy.prototype.setVisualizationData = function(columns) {
      var visualizationData;
      visualizationData = new DatsyApp.VisualizationData({
        columns: columns
      });
      this.set('visualizationData', visualizationData);
      return visualizationData.on('loaded', this.triggerVisDataLoaded);
    };

    Datsy.prototype.triggerVisDataLoaded = function() {
      return this.trigger('visualizationDataLoaded');
    };

    return Datsy;

  })(Backbone.Model);

}).call(this);
