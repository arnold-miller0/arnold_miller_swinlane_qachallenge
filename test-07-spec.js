// spec.js
describe('to dos - Five Items;', function() {

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

   it('should Five items To Do change item 2, 4 To Do text', function() {
     var toDoActions =
       ['test 07 row A first To Do item initial does not change',
        'test 07 row B second To Do item initial value will change',
        'test 07 row C third To Do item initial value not change',
        'test 07 row D fourth To Do item initial value changes',
        'test 07 row E fifth To Do item initial value'
      ];

    // non '' string are Items to be changed
    var toDoChanges =
      ['',
        'test 07 row B changed value second To Do item',
        '',
        'test 07 row D some other fourth To Do item value',
        ''
      ];
      var i;
      for (i = 0 ; i < toDoActions.length; i++) {
         inputToDo_slow(toDoActions[i]);
      }
      browser.sleep(2000); // delay to visually added To Do Items

      expect(countleft.getText()).toEqual('5 items left');
      expect(toDoItems.count()).toEqual(toDoActions.length);

      expect(toDoItems.first().getText()).toEqual(toDoActions[0]);
      expect(toDoItems.last().getText()).toEqual(toDoActions[toDoActions.length-1]);

      for (i = 0 ; i < toDoActions.length; i++) {
        labText = toDoItems.get(i).element(by.css('label'));
        expect(labText.getText()).toEqual(toDoActions[i]);
      }

    // Double-click only on to be changed items
    for (i = 0 ; i < toDoChanges.length; i++) {
      if (toDoChanges[i] != '') {
        labText = toDoItems.get(i).element(by.css('label'));
        browser.actions().doubleClick(labText).perform();
      }
    }
     browser.sleep(2000); // delay to visually check editable To Do item

    // get input edit field via list of editable items
     var editItems = element.all(by.className('editing'));
     var editText;
     for (i = 0 ; i < toDoChanges.length; i++) {
       if (toDoChanges[i] != '') {
         // changing items in order so always at frist edit item when doing change
         editText = editItems.get(0).element(by.className('edit'));
         editToDo_fast(editText,toDoChanges[i]);
       }
     }
     browser.sleep(2000); // delay to visually check changed To Do item

     // Check Todo Item test based on not changed or changed values
     for (i = 0 ; i < toDoActions.length; i++) {
       labText = toDoItems.get(i).element(by.css('label'));
       if (toDoChanges[i] == '') { // initial value
         expect(labText.getText()).toEqual(toDoActions[i]);
       }
       if (toDoChanges[i] != '') { // changed value
         expect(labText.getText()).toEqual(toDoChanges[i]);
       }
     }
  });

});
