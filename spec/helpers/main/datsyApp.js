this["compTemplates"] = this["compTemplates"] || {};

this["compTemplates"]["spec/hbs/main/datsyApp.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "\n<header role=\"banner\" class=\"row navbar navbar-inverse navbar-fixed-top bs-docs-nav\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" data-toggle=\"collapse\" data-target=\".bs-navbar-collapse\" class=\"navbar-toggle\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"\" class=\"navbar-brand\">DATSY<span class=\"brand-smaller\">.IO</span></a>\n      <form id=\"headerSearchTag\">\n        <input type=\"text\" placeholder=\"Search for keywords...\" class=\"header-search-box\"/>\n        <button type=\"submit\" style=\"display:none\" class=\"header-search-submit btn btn-sm btn-default\">Submit</button>\n      </form>\n    </div>\n    <nav role=\"navigation\" class=\"collapse navbar-collapse bs-navbar-collapse span3\">\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li><a id=\"visualizer\">Popular Visualizations</a></li>\n        <li><a id=\"explore\">Explore Datasets</a></li>\n        <li><a id=\"login\">Log In</a></li>\n      </ul>\n    </nav>\n  </div>\n</header>";
  });