this["compTemplates"] = this["compTemplates"] || {};

this["compTemplates"]["spec/hbs/filter/loading.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\n<div class=\"content\">\n  <div class=\"col-md-8 col-md-offset-2 verticalCenter\">\n    <h1 class=\"text-center\">Hmmm... ";
  if (stack1 = helpers.searchTag) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.searchTag); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "?</h1>\n    <h2 class=\"text-center text-muted\">Datsy is fetching your results...</h2><img src=\"images/loading.gif\" class=\"img-responsive\"/>\n  </div>\n</div>";
  return buffer;
  });