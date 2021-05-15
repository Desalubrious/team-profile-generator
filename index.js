// Required packages, as well as imported functions.
const inquirer = require('inquirer');
const fs = require('fs');
const Engineer = require('./lib/engineer.js');
const Employee = require('./lib/employee.js');
const Intern = require('./lib/intern.js');
const Manager = require('./lib/manager.js');
const { start } = require('repl');

// Empty array of employees, to be filled via inquirer.
const employees = [];

// Init starts the application.
function init() {
    genHtml();
    addEmployee();
}

function addEmployee() {
    inquirer.prompt([{
        message: "Enter team member's name:",
        name: "name"
    },
    {
        type: "list",
        message: "Select team member's role:",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        name: "role"
    },
    {
        message: "Enter team member's id:",
        name: "id"
    },
    {
        message: "Enter team member's email address:",
        name: "email"
    }])
        .then(function ({ name, role, id, email }) {
            let roleInfo = "";
            if (role === "Engineer") {
                roleInfo = "GitHub username:";
            } else if (role === "Intern") {
                roleInfo = "School name:";
            } else {
                roleInfo = "Office number:";
            }
            inquirer.prompt([{
                message: `Enter team member's ${roleInfo}`,
                name: "roleInfo"
            },
            {
                type: "list",
                message: "Would you like to add more team members?",
                choices: [
                    "Yes",
                    "No"
                ],
                name: "moreMembers"
            }])
                .then(function ({ roleInfo, moreMembers }) {
                    let newMember;
                    if (role === "Engineer") {
                        newMember = new Engineer(name, id, email, roleInfo);
                    } else if (role === "Intern") {
                        newMember = new Intern(name, id, email, roleInfo);
                    } else {
                        newMember = new Manager(name, id, email, roleInfo);
                    }
                    employees.push(newMember);
                    addHtml(newMember)
                        .then(function () {
                            if (moreMembers === "Yes") {
                                addEmployee();
                            } else {
                                endHtml();
                            }
                        });

                });
        });
}


// Creates the basic HTML headers, etc.
function genHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-primary mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./dist/output.html", html, function (err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("Team Generator 9000");
}


// Adds HTML For each member
function addHtml(member) {
    return new Promise(function (resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header bg-primary text-light">${name}<br /><br />&#x1F6E0; Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${email}"> ${email}</a></li>
                <li class="list-group-item">GitHub: <a href = "https://www.github.com/${gitHub}"target="_blank">${gitHub}</a></li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header bg-primary text-light">${name}<br /><br />&#x270D; Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${email}"> ${email}</a></li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } else {
            const officeNumber = member.getOfficeNumber();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header bg-primary text-light">${name}<br /><br />&#x2615; Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${email}"> ${email}</a></li>
                <li class="list-group-item">Office Number: ${officeNumber}</li>
            </ul>
            </div>
        </div>`
        }
        fs.appendFile("./dist/output.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}


// Finishes the end of the HTML.
function endHtml() {
    const html = ` </div>
        </div>
        
    </body>
    </html>`;

    fs.appendFile("./dist/output.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("Creating HTML. File located at ./dist/output.html");
}


init();
