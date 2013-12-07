this["compTemplates"] = this["compTemplates"] || {};

this["compTemplates"]["spec/hbs/explore/exploreMainView.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "\n<div class=\"row top-bar\">\n  <div class=\"text-box col-md-9\">\n    <h1>Browse Data Sets</h1>\n    <h4 class=\"text-muted\">Find the data you would like to see visualized</h4>\n  </div>\n</div>\n<header class=\"row well well-sm\">\n  <p id=\"sort_table_name\" class=\"col-md-4 text-center\">Sort By Name</p>\n  <p id=\"sort_author\" class=\"col-md-4 text-center\">Sort By Source </p>\n  <p id=\"sort_rating\" class=\"col-md-4 text-center\">Sort By Rating</p>\n</header>";
  });