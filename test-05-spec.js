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
    inpField.sendKeys(s);
    inpField.sendKeys(protractor.Key.ENTER);
  }

  function editToDo_fast(e,s) {
    e.clear();
    e.sendKeys(s);
    e.sendKeys(protractor.Key.ENTER);
  }

   it('should One To Do change text', function() {
     var  toDoAction1 = 'test 05 initial text';

    var  toDoChange1 = 'test 05 changed text';

     inputToDo_slow(toDoAction1);
     browser.sleep(2000); // delay to visually added To Do Item
     expect(countleft.getText()).toEqual('1 item left');
     expect(toDoItems.count()).toEqual(1);

     var labText1 = toDoItems.get(0).element(by.css('label'));
     expect(labText1.getText()).toEqual(toDoAction1);

    // Double-click via broswer action
     browser.actions().doubleClick(labText1).perform();
     browser.sleep(2000); // delay to visually check editable To Do item

    // get input edit field via list of editable items
     var editItems = element.all(by.className('editing'));
     var editText1 = editItems.get(0).element(by.className('edit'));
     editToDo_fast(editText1,toDoChange1);

     browser.sleep(2000); // delay to visually check changed To Do item

     expect(labText1.getText()).toEqual(toDoChange1);
  });

});
