module.exports = function(grunt) {
  "use strict";

  // project config
  grunt.initConfig({

    jasmine: {
      src: ['public/javascript/**/*.js', '!public/javascript/main.js'],
      options: {
        outfile: 'spec/SpecRunner.html',
        keepRunner: true,
        vendor: [
          'public/bower_components/jquery/jquery.min.js',
          'public/bower_components/bootstrap/dist/js/bootstrap.min.js',
          'public/bower_components/underscore/underscore-min.js',
          'public/bower_components/backbone/backbone-min.js',
          'public/bower_components/handlebars/handlebars.js',
          'public/bower_components/d3/d3.min.js'
        ],
        specs: 'spec/tests/*.js',
        helpers: 'spec/helpers/*.js'
      }
    },

    watch: {
      files: ['public/javascript/**/*.js'],
      tasks: ['default']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jasmine']);
  
};
