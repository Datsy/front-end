this["compTemplates"] = this["compTemplates"] || {};

this["compTemplates"]["spec/hbs/visualization/failedTemplate.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "\n<p>Data failed to load. Fuck this API.</p>";
  });