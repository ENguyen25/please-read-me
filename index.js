const inquirer = require('inquirer');
const fs = require('fs');

inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is the title of your project?',
      name: 'title',
    },
    {
      type: 'input',
      message: 'What was your motivation for this project?',
      name: 'motivation',
    },
    {
      type: 'input',
      message: 'Why did you build this project?',
      name: 'intention',
    },
    {
      type: 'input',
      message: 'What problem does it solve?',
      name: 'problem',
    },
    {
      type: 'input',
      message: 'What did you learn?',
      name: 'learning',
    },
    {
      type: 'input',
      message: 'What makes your project stand out?',
      name: 'project',
    },
    {
      type: 'confirm',
      message: 'Do you need a table of contents?',
      name: 'tableOfContents',
    },
    {
      type: 'input',
      message: 'What are the steps required to install your project?',
      name: 'installationsteps',
      loop: true,
    },
    {
      type: 'input',
      message: "Insert your screenshot or video files. If there are no more, type 'Done'.",
      name: 'files',
    },
    {
      type: 'input',
      message: "List your collaborators, if any. When you are done, type 'Done'",
      name: 'project',
    },
  ])
  .then((data) => {
    fs.writeFile('README.md', `# ${data.title}\n \n`, (err) =>
      err ? console.log(err) : console.log('Success!')
    );

    fs.appendFile('README.md', `## Description\n${data.motivation} ${data.intention} ${data.problem}\n${data.learning} ${data.project}\n \n`, (err) =>
      err ? console.error(err) : null
    );
    
    if (data.tableOfContents) {
        fs.appendFile('README.md', 'list of stuff', (err) =>
          err ? console.error(err) : null
        );
    }

    fs.appendFile('README.md', `    ![Screenshot](${data.files})`, (err) =>
          err ? console.error(err) : null
        );
  });

