Feature('Adding one task in TODO');
Before(async (I) => {
  I.amOnPage('http://todomvc.com/examples/emberjs/');
  I.see('todos');
});

Scenario('Without parameters', (I) => {
  I.fillField('#new-todo', 'Test task');
  I.pressKey('Enter');
  I.see('Test task', 'label');
});

const textForTasks = new DataTable(['text']);
textForTasks.add(['undefined']);
textForTasks.add(['$1.00']);
textForTasks.add([1.00]);

Data(textForTasks).Scenario('With parameters', (I, current) => {
  I.fillField('#new-todo', current.text);
  I.pressKey('Enter');
  I.see(current.text, 'label');
});

After(async (I) => {
  I.see('1 item left');
});