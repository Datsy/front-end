class DatsyApp.SvgBackboneView extends Backbone.View
  nameSpace: "http://www.w3.org/2000/svg"
  _ensureElement: ->
    unless @el
      attrs = _.extend({}, _.result(this, "attributes"))
      attrs.id = _.result(this, "id")  if @id
      attrs["class"] = _.result(this, "className")  if @className
      $el = $(window.document.createElementNS(_.result(this, "nameSpace"), _.result(this, "tagName"))).attr(attrs)
      @setElement $el, false
    else
      @setElement _.result(this, "el"), false
