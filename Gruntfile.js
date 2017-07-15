module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'bower_components/bootstrap/js/src/',
						src: ['**/*.js'],
						destination: 'js/bootstrap/'
					},
					{
						expand: true,
						cwd: 'bower_components/jquery/dist/',
						src: ['**/*.js', '**/*.map'],
						destination: 'js/jquery/'
					},
					{
						expand: true,
						cwd: 'bower_components/bootstrap/',
						src: ['scss/**'],
						destination: 'scss/bootstrap/'
					}
				]
			}
		},
		sass: {
			dev: {
				options: {
					style: 'expanded',
					loadPath: 'scss/bootstrap'
				},
				files: {
					'static/css/style.css': 'scss/style.scss'
				}
			},
			dist: {

			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		watch: {
			grunt: {
				files: ['Gruntfile.js']
			},
			sass: {
				files: ['scss/**/*.scss'],
				tasks: ['sass']
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('clean', ['clean']);
	grunt.registerTask('build', ['sass', 'copy']);
	grunt.registerTask('uglify', ['uglify']);
	grunt.registerTask('default', ['build', 'watch']);

};