/*
 * grunt-kommando
 * https://github.com/bogdanbiv/grunt-kommando
 *
 * Copyright (c) 2014 Bogdan Bivolaru
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    kommando: {
        options: {},
        configSeleniumWebdriverJasmine: {
            driver: 'phantomjs',
            capabilities: [{browserName: 'phantomjs'}],
            options: {},
            tests: [
                '../test/functional/selenium-webdriver/jasmine/*.js',
            ]
        },
        configSeleniumWebdriverJasmineWithHelper: {
            driver: 'phantomjs',
            capabilities: [{browserName: 'phantomjs'}],
            tests: [
                '../test/functional/selenium-webdriver/jasmine-with-helper/*.js',
            ],
            runnerModules: [
                'jasmine-selenium-webdriver'
            ]
        },
        configPlainJasmine: {
            driver: 'phantomjs',
            capabilities: [{browserName: 'phantomjs'}],
            tests: [
                '../test/functional/selenium-webdriver/plain/*.js'
            ],
            runner: 'plain'
        },
        configSeleniumWebdriverMochaWithHelper: {
            driver: 'phantomjs',
            capabilities: [{browserName: 'phantomjs'}],
            tests: [
                '../test/functional/selenium-webdriver/mocha-with-helper/*.js',
            ],
            runnerModules: [
                'mocha-selenium-webdriver'
            ],
            runnerOptions: {
                reporter: 'dot'
            },
            runner: 'mocha'
        },
        configSeleniumWebdriverCucumber: {
            driver: 'phantomjs',
            capabilities: [{browserName: 'phantomjs'}],
            tests: [
                '../test/functional/selenium-webdriver/cucumber/*.feature',
            ],
            runner: 'cucumber',
            runnerOptions: {}
        },
        configWdMocha: {
            driver: 'phantomjs',
            capabilities: [{browserName: 'phantomjs'}],
            tests: [
                '../test/functional/wd/mocha/*.js',
            ],
            runner: 'mocha',
            runnerOptions: {
                reporter: 'spec'
            },
            client: 'wd'
        },
        configWdPromiseMocha: {
            driver: 'phantomjs',
            capabilities: [{browserName: 'phantomjs'}],
            tests: [
                '../test/functional/wd-promise/mocha/*.js',
            ],
            runner: 'mocha',
            runnerOptions: {
                reporter: 'nyan'
            },
            client: 'wd-promise'
        },
        configCabbieMocha: {
            // executing with selenium because cabbie in combination with Ghostdriver
            // currently fails with the initial session-request
            capabilities: [{browserName: 'phantomjs'}],
            tests: [
                '../test/functional/cabbie/mocha/*.js',
            ],
            runner: 'mocha',
            runnerOptions: {
                reporter: 'spec'
            },
            client: 'cabbie'
        },
        configLeadfootMocha: {
            capabilities: [{browserName: 'phantomjs'}],
            tests: [
                '../test/functional/leadfoot/mocha/*.js',
            ],
            runner: 'mocha',
            runnerOptions: {
                reporter: 'spec'
            },
            client: 'leadfoot'
        },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'kommando', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
