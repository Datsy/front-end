class DatsyApp.BaseModalView extends Backbone.View

    className: 'modal fade',

    events:
      'hidden': 'teardown'

    show: ->
      @$el.modal 'show'

    teardown: ->
      @$el.data 'modal', null
      @remove()

    render: ->
      @$el.html @template()
      @$el.modal {show:false}
      @
