const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");


const employees = [];

function startUp() {
    startHtml();
    addMember();
}

function addMember() {
  inquirer.prompt([{
    message: "Enter team member's name",
    name: "name",
    validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter name!');
          return false;
      }
    }
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
    name: "email",
    validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter valid email!');
          return false;
      }
    }
  }])
  .then(function({name, role, id, email}) {
      let roleInfo = "";
      if (role === "Manager") {
        roleInfo = "office phone number";
    } else if (role === "Engineer") {
        roleInfo = "GitHub username link";
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
        addHtml(newMember)
        .then(function() {
            if (moreMembers === "yes") {
                addMember();
            } else {
                finishHtml();
            }
        });

    });
    });
}

function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        
        <title>SPARTANS</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-primary mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center text-white">My Spartans</span>
        </nav>
        <div class="container pure-g">
            <div class="row">`;
    fs.writeFile("./dist/team-profile.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("Begin");
}

function addHtml(member) {
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Manager") {
            const officeNumber = member.getOfficeNumber();
            data = `<div class="col-6 pure-u-1 pure-u-md-1-3">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header bg-success text-white">${name}<br /><br />🧑‍💼Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">Office Phone: ${officeNumber}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3 pure-u-1 pure-u-md-1-3" style="width: 18rem">
            <h5 class="card-header bg-warning text-white">${name}<br /><br />👨‍💻Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">GitHub: <a href="${gitHub}">${gitHub}</a></li>
            </ul>
            </div>
        </div>`;
        } else {
            const school = member.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3 pure-u-1 pure-u-md-1-3" style="width: 18rem">
            <h5 class="card-header bg-warning text-white">${name}<br /><br />📚Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`
        }
        fs.appendFile("./dist/team-profile.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
            
        });
    });        
}

function finishHtml() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./dist/team-profile.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("Ready to go!!");
}

startUp(); 