// spec.js
describe('to dos - One Item ;', function() {

  beforeEach(function() {
    browser.get('http://todomvc.com/examples/angular2/');
  });

  var inpField = element(by.css('[placeholder="What needs to be done?"]'));
  var countleft = element(by.className('todo-count'));
  var toDoItems = element.all(by.className('view'));

  function inputToDo_slow(s) {
    var i;
    for(i = 0; i < s.length; i++) {
      inpField.sendKeys(s.charAt(i));
    }
    inpField.sendKeys(protractor.Key.ENTER);
  }

  function inputToDo_fast(s) {
    inpField.sendKeys(s);
    inpField.sendKeys(protractor.Key.ENTER);
  }

   it('should add One To Do Item', function() {
     var  toDoAction1 = 'test 01 row A';

      inputToDo_slow(toDoAction1);
      browser.sleep(2000); // delay to visually added To Do Item
      expect(countleft.getText()).toEqual('1 item left');
      expect(toDoItems.count()).toEqual(1);

      expect(toDoItems.first().getText()).toEqual(toDoAction1);
      expect(toDoItems.last().getText()).toEqual(toDoAction1);

      var labText1 = toDoItems.get(0).element(by.css('label'));
      expect(labText1.getText()).toEqual(toDoAction1);
  });

});
