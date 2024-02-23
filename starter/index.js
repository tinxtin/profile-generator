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
                name: 'manager',
                message: 'Enter manager name:'
            },
            {
                type: 'input',
                name: 'id',
                message: 'Enter manager id:'
            },
            {
                type: 'input',
                name: 'email',
                message: 'Enter manager email:'
            },

        ]
    )
    .then((ans) => {
            inquirer
            .prompt(
                [
                    {
                        type: 'confirm',
                        name: 'extraEmployee',
                        message: 'Add additional employee?',
                    },
                ]
            )
            .then((ans) => {
                if (ans.extraEmployee === false) {
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
                        inquirer
                        .prompt(
                            [
                                {
                                    type: 'input',
                                    name: `${(ans.employeeTitle).toLowerCase()}Name`,
                                    message: `What's the ${(ans.employeeTitle).toLowerCase()} name?`
                                }
                            ]
                        )
                    })
                }
            })
    })
}

init();