const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");


const employees = [];

function addMember() {
  inquirer.prompt([{
    message: "Enter team member's name",
    name: "name"
  },
  {
    type: "list",
    message: "Select team member's role",
    choices: [
      "Manager",
      "Engineer",
      "Intern"
      ],
    name: "role"
  },
  {
    message: "Enter team member's id",
    name: "id"
  },
  {
    message: "Enter team member's email address",
    name: "email"
  }])
  .then(function({name, role, id, email}) {
    let roleInfo = "";
      if (role === "Manager") {
        roleInfo = "office phone number";
      } else if (role === "Engineer") {
          roleInfo = "GitHub username";
      } else {
          roleInfo = "school name";
      }
    inquirer.prompt([{
        message: `Enter team member's ${roleInfo}`,
        name: "roleInfo"
      },
      {
        type: "list",
        message: "Would you like to add more team members?",
        choices: [
            "yes",
            "no"
        ],
        name: "moreMembers"
    }])
  .then(function({roleInfo, moreMembers}) {
      let newMember;
        if (role === "Manager") {
            newMember = new Manager(name, id, email, roleInfo);
        } else if (role === "Engineer") {
            newMember = new Engineer(name, id, email, roleInfo);
        } else {
            newMember = new Intern(name, id, email, roleInfo);
        }
        employees.push(newMember);
        console.log(employees);
        if (moreMembers === "yes") {
            addMember();
        }
        });
    });
}

addMember(); 