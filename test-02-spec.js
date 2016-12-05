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

   it('should One To Do with check box on/off', function() {
     var  toDoAction1 = 'test 02 row A';

     inputToDo_slow(toDoAction1);
     browser.sleep(2000); // delay to visually added To Do Item
     expect(countleft.getText()).toEqual('1 item left');
     expect(toDoItems.count()).toEqual(1);

     var labText1 = toDoItems.get(0).element(by.css('label'));
     expect(labText1.getText()).toEqual(toDoAction1);

     var chkBox1 = toDoItems.get(0).element(by.className('toggle'));
     expect(chkBox1.isSelected()).toBe(false);

     chkBox1.click();
     expect(chkBox1.isSelected()).toBe(true);

     browser.sleep(2000); // delay to visually check check mark
     expect(countleft.getText()).toEqual('0 items left');

     var clrBtn = element(by.className('clear-completed'));
     expect(clrBtn.getText()).toEqual('Clear completed');

     chkBox1.click();
     expect(chkBox1.isSelected()).toBe(false);

     browser.sleep(2000); // delay to visually check check mark
     expect(countleft.getText()).toEqual('1 item left');

  });

});
