// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test-03-spec.js'],
  capabilities: {
      browserName: 'chrome'
  },
  useAllAngular2AppRoots: true
}
