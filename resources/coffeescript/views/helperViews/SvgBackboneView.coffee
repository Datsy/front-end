class DatsyApp.SvgBackboneView extends Backbone.View.extend

   nameSpace: "http://www.w3.org/2000/svg",

   _ensureElement: ->
      if (!@.el)
         attrs = _.extend {}, _.result(@, 'attributes')
         attrs.id = _.result(@, 'id') if @id
         attrs['class'] = _.result(@, 'className') if @className
         
         $el = $(window.document.createElementNS(
            _.result(@, 'nameSpace'),
            _.result(@, 'tagName')
         )).attr(attrs)
         
         @setElement $el, false
      else
         @setElement _.result(@, 'el'), false
