'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-bake');

  grunt.initConfig({
    dirs: {
      handlebars: 'assets/hbs',
    },

    watch: {
      compass: {
        files: 'sass/**/*.scss',
        tasks: ['compass', 'replace']
      },

      scripts: {
        files: [
          'assets/js/components/*.js',
          'assets/js/framework/*.js',
          'assets/js/lib/*.js'
        ],
        tasks: ['jshint', 'concat', 'uglify']
      },

      bake: {
        files: ['templates/**/*.html'],
        tasks: 'bake:build'
      },

      handlebars: {
        files: ['<%= handlebars.compile.src %>'],
        tasks: ['handlebars:compile', 'concat', 'uglify']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },

      all: [
        'Gruntfile.js',
        'assets/js/components/*.js'
      ]
    },

    concat: {
      components: {
        src: ['assets/js/components/*.js'],
        dest: 'dist/HTMLResources/js/components.js'
      },
      framework: {
        src: ['assets/js/framework/*.js'],
        dest: 'dist/HTMLResources/js/framework.js'
      },
      library: {
        src: ['assets/js/lib/single/jquery-2.1.1.js',
              'assets/js/lib/*.js'],
        dest: 'dist/HTMLResources/js/lib.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/HTMLResources/js/components.min.js': 'dist/HTMLResources/js/components.js',
          'dist/HTMLResources/js/framework.min.js': 'dist/HTMLResources/js/framework.js',
          'dist/HTMLResources/js/lib.min.js': 'dist/HTMLResources/js/lib.js'
        }
      }
    },

    bake: {
      build: {
        files: {
            'dist/index.html': 'templates/structure/index.html',
            'dist/template1.html': 'templates/layout/template1.html',
            'dist/header-image.html': 'templates/components/header-image.html',
            'dist/standfirst.html': 'templates/components/standfirst.html',
            'dist/title.html': 'templates/components/title.html',
            'dist/subtitle.html': 'templates/components/subtitle.html',
            'dist/bodycopy.html': 'templates/components/bodycopy.html',
            'dist/quote.html': 'templates/components/quote.html',
            'dist/words.html': 'templates/components/words.html',
            'dist/expert-advice.html': 'templates/components/expert-advice.html'
        }
      }
    },

    compass: {
      clean: {
        options: {
          clean: true
        }
      },
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },

    replace: {
      example: {
        src: ['dist/HTMLResources/css/*.css'],
        overwrite: true,
        replacements: [{
            from: '/HTMLResources/img',
            to: '../../HTMLResources/img'
          },
          {
            from: '/dist../../HTMLResources/img',
            to: '../../HTMLResources/img'
          }
        ]
      }
    },

    handlebars: {
      compile: {
        src: '<%= dirs.handlebars %>/*.hbs',
        dest: 'assets/js/templates.js',
        options: {
          namespace: 'Rhapsody.Templates',
          processName: function(filePath) {
            return filePath.replace(/^assets\/hbs\//, '').replace(/\.hbs$/, '');
          }
        }
      }
    }
  });

  grunt.registerTask('build', ['compass:clean', 'compass:dist', 'jshint', 'concat', 'uglify', 'bake:build', 'replace']);
  grunt.registerTask('default', ['build']);
};
