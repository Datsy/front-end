module.exports = function(grunt) {
  "use strict";

  // project config
  grunt.initConfig({

    coffee: {
      build: {
        expand: true,
        cwd: 'resources/coffeescript',
        src: ['**/*.coffee'],
        dest: 'public/javascript',
        ext: '.js'
      }
    },

    // jasmine: {
    //   src: ['public/javascript/**/*.js'],
    //   options: {
    //     outfile: 'spec/SpecRunner.html',
    //     keepRunner: true,
    //     vendor: [
    //       'public/bower_components/jquery/jquery.min.js',
    //       'public/bower_components/bootstrap/dist/js/bootstrap.min.js',
    //       'public/bower_components/underscore/underscore-min.js',
    //       'public/bower_components/backbone/backbone-min.js',
    //       'public/bower_components/handlebars/handlebars.js',
    //       'public/bower_components/d3/d3.min.js'
    //     ],
    //     specs: 'spec/tests/*.js',
    //     helpers: 'spec/helpers/*.js'
    //   }
    // },

    watch: {
        compile: {
          files: 'resources/coffeescript/**/*.coffee',
          tasks: [ 'compile' ],
          options: {
            livereload: true
          }
        }
        // test: {
        //   files: ['public/javascript/**/*.js'],
        //   tasks: ['test']
        // }
    }

  });
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

//  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('compile', ['coffee']);
  grunt.registerTask('default', ['watch']);
  
};
