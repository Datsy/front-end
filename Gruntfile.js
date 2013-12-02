module.exports = function(grunt) {
  "use strict";

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
 
    jade: {
      compile: {
        options: {
          pretty: false
        },
        files: [ {
          cwd: "views",
          src: "index.jade",
          dest: "spec/html",
          expand: true,
          ext: ".html"
        } ]
      }
    },

    jasmine: {
      src: [
        'public/javascript/main.js',
        'public/javascript/models/Datsy.js',
        'public/javascript/models/VisDatum.js',
        'public/javascript/collections/VisData.js',
        'public/javascript/router/router.js',
        'public/javascript/views/DatsyApp.js',
        'public/javascript/views/IndexView.js',
        'public/javascript/dataset/DatasetView.js',
        'public/javascript/explore/ExploreDataView.js',
        'public/javascript/explore/ExploreDatasetsView.js',
        'public/javascript/explore/ExploreCategoriesView.js',
        'public/javascript/visualizer/ColumnModelView.js',
        'public/javascript/visualizer/ChartView.js',
        'public/javascript/visualizer/SvgBackboneView.js',
        'public/javascript/visualizer/GraphView.js',
        'public/javascript/visualizer/VisualizerView.js'
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
        helpers: 'spec/helpers/*.js'
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          nodeArgs: ['--debug'],
          env: {
            PORT: '3000'
          }
        }
      }
    },

    watch: {
      jade: {
        files: ['views/src/**/*.jade'],
        tasks: ['jade']
      },
      jasmine: {
        files: ['public/javascript/**/*.js'],
        tasks: ['jasmine']
      },
      compile: {
        files: 'resources/coffeescript/**/*.coffee',
        tasks: [ 'compile' ],
        options: {
          livereload: true
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jade', 'coffee', 'jasmine', 'watch']);  
};
