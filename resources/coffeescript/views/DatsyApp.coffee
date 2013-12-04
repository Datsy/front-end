class DatsyApp.DatsyView extends Backbone.View

  events:
    'click .navbar-brand': 'loadIndex',
    'click #explore': "navigateToExplore",
    'click #visualizer': "navigateToVisualizer"

  initialize: ->
    @template = @model.get('templates')['datsyApp']
    $('body').prepend @render().el
    @router = new DatsyApp.Router { el: this.$el.find('#wrapper'), model: this.model }
    Backbone.history.start {pushstate:true}

  render: ->
    @$el.html this.template()
    @

  loadIndex: ->
    @router.navigate "/", {trigger: true}

  navigateToExplore: ->
    @router.navigate "/explore", {trigger: true}

  navigateToVisualizer: ->
    @router.navigate "/popularVisualizations", {trigger: true}
