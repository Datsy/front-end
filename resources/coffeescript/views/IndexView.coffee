class DatsyApp.IndexView extends Backbone.View
  
  events:
    'focus #getStartedForm': 'setUpTags',
    'click button#getStartedButton': 'intialSearch'

  initialize: (options) ->
    @template = @model.get('templates')['indexView']
    @tags = [];
    _.bindAll @, 'removeBackground'
    $(window).scroll @removeBackground

  render: ->
    @$el.html @template
    @

  intialSearch: (e) ->
    e && e.preventDefault();
    tag = $('#getStartedForm').val()
    if tag == ''
      Backbone.history.navigate "/filterDatasets", {trigger: true}
    else
      tag = tag.split(' ').join('_')
      Backbone.history.navigate "/filterDatasets/" + tag, {trigger: true}

  tagExists: (tag) ->
    return @model.tagExists(tag)

  setUpTags: ->
    @tags = @model.listTags();
    $('#getStartedForm').autocomplete { source: @tags }

  removeBackground: ->
    $('.landing-splash').hide() if $(window).scrollTop() > 800
    $('.landing-splash').show() if $(window).scrollTop() < 799
