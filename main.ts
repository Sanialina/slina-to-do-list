#! /usr/bin/env node


import inquirer from 'inquirer';

interface Task {
  name: string;
  completed: boolean;
}

const tasks: Task[] = [];

function displayTasks() {
  if (tasks.length === 0) {
    console.log("No tasks added yet!");
  } else {
    console.log("Tasks:");
    tasks.forEach((task, index) => console.log(`${index + 1}. [${task.completed ? 'X' : ' '}] ${task.name}`));
  }
}

function markTaskComplete() {
  inquirer.prompt([{ type: 'input', name: 'taskIndex', message: 'Enter task index:', validate: input => !isNaN(input) && input >= 1 && input <= tasks.length }])
    .then((answers: any) => {
      const index = parseInt(answers.taskIndex) - 1;
      tasks[index].completed = true;
      console.log('Task marked as complete.');
      mainLoop();
    });
}

function deleteTask() {
  inquirer.prompt([{ type: 'input', name: 'taskIndex', message: 'Enter task index:', validate: input => !isNaN(input) && input >= 1 && input <= tasks.length }])
    .then((answers: any) => {
      const index = parseInt(answers.taskIndex) - 1;
      tasks.splice(index, 1);
      console.log('Task deleted.');
      mainLoop();
    });
}

function mainLoop() {
  inquirer.prompt([{ type: 'list', name: 'action', message: 'Choose an action:', choices: ['Add a task', 'Display tasks', 'Mark a task as complete', 'Delete a task', 'Exit'] }])
    .then(({ action }) => {
      switch (action) {
        case 'Add a task':
          inquirer.prompt([{ type: 'input', name: 'taskName', message: 'Enter the name of the task:' }])
            .then(({ taskName }) => {
              tasks.push({ name: taskName, completed: false });
              console.log('Task added.');
              mainLoop();
            });
          break;
        case 'Display tasks':
          displayTasks();
          mainLoop();
          break;
        case 'Mark a task as complete':
          markTaskComplete(); 
          break;
        case 'Delete a task':
          deleteTask(); 
          break;
        case 'Exit':
          console.log('Exiting...');
          break;
      }
    });
}

console.log('Welcome to the To-Do List App!');
mainLoop();

