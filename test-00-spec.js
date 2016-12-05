// spec.js
describe('to dos - Title, Text fields;', function() {

  beforeEach(function() {
    browser.get('http://todomvc.com/examples/angular2/');
  });

  it('should have a title, header text, footer text', function() {
    expect(browser.getTitle()).toEqual('Angular2 • TodoMVC');

    expect(element(by.css('h1')).getText()).toEqual('todos');
    expect(element(by.className('header')).getText()).toEqual('todos');

      var footText = element(by.className('info')).getText();
      expect(footText).toContain('Double-click to edit a todo');
      expect(footText).toContain('Created by Sam Saccone and Colin Eberhardt using Angular2');
      expect(footText).toContain('Part of TodoMVC');
   });

});
