Feature('Using locators at work with task in TODO');
Before(async (I) => {
  I.amOnPage('http://todomvc.com/examples/emberjs/');
  I.see('todos');
  I.fillField('#new-todo', 'Test task 1');
  I.pressKey('Enter');
  I.fillField('#new-todo', 'Test task 2');
  I.pressKey('Enter');
  I.see('2 items left');
});

const task1 = '//*[contains(text(),"Test task 1")]';
const task2 = '//*[contains(text(),"Test task 2")]';
const taskList = '//*[@id="todo-list"]';

Scenario('Mark task as completed', (I) => {
  I.click(`${task2}/../input`);
  I.seeAttributesOnElements(
      `${task2}/../..`,
      { class: 'completed ember-view' },
      );
  I.see('1 item left');
});

Scenario('Switch tabs', (I) => {
  I.click(`${task2}/../input`);
  I.seeElement(`${taskList}${task1}`);
  I.seeElement(`${taskList}${task2}`);
  I.click('//a[@href="#/active"]');
  I.seeElement(`${taskList}${task1}`);
  I.dontSeeElement(`${taskList}${task2}`);
  I.click('//a[@href="#/completed"]');
  I.seeElement(`${taskList}${task2}`);
  I.dontSeeElement(`${taskList}${task1}`);
});

Scenario('Delete task', (I) => {
  I.moveCursorTo(`${task2}`);
  I.click(`${task2}/../*[@class="destroy"]`);
  I.seeElement(`${taskList}${task1}`);
  I.dontSeeElement(`${taskList}${task2}`);
  I.see('1 item left');
});

Scenario('Clear completed tasks', (I) => {
  I.click(`${task1}/../input`);
  I.click(`${task2}/../input`);
  I.click('#clear-completed');
  I.dontSeeElement('#main');
});

Scenario('Mark all tasks as completed', (I) => {
  I.click('#toggle-all');
  I.seeAttributesOnElements(
      `${task1}/../..`,
      { class: 'completed ember-view' },
      );
  I.seeAttributesOnElements(
      `${task2}/../..`,
      { class: 'completed ember-view' },
      );
  I.see('0 items left');
});
