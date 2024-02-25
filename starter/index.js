const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
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
                name: 'name',
                message: 'Enter manager name:'
            },
            {
                type: 'number',
                name: 'id',
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
                name: 'email',
                message: 'Enter manager email:'
            },
            {
                type: 'number',
                name: 'officeNumber',
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
    .then((ansManager) => {
        const manager = new Manager(ansManager.name, ansManager.id, ansManager.mail, ansManager.officeNumber);

        (addEmployee = async () => {
            await inquirer
            .prompt(
                [
                    {
                        type: 'list',
                        name: 'extraEmployee',
                        message: 'Add additional employee?',
                        choices: ['Engineer', 'Intern', 'Finish team']
                    },
                ]
            )
            .then((ansExtra) => {
                if (ansExtra.extraEmployee === 'Finish team') {
                    return;
                } else {
                    const title = ansExtra.extraEmployee.toLowerCase();
                    inquirer
                    .prompt(
                        [
                            {
                                type: 'input',
                                name: `name`,
                                message: `What's the ${title} name?`
                            },
                            {
                                type: 'input',
                                name: `id`,
                                message: `What's the ${title} id?`
                            },
                            {
                                type: 'input',
                                name: `email`,
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
                    .then((ansEmployee) => {
                        if (ansExtra.extraEmployee === 'Engineer') {
                            const engineer = new Engineer(ansEmployee.name, ansEmployee.id, ansEmployee.email, ansEmployee.github)
                            console.log(engineer)
                        } else {
                            const intern = new Intern(ansEmployee.name, ansEmployee.id, ansEmployee.email, ansEmployee.school)
                            console.log(intern)
                        }
                        addEmployee();
                    })
                }
            })
        })();
    })
}

init();