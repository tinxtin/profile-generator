// const Manager = require("./lib/Manager");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

function init() {
    inquirer
    .prompt(
        [
            {
                type: 'input',
                name: 'managerName',
                message: 'Enter manager name:'
            },
            {
                type: 'number',
                name: 'managerId',
                message: 'Enter manager id:',
                validate: (input) => {
                    if (isNaN(input)) {
                        return 'Not a number, please re-enter!'
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'managerEmail',
                message: 'Enter manager email:'
            },
            {
                type: 'number',
                name: 'managerOfficeNumber',
                message: 'Enter manager office number:',
                validate: (input) => {
                    if (isNaN(input)) {
                        return 'Not a number, please re-enter!'
                    }
                    return true;
                }
            },

        ]
    )
    .then((ans) => {



        (addEmployee = async () => {
            await inquirer
            .prompt(
                [
                    {
                        type: 'list',
                        name: 'extraEmployee',
                        message: 'Add additional employee?',
                        choices: ['Yes', 'No']
                    },
                ]
            )
            .then((ans) => {
                if (ans.extraEmployee === 'No') {
                    return;
                } else {
                    inquirer
                    .prompt(
                        [
                            {
                                type: 'list',
                                name: 'employeeTitle',
                                message: `What's the employee's title?`,
                                choices: ['Engineer', 'Intern']
                            }
                        ]
                    )
                    .then((ans) => {
                        const title = ans.employeeTitle.toLowerCase();
                        inquirer
                        .prompt(
                            [
                                {
                                    type: 'input',
                                    name: `${title}Name`,
                                    message: `What's the ${title} name?`
                                },
                                {
                                    type: 'input',
                                    name: `${title}Id`,
                                    message: `What's the ${title} id?`
                                },
                                {
                                    type: 'input',
                                    name: `${title}Name`,
                                    message: `What's the ${title} email?`
                                },
                                {
                                    type: 'input',
                                    name: 'github',
                                    message: `What's the ${title} github?`,
                                    when: () => {
                                        if (title === 'engineer') {
                                            return true;
                                        }
                                    }
                                },
                                {
                                    type: 'input',
                                    name: 'school',
                                    message: `What school did the ${title} attend?`,
                                    when: () => {
                                        if (title === 'intern') {
                                            return true;
                                        }
                                    }
                                }
                            ]
                        )
                        .then(() => {
                            addEmployee();
                        })
                    })
                }
            })
        })();
    })
}

init();