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
            'dist/template2.html': 'templates/layout/template2.html',
            'dist/header-image-hidden.html': 'templates/layout/header-image-hidden.html',
            'dist/header-image-narrow.html': 'templates/layout/header-image-narrow.html',
            'dist/header-image-fullwidth.html': 'templates/layout/header-image-fullwidth.html',
            'dist/header-image-carousel.html': 'templates/layout/header-image-carousel.html',
            'dist/test-article.html': 'templates/layout/test-article.html',
            'dist/header-image.html': 'templates/components/header-image.html',
            'dist/standfirst.html': 'templates/components/standfirst.html',
            'dist/title.html': 'templates/components/title.html',
            'dist/subtitle.html': 'templates/components/subtitle.html',
            'dist/bodycopy.html': 'templates/components/bodycopy.html',
            'dist/quote.html': 'templates/components/quote.html',
            'dist/words.html': 'templates/components/words.html',
            'dist/pull-out-one.html': 'templates/components/pull-out-one.html',
            'dist/pull-out-two.html': 'templates/components/pull-out-two.html',
            'dist/expert-advice.html': 'templates/components/expert-advice.html',
            'dist/expert-tip.html': 'templates/components/expert-tip.html',
            'dist/bookit.html': 'templates/components/bookit.html',
            'dist/related-articles.html': 'templates/components/related-articles.html',
            'dist/image.html': 'templates/components/image.html',
            'dist/list-one.html': 'templates/components/list-one.html',
            'dist/list-three.html': 'templates/components/list-three.html',
            'dist/hack-feature.html': 'templates/components/hack-feature.html',
            'dist/video.html': 'templates/components/video.html',
            'dist/product-carousel.html': 'templates/components/product-carousel.html',
            'dist/product-grid.html': 'templates/components/product-grid.html',
            'dist/border-stripes.html': 'templates/components/border-stripes.html',
            'dist/old-content-banner.html': 'templates/components/old-content-banner.html',
            'dist/footnote.html': 'templates/components/footnote.html'
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
