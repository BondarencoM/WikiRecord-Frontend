// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-spec-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      // jasmine: { random: false } 
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/Comendie-Frontend'),
      subdir: '.',
      reports: [
        { type: 'html' },
        { type: 'lcovonly' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['spec', 'progress', 'kjhtml'],
    specReporter: {
      suppressErrorSummary: false,  // do print error summary
      suppressFailed: false,  // do print information about failed tests
      suppressPassed: false,  // do print information about passed tests
      suppressSkipped: false,  // do print information about skipped tests
      showSpecTiming: true, // print the time elapsed for each spec
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
