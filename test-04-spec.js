// spec.js
describe('to dos - Two Items;', function() {

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

   it('should Two To Do, X remove first', function() {
    var  toDoAction1 = 'Test 04 row first';
    var  toDoAction2 = 'Test 04 row second';

     inputToDo_slow(toDoAction1);
     expect(countleft.getText()).toEqual('1 item left');
     expect(toDoItems.count()).toEqual(1);

     inputToDo_slow(toDoAction2);
     expect(countleft.getText()).toEqual('2 items left');
     expect(toDoItems.count()).toEqual(2);

     expect(toDoItems.first().getText()).toEqual(toDoAction1);
     expect(toDoItems.last().getText()).toEqual(toDoAction2);

     var labText1 = toDoItems.get(0).element(by.css('label'));
     expect(labText1.getText()).toEqual(toDoAction1);

     var labText2 = toDoItems.get(1).element(by.css('label'));
     expect(labText2.getText()).toEqual(toDoAction2);

     var delBox1 = toDoItems.get(0).element(by.className('destroy'));
     labText1.click();
     browser.sleep(2000); // delay to visually see X remove
     delBox1.click();
     browser.sleep(2000); // delay to visually see deleted

     // after X remove first To Do, the second To Do is now First
     expect(countleft.getText()).toEqual('1 item left');
     expect(toDoItems.count()).toEqual(1);

     expect(toDoItems.first().getText()).toEqual(toDoAction2);
     expect(toDoItems.last().getText()).toEqual(toDoAction2);
     expect(labText1.getText()).toEqual(toDoAction2);
  });

});
