class DatsyApp.IndexView extends Backbone.View
  
  events:
    'click button#getStartedButton': 'intialSearch'

  initialize: (options) ->
    @template = options.template

  render: ->
    @$el.html @template
    @

  intialSearch: (e) ->
    e && e.preventDefault();
    searchVal = $('#getStartedForm').val()
    Backbone.history.navigate "/searchDataSets/" + searchVal, {trigger: true}
