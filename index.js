#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import gradient from "gradient-string";

let playerName;

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("Are you a Java Master? \n");

  await sleep();
  rainbowTitle.stop();

  console.log(`
        ${chalk.bgBlue("HOW TO PLAY")}
        I am a process on your computer.
        If you get any question wrong I will be ${chalk.bgRed("Killed")}
        So get all the questions right...
    `);
}

// Get name of the player from cli
async function getName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

//Question Section

async function question1() {
  const answers = await inquirer.prompt({
    name: "question1",
    type: "list",
    message: "Java was released on\n",
    choices: ["Jan 23, 1996", "Jan 24, 1996", "Jan 27, 1996", "Jan 25, 1996"],
  });

  return handleAnswer(answers.question1 == "Jan 24, 1996");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question2",
    type: "list",
    message: "Where an object of a class get stored?\n",
    choices: ["Heap", "Stack", "Disk", "File"],
  });

  return handleAnswer(answers.question2 == "Heap");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question3",
    type: "list",
    message: "Garbage collection in Java is\n",
    choices: [
      "Unused package in a program automatically gets deleted.",
      "Memory occupied by objects with no reference is automatically reclaimed for deletion.",
      "Java deletes all unused java files on the system.",
      "The JVM cleans output of Java program.",
    ],
  });

  return handleAnswer(
    answers.question3 ==
      "Memory occupied by objects with no reference is automatically reclaimed for deletion."
  );
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question4",
    type: "list",
    message: "Which one is reference type?\n",
    choices: ["Int", "Float", "Double", "Class"],
  });

  return handleAnswer(answers.question4 == "Class");
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question5",
    type: "list",
    message: "Byte code is\n",
    choices: [
      "Machine Dependent",
      "Machine Instruction",
      "Machine Independent",
      "None of the above",
    ],
  });

  return handleAnswer(answers.question5 == "Machine Independent");
}

// Answer Handling Function
async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking Answers...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Nice Work ${playerName}. That's a legit answer`,
    });
  } else {
    spinner.error({
      text: `💀 💀 💀 Game over, you lose ${playerName}!`,
    });
    process.exit(1);
  }
}

// Winner Case Handling
function winner() {
  console.clear();
  const msg = `Congrats , ${playerName} !\n You're the Java Meister`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

// Function Calls
await welcome();
await getName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
