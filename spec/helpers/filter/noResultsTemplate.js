this["compTemplates"] = this["compTemplates"] || {};

this["compTemplates"]["spec/hbs/filter/noResultsTemplate.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"row current-tags text-center\">";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.tags), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <h4 class=\"selected-keyword\"><span class=\"label label-success\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "<span class=\"glyphicon glyphicon-remove-sign\"></span></span></h4>";
  return buffer;
  }

  buffer += "\n<div class=\"results-box panel panel-default col-md-9\">\n  <div class=\"filterResults\">\n    <h1 class=\"text-center\">No databases match this search!</h1>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.tagsToShow), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <form role=\"form\" class=\"form-inline\">\n      <div class=\"form-group col-md-10 col-md-offset-1\">\n        <label for=\"filter\" class=\"sr-only\">Search for keywords</label>\n        <div class=\"input-group\">\n          <input id=\"filterTagSearch\" type=\"text\" placeholder=\"Add topics to filter results.\" autocomplete=\"off\" class=\"form-control\"/><span class=\"input-group-btn\">\n            <button type=\"button\" class=\"btn btn-default\">Add</button></span>\n        </div>\n      </div>\n    </form>\n    <h4 class=\"text-center text-muted\">Click Go! to see all databases</h4>\n    <div style=\"text-align:center\">\n      <button id=\"seeAllDataBases\" type=\"submit\" class=\"btn btn-success btn-lg\">Go!<span class=\"glyphicon glyphicon-chevron-right\"></span></button>\n    </div>\n  </div>\n</div>";
  return buffer;
  });