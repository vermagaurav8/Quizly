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
  const rainbowTitle = chalkAnimation.rainbow("Who wants to be a Java Fox? \n");

  await sleep();
  rainbowTitle.stop();

  console.log(`
        ${chalk.bgBlue("HOW TO PLAY")}
        I am a process on your computer.
        If you get any question wrong I will be ${chalk.bgRed("Killed")}
        So get all the questions right...
    `);
}

await welcome();
await getName();
await question1();
winner();

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

async function question1() {
  const answers = await inquirer.prompt({
    name: "question1",
    type: "list",
    message: "Java was released on\n",
    choices: ["Jan 23, 1996", "Jan 24, 1996", "Jan 27, 1996", "Jan 25, 1996"],
  });

  return handleAnswer(answers.question1 == "Jan 24, 1996");
}

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

function winner() {
  console.clear();
  const msg = `Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}
