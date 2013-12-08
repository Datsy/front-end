this["compTemplates"] = this["compTemplates"] || {};

this["compTemplates"]["spec/hbs/visualization/visualizations.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "\n<div class=\"col-md-12 chart-access-buttons\">\n  <div class=\"btn-group\">\n    <button id=\"lineChart\" type=\"button\" class=\"btn btn-default\">Line</button>\n    <button id=\"lineChart2Y\" type=\"button\" class=\"btn btn-default\">Line (2 yAxes)</button>\n    <button id=\"stackedArea\" type=\"button\" class=\"btn btn-default\">Stacked Area</button>\n  </div>\n  <button id=\"downloadPhoto\" class=\"btn btn-primary pull-right\">Download PNG</button>\n</div>\n<div id=\"graph\"></div>";
  });