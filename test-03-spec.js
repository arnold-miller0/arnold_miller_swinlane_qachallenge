// spec.js
describe('to dos - One Item;', function() {

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
    inpField.clear();
    inpField.sendKeys(s);
    inpField.sendKeys(protractor.Key.ENTER);
  }

   it('should To Do fast input', function() {
    var  toDoAction1 = 'test 03 row fast';

     inputToDo_fast(toDoAction1);
     browser.sleep(2000); // delay to visually added To Do Item
     expect(countleft.getText()).toEqual('1 item left');
     expect(toDoItems.count()).toEqual(1);

     var labText1 = toDoItems.get(0).element(by.css('label'));
     expect(labText1.getText()).toEqual(toDoAction1);

  });

});
