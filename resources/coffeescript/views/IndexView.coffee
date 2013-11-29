class DatsyApp.IndexView extends Backbone.View
  
  events:
    'focus #getStartedForm': 'setUpTags',
    'click button#getStartedButton': 'intialSearch'

  initialize: (options) ->
    @template = options.template
    @tags = [];
    @

  render: ->
    @$el.html @template
    @

  intialSearch: (e) ->
    e && e.preventDefault();
    tag = $('#getStartedForm').val()
    if @tagExists(tag)     
      Backbone.history.navigate "/searchDataSets/" + tag, {trigger: true}
    else
      Backbone.history.navigate "/searchDataSets/null", {trigger: true}    

  tagExists: (tag) ->
    return @model.tagExists(tag)

  setUpTags: ->
    @tags = @model.listTags();
    $('#getStartedForm').autocomplete { source: @tags }
