module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    jade: {
      dev: {
        files: {
          "views/index.html": "views/*.jade"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
};