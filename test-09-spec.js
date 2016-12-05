// spec.js
describe('to dos - nine Items;', function() {

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

   it('should Nine To Dos with check some complete, all complete removed', function() {
     var toDoActions =
       ['t9-1', 't9-2', 't9-3', 't9-4', 't9-5', 't9-6', 't9-7', 't9-8', 't9-9'  ];
      var toDoComplete = // three ompleted
        [false, false, true ,false, false, true, false, false, true ];
        //  1    2      3     4     5     6       7      8      9

     var labText, chkBox, delBox;
     var i;
     for (i = 0 ; i < toDoActions.length; i++) {
        inputToDo_slow(toDoActions[i]);
     }
     browser.sleep(2000); // delay to visually added To Do Items

     expect(countleft.getText()).toEqual('9 items left');
     expect(toDoItems.count()).toEqual(toDoActions.length);

     expect(toDoItems.first().getText()).toEqual(toDoActions[0]);
     expect(toDoItems.last().getText()).toEqual(toDoActions[toDoActions.length-1]);

     for (i = 0 ; i < toDoActions.length; i++) {
       labText = toDoItems.get(i).element(by.css('label'));
       expect(labText.getText()).toEqual(toDoActions[i]);
     }

     // Click complete only for completed actions
     for (i = 0 ; i < toDoActions.length; i++) {
       if (toDoComplete[i]) {
         chkBox = toDoItems.get(i).element(by.className('toggle'));
         expect(chkBox.isSelected()).toBe(false);
         chkBox.click();
         expect(chkBox.isSelected()).toBe(true);
       }
     }
     browser.sleep(2000); // delay to visually see check mark
     expect(countleft.getText()).toEqual('6 items left');

     // no change in To Do Item List
     for (i = 0 ; i < toDoActions.length; i++) {
       labText = toDoItems.get(i).element(by.css('label'));
       expect(labText.getText()).toEqual(toDoActions[i]);
     }

     // Click all complete check box
     var allChkBox = element(by.className('toggle-all'));
     expect(allChkBox.isSelected()).toBe(false);
     allChkBox.click();
     expect(allChkBox.isSelected()).toBe(true);
     browser.sleep(2000); // delay to visually see all items with check marks

     expect(countleft.getText()).toEqual('0 items left');

     // Cheeck all Items have check mark complete
     for (i = 0 ; i < toDoActions.length; i++) {
       chkBox = toDoItems.get(i).element(by.className('toggle'));
       expect(chkBox.isSelected()).toBe(true);
     }

      // Click all complete check box to mark all un-completed
      allChkBox.click();
      expect(allChkBox.isSelected()).toBe(false);

      browser.sleep(2000); // delay to visually see all items without check marks

      expect(countleft.getText()).toEqual('9 items left');
      // Cheeck all Items have check mark complete
      for (i = 0 ; i < toDoActions.length; i++) {
        chkBox = toDoItems.get(i).element(by.className('toggle'));
        expect(chkBox.isSelected()).toBe(false);
      }

      // Click all complete check box to aagain mark all completed
      allChkBox.click();
      expect(allChkBox.isSelected()).toBe(true);
      browser.sleep(2000); // delay to visually see all items checked completed
      expect(countleft.getText()).toEqual('0 items left');

      var clrBtn = element(by.className('clear-completed'));
      expect(clrBtn.getText()).toEqual('Clear completed');
      clrBtn.click();
      browser.sleep(2000); // delay to visually see all itemes deleted


  });

});
