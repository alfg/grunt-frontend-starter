module.exports = function(grunt) {
    //grunt.file.defaultEncoding = 'utf8';
    //grunt.file.preserveBOM = true;
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            html: {
                files: ['./src/templates/**/*'],
                tasks: ['html']
            },
            js: {
                files: ['./src/js/**/*.js'],
                tasks: ['js']
            },
            compass: {
                files: ['./src/css/**/*.scss'],
                tasks: ['style']
            },
            css: {
                files: ['./_site/css/**/*.css'],
                tasks: ['style']
            },
            livereload: {
                files: ['./_site/**/*'],
                options: {
                    livereload: true
                }
            }
        },

        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },

            lib: {
                // the files to concatenate
                src: ['src/js/lib/jquery-1.11.2.js', 'src/js/lib/!(modernizr).js'],
                // the location of the resulting JS file
                dest: './_site/js/lib.js'
            },

            app: {
                // the files to concatenate
                src: ['src/js/app/app.js'],
                // the location of the resulting JS file
                dest: './_site/js/app.js'
            }
        },

        copy: {
            site: {
                expand: true,
                cwd: './src/js',
                src: ['**'],
                dest: './_site/js/'
            },

            images: {
                expand: true,
                cwd: './src/images',
                src: ['**'],
                dest: './_site/images/'
            },

            fonts: {
                expand: true,
                cwd: './src/fonts',
                src: ['**'],
                dest: './_site/fonts'
            },

            css: {
                expand: true,
                cwd: './src/css/lib',
                src: ['**.css'],
                dest: './_site/styles/lib'
            }
        },

        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            _site: {
                files: {
                    './_site/js/<%= pkg.name %>.min.js': ['<%= concat._site.dest %>']
                }
            }
        },

        jshint: {
            // define the files to lint
            files: ['gruntfile.js', 'src/app/**/*.js', 'src/app/*.js', 'test/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },

        compass: {
            site: {
                options: {
                    sassDir: './src/css',
                    cssDir: './_site/styles'
                    //raw: 'Encoding.default_external = utf-8'
                }
            }
        },

        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                    report: 'gzip'
                },

                files: {
                    './_site/styles/app/app.min.css': './_site/styles/app/app.css',
                    './_site/styles/lib/lib.min.css': ['./_site/styles/lib/*.css', '!*.min.css']
                }
            }
        },

        assemble: {
            options: {
                layoutDir: './src/templates/layout',
                data: './src/templates/app/json/**/*.{json,yml}',
                flatten: true
            },

            main: {
                options: {
                    layout: './src/templates/layout/default.html',
                    partials: './src/templates/app/partials/**/*.html'
                },
                src: './src/templates/app/*.html',
                dest: './_site/'
            },
        },

        htmlmin: {
            site: {
                options: {
                    removeComments: false,
                    collapseWhitespace: false,
                    removeEmptyAttributes: false,
                    removeCommentsFromCDATA: false,
                    removeRedundantAttributes: false,
                    collapseBooleanAttributes: false
                },
                files: {
                    // Destination : Source
                    './_site/index.html': './_site/index.html'
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: './_site/'
                }
            }
        },

        clean: {
            all: ['./_site/*']
        },

        'site': {
            options: {
                base: '_site'
            },
            src: ['**']
        }

    });

    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('html', ['assemble', 'htmlmin']);

    grunt.registerTask('js', ['copy', 'jshint', 'concat', 'uglify']);

    grunt.registerTask('style', ['compass']);

    grunt.registerTask('serve', ['default', 'connect', 'watch']);

    grunt.registerTask('pub', ['default', 'cssmin']);

    grunt.registerTask('default', ['js', 'style', 'html']);

};