module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				hostname: '*'
			},
			serve: {
				options: {
					open: true
				}
			}
		},

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
			files: ['src/*'],
			tasks: ['default'],
			options: {
				livereload: true
			}
		}

	});

	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-newer');

	grunt.registerTask("serve", ["connect:serve", "watch"]);

};
