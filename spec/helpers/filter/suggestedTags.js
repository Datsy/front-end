this["compTemplates"] = this["compTemplates"] || {};

this["compTemplates"]["spec/hbs/filter/suggestedTags.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <li class=\"list-group-item tag-suggestion\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</li>";
  return buffer;
  }

  buffer += "\n<div class=\"panel panel-default filter-suggestions\">\n  <div class=\"panel-heading\">\n    <h5 class=\"text-center panel-title\">Popular Search Topics</h5>\n  </div>\n  <div class=\"panel-body\">\n    <ul class=\"list-group\">";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.tags), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n  </div>\n</div>";
  return buffer;
  });