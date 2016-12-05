// spec.js
describe('to dos - Four Items;', function() {

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

   it('should Four To Dos with complete remove second item', function() {
     var  toDoActions = ['test 06 row A first item',
                         'test 06 row B second item',
                         'test 06 row C third item',
                         'test 06 row D fourth item'];
     var labText, chkBox, delBox;
     var i;
     completeToDo = 1;
     otherToDo = 3;
     for (i = 0 ; i < toDoActions.length; i++) {
        inputToDo_slow(toDoActions[i]);
     }
     browser.sleep(2000); // delay to visually added To Do Items

     expect(countleft.getText()).toEqual('4 items left');
     expect(toDoItems.count()).toEqual(toDoActions.length);

     expect(toDoItems.first().getText()).toEqual(toDoActions[0]);
     expect(toDoItems.last().getText()).toEqual(toDoActions[toDoActions.length-1]);

     for (i = 0 ; i < toDoActions.length; i++) {
       labText = toDoItems.get(i).element(by.css('label'));
       expect(labText.getText()).toEqual(toDoActions[i]);
     }

     chkBox = toDoItems.get(completeToDo).element(by.className('toggle'));
     expect(chkBox.isSelected()).toBe(false);
     chkBox.click();
     expect(chkBox.isSelected()).toBe(true);
     browser.sleep(2000); // delay to visually see check mark
     expect(countleft.getText()).toEqual('3 items left');

    // click on other To Do Item so X remove is not no compled Item
    labtext = toDoItems.get(otherToDo).element(by.css('label'));
    labtext.click();
    delBox = toDoItems.get(otherToDo).element(by.className('destroy'));
    browser.sleep(2000); // delay to visually see X mark

    // no change in To Do Item List
    for (i = 0 ; i < toDoActions.length; i++) {
      labText = toDoItems.get(i).element(by.css('label'));
      expect(labText.getText()).toEqual(toDoActions[i]);
    }

     var clrBtn = element(by.className('clear-completed'));
     expect(clrBtn.getText()).toEqual('Clear completed');
     clrBtn.click();
     browser.sleep(2000); // delay to visually see delete completed item

    // No change in Items left to complete
    expect(countleft.getText()).toEqual('3 items left');

    // Change in To Do Item List
    // First Item does not change
    // Third Item becomes Second Item
    // Fourth item (last) becomes Third Item (last item)
    expect(toDoItems.first().getText()).toEqual(toDoActions[0]);
    expect(toDoItems.last().getText()).toEqual(toDoActions[toDoActions.length-1]);

    for (i = 0 ; i < toDoActions.length; i++) {
      if (i < completeToDo) {  // before removed item so no change
        labText = toDoItems.get(i).element(by.css('label'));
        expect(labText.getText()).toEqual(toDoActions[i]);
      }
      if (i > completeToDo) { // after removed item so before by 1 offset
        labText = toDoItems.get(i-1).element(by.css('label'));
        expect(labText.getText()).toEqual(toDoActions[i]);
      }
    }
  });

});
