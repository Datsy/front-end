(function() {
  DatsyApp.Database = (function() {
    function Database(attributes) {
      this.attributes = attributes;
    }

    Database.prototype.getColumns = function() {
      return this.attributes.columns;
    };

    Database.prototype.getId = function() {
      return this.attributes.id;
    };

    return Database;

  })();

}).call(this);
