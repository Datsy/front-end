class DatsyApp.DatsyView extends Backbone.View

  events:
    'click .navbar-brand': 'loadIndex',
    'click #explore': 'navigateToExplore',
    'click #visualizer': 'navigateToVisualizer',
    'click #login': 'navigateToLogin'
    'focus .header-search-box': 'fadeInSubmit',
    'blur .header-search-box': 'fadeOutSubmit',
    'click .header-search-submit': 'searchKeyword',

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

  fadeInSubmit: ->
    $('.header-search-submit').fadeIn(300)

  fadeOutSubmit: ->
    $('.header-search-submit').fadeOut(300)

  searchKeyword: (event) ->
    event && event.preventDefault()
    tag = $('.header-search-box').val()
    $('.header-search-box').val('')
    @router.navigate "/filterDatasets/" + tag, { trigger: true }

  navigateToLogin: (event) ->
    event && event.preventDefault()