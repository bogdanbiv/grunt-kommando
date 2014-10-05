/*
 * grunt-kommando
 * https://github.com/bogdanbiv/grunt-kommando
 *
 * Copyright (c) 2014 Bogdan Bivolaru
 * Licensed under the MIT license.
 */

'use strict';
var async = require('async');
var path = require('path');
var lodash = require('lodash');
var inspect = require('util').inspect;
var run = require('kommando');



module.exports = function(grunt) {
  var capabilities = [{browserName: 'phantomjs'}];
  var driver = 'phantomjs';
  var runs;
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  grunt.task.registerMultiTask('kommando', '(Runs Uxebu\'s test suite runner, Kommando.)', function() {
    // Merge task-specific and/or target-specific options with these defaults.

    var done = this.async();
    var plugin_defaults = {
        background: false,
        captureConsole: true,
    };
    var options = this.options(plugin_defaults);
    lodash.defaults(this.data, options);
    grunt.log.writeln(this.target + ': ' + JSON.stringify(this.data));
    grunt.log.writeln('Opts: ' + JSON.stringify(options));

    runs = [run.bind(null, this.data)];

    async.series(runs, function(error, results) {
        var passed = lodash.every(lodash.map(results, function(result) {
            return lodash.every(result, 'passed');
        }));
        if (!passed) {
            error = new Error('One or more tests did not pass.');
        }
        if (error) {
            grunt.log.error(error);
            // process.exit(1);
        } else {
            // process.exit(0);
        }
        done(true);
    });
  });
};
