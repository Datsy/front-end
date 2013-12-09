(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.DataSampleModelView = (function(_super) {
    __extends(DataSampleModelView, _super);

    function DataSampleModelView() {
      this.onReady = __bind(this.onReady, this);
      _ref = DataSampleModelView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DataSampleModelView.prototype.events = {
      'click .btn': 'destroyThis'
    };

    DataSampleModelView.prototype.initialize = function(options) {
      var urlForSample;
      this.template = universalTemplates.modal;
      this.datasetName = options.datasetName;
      this.columnName = options.columnName;
      urlForSample = 'http://datsy-dev.azurewebsites.net/search/table?name=' + this.datasetName + '&row=5&column=' + this.columnName;
      this.sampleData = new DatsyApp.SampleData({
        url: urlForSample
      });
      return this.sampleData.once('ready', this.onReady);
    };

    DataSampleModelView.prototype.render = function() {
      var attrs, body, i, isValid, prop, val;
      attrs = this.sampleData.toJSON().Result.row;
      body = "<ul class='rows'>";
      i = 1;
      for (prop in attrs) {
        if (!__hasProp.call(attrs, prop)) continue;
        val = attrs[prop];
        isValid = prop !== 'url';
        if (isValid) {
          body += '<li class="rowValue">' + i + ": " + val[this.columnName] + '</p>';
        }
        i++;
      }
      body += '</ul>';
      return this.$el.html(this.template({
        title: 'Data samples for column:' + this.columnName,
        body: body
      }));
    };

    DataSampleModelView.prototype.onReady = function() {
      this.render();
      return this.trigger('ready');
    };

    DataSampleModelView.prototype.destroyThis = function() {
      delete this.sampleData;
      return this.trigger('done');
    };

    return DataSampleModelView;

  })(DatsyApp.BaseModalView);

}).call(this);
