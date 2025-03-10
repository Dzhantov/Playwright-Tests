const {test, expect} = require('@playwright/test');

//verify user can add task
test('user can add task', async({page}) => {
    //arrange
    await page.goto('http://localhost:8080');

    //act
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    //assert
    const taskText = await page.textContent('.task');
    expect (taskText).toContain('Test Task');
});

test('verify user can delete tasks', async({page})=>{
    //arrange
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    //act
    await page.click('.task .delete-task');

    //assert
    const tasks = await page.$$eval('.task', tasks => tasks.map(
        task => task.textContent
    ));
    expect(tasks).not.toContain('Test Task');
});

test('verify user can mark task as complete', async({page})=>{
    //arrange
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    //act
    await page.click('.task .task-complete');

    //assert
    const completedTask = await page.$('.task.completed');
    expect(completedTask).not.toBeNull();
});

test('verify user can filter tasks', async({page})=>{
    //arrange
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task .task-complete');

    //act
    await page.selectOption('#filter', 'Completed')

    //assert
    const incompleteTasks = await page.$('.task:not(.completed)');
    expect(incompleteTasks).toBeNull();   
});

