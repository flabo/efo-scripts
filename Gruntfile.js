module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *	<%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: ["src/*.js"],
				dest: "dist/efo-scripts.js"
			}
		},

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

		typescript: {
			base: {
				src: ['src/*.ts'],
				dest: 'dist',
				options:{
					comments: true,
				}
			}
		},

		// tslintタスクを定義
		tslint: {
			// tsターゲットを定義
			ts: {
				// tslint.jsonファイルの読み込み
				options: {
					configuration: grunt.file.readJSON('tslint.json')
				},
				// 構文チェックするファイルの設定
				files: {
					src: ['src/*.ts']
				}
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/jquery.boilerplate.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/jquery.boilerplate.js"],
				dest: "dist/jquery.boilerplate.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
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

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-tslint');
	grunt.loadNpmTasks('grunt-newer');

	grunt.registerTask("build", ["concat", "uglify"]);
	grunt.registerTask("default", ["typescript", "tslint", "jshint", "build"]);
	grunt.registerTask("travis", ["default"]);
	grunt.registerTask("serve", ["default", "connect:serve", "watch"]);

};
