DatsyApp.ExploreDataView = Backbone.View.extend({

  className: '',
  
  events: {
    'keypress :input': 'addPostKeyword',           // enter space bar in input box
    'click span.delete-keyword': 'removeKeyword'
  },

  initialize: function() {
    this.template = this.model.get('templates')['exploreData'];
    this.keywordCache = [];
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes))
      .append(new DatsyApp.ExploreCategoriesView({model: this.model}).render())
      .append(new DatsyApp.ExploreDatasetsView({model: this.model}).render());
    return this;
  },

  addPostKeyword: function(e) {
    var text = $('input').val();
    
    // Query Server for JSON Object of Keywords
    // if(!this.keywordCache.length){
    //   $.post('http://localhost:3000/data', function(data){
    //     console.log(data);
    //   });
    // }
    
    // Add keyword if spacebar is entered
    if(e.keyCode === 32) {
      $('input').val('');
      // TODO: move this HTML into a template
      $('span.style').append(
        '<span class="post-keyword">' +
          text +
          '<span class="delete-keyword" title="remove this keyword">x</span> \
        </span>');
    }
  },

  removeKeyword: function(e) {
    $(e.target).parent().remove();
  }

});