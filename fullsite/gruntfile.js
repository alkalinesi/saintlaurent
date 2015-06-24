module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		compass: {
			options: {
				sassDir: 'sass',
				cssDir: 'css'
			},
			dist: {
				options: {
					environment: 'production'
				}
			}
		},
		concat: {
			dist: {
				src: 'js/libs/*.js',
				dest: 'js/src/plugins.js'
			}
		},
		uglify: {
		    options: {
		      mangle: false
		    },
		    my_target: {
		      files: {
		        'js/scripts.min.js': ['js/src/scripts.js']
		      }
		    }
		  },
		/*
min: {
			dist: {
				options: {
					'report': 'min'
				},
				files: [{
					src: ['js/src/scripts.js'],
					dest: 'js/scripts.min.js'
				}]
			},
			merge:{
				options: {
					'report': 'min'
				},
				files: [{
					src: ['js/src/plugins.js'],
					dest: 'js/plugins.min.js'
				}]
			}
			},
*/
		watch: {
			grunt: {
				files: ['Gruntfile.js']
			},
			compass: {
				files: 'sass/**/*.scss',
				tasks: ['compass']
			},
			uglify: {
				files: 'js/src/scripts.js',
				tasks: ['uglify']
				
			},
			/*
min:{
				files: 'js/src/scripts.js',
				tasks: ['min']
			},
*/
			concat:{
				files: ['js/libs/*.js'],
				tasks: ['concat:dist']
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-yui-compressor');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', ['compass', 'concat', 'min', 'min:merge']);
	grunt.registerTask('default', ['watch']);
}