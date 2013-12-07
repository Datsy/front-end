this["compTemplates"] = this["compTemplates"] || {};

this["compTemplates"]["spec/hbs/visualization/failedTemplate.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "\n<div class=\"content failed-template\">\n  <div class=\"col-md-8 col-md-offset-2 verticalCenter\">\n    <h1 class=\"text-center\">We're sorry, an error has occured.</h1>\n    <h2 class=\"text-center text-muted\">Data failed to load. Please hand complaints to the API team</h2>\n    <div class=\"text-center\">\n      <button class=\"try-again-button btn btn-lg btn-success\">Back</button>\n    </div>\n  </div>\n</div>";
  });