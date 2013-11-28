DatsyApp.DataSelectionModelView = DatsyApp.BaseModalView.extend({

  events: {
    'keyup .search-keywords': 'queryPossibleResults',
    'click .add-keyword': 'findKeyword'
  },

  initialize: function(options) {
    this.template = options.template;
    this.render();
  },

  queryPossibleResults: function(event) {
    var self = this;
    $.ajax({
      method: 'POST',
      url: '/data',
      data: event.target.value,
      contentType: 'text/plain',
      success: function(data) {
        self.availableColumns = data;
        $('.search-keywords').autocomplete({ source: self.availableColumns });
      }
    });
  },

  findKeyword: function(event) {
    event && event.preventDefault();
    var self = this;
    var keyword = $('.search-keywords').val();
    if (keyword !== '') {
      $.ajax({
        url: '/data/' + keyword,
        method: 'GET',
        success: function(data) {
          self.addKeyWord(data);
        }
      });
    }
  }
  
});
