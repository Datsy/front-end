module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({

    connect: {
      test: {
        options: {
          port: 9001,
          hostname: 'localhost',
          base: '.'
        }
      }
    },

    coffee: {
      build: {
        expand: true,
        cwd: 'resources/coffeescript',
        src: ['**/*.coffee'],
        dest: 'public/javascript',
        ext: '.js'
      }
    },
 
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [ {
          cwd: "views/templates",
          src: "**/*.jade",
          dest: "spec/hbs",
          expand: true,
          ext: ".hbs"
        } ]
      }
    },

    handlebars: {
      compile: {
        options: {
          namespace: "compTemplates",
        },
        files: [ {
          expand: true,
          cwd: 'spec/hbs',
          src: '**/*.hbs',
          dest: 'spec/helpers',
          ext: '.js'
        } ]
      }
    },

    jasmine: {
      src: [
        'public/javascript/models/*.js',
        'public/javascript/collections/*.js',
        'public/javascript/router/*.js',
        'public/javascript/views/helperViews/*.js',
        'public/javascript/views/**/*.js'
      ],
      options: {
        outfile: 'spec/SpecRunner.html',
        keepRunner: true,
        vendor: [
          'public/bower_components/jquery/jquery.min.js',
          'public/bower_components/jqueryui/ui/minified/jquery-ui.min.js',
          'public/bower_components/bootstrap/dist/js/bootstrap.min.js',
          'public/bower_components/underscore/underscore-min.js',
          'public/bower_components/backbone/backbone-min.js',
          'public/bower_components/handlebars/handlebars.js',
          'public/bower_components/d3/d3.min.js'
        ],
        specs: 'spec/tests/*.js',
        helpers: 'spec/helpers/**/*.js'
      }
    },

    watch: {
      compile: {
        files: 'resources/coffeescript/**/*.coffee',
        tasks: [ 'compileCoffee' ],
        options: {
          livereload: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('hbs', ['handlebars']);
  grunt.registerTask('compileJade', ['jade']);
  grunt.registerTask('compileCoffee', ['coffee']);
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('default', ['watch']);
  
};
