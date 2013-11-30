module.exports = function(grunt) {
  "use strict";

  // project config
  grunt.initConfig({

    jade: {
      compile: {
        options: {
          client: false,
          pretty: true
        },
        files: [ {
          cwd: "views/src",
          src: "**/*.jade",
          dest: "views/release",
          expand: true,
          ext: ".ejs"
        } ]
      }
    },

    jasmine: {
      // Need to fix the include order
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
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jade', 'jasmine', 'watch']);
  
};
