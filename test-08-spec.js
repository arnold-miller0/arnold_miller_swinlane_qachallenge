// spec.js
describe('to dos - eight Items;', function() {

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

   it('should Eight To Dos with check some complete, all complete, some not complete', function() {
     var toDoActions =
       ['test 08 to do A',
        'test 08 to do B',
        'test 08 to do C',
        'test 08 to do D',
        'test 08 to do E',
        'test 08 to do F',
        'test 08 to do G',
        'test 08 to do H'
      ];
      var toDoComplete = // three ompleted
        [true, false, false,true, false, false, false, true ];
        // 1    2      3     4     5     6       7      8

     var labText, chkBox, delBox;
     var i;
     for (i = 0 ; i < toDoActions.length; i++) {
        inputToDo_slow(toDoActions[i]);
     }
     browser.sleep(2000); // delay to visually added To Do Items

     expect(countleft.getText()).toEqual('8 items left');
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
     expect(countleft.getText()).toEqual('5 items left');

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

     // Click un-completed only for items in completed list
     for (i = 0 ; i < toDoActions.length; i++) {
       if (toDoComplete[i]) {
         chkBox = toDoItems.get(i).element(by.className('toggle'));
         chkBox.click();
         expect(chkBox.isSelected()).toBe(false);
       }
     }
     browser.sleep(2000); // delay to visually see check mark
     expect(countleft.getText()).toEqual('3 items left');

     // Cheeck all Items have check mark via not true in completed list
     for (i = 0 ; i < toDoActions.length; i++) {
       chkBox = toDoItems.get(i).element(by.className('toggle'));
       expect(chkBox.isSelected()).not.toBe(toDoComplete[i]);
     }

  });

});
