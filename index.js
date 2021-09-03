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
      type: 'input',
      message: 'What is your table of contents? (Type NA if you do not want a table of contents; otherwise separate each item with a comma)',
      name: 'confirmTable',
    },
    {
      type: 'input',
      message: 'What are the steps required to install your project? (Separate each step with a comma)',
      name: 'installationSteps',
    },
    {
      type: 'input',
      message: "Insert your screenshot or video files. (Separate each file with a comma)",
      name: 'files',
    },
    {
      type: 'input',
      message: "List your collaborators, if any. (Separate each collaborator with a comma)",
      name: 'credits',
    },
    {
      type: 'input',
      message: 'What year was your project made?',
      name: 'year',
    },
    {
      type: 'input',
      message: 'What is your full name?',
      name: 'fullName',
    },
  ])
  .then((data) => {
    const tableContents = data.confirmTable.split(",").map(item => item).join("\n");
    const tableOfContents = `## Table of Contents\n${tableContents}`
    const steps = data.installationSteps.split(',').map(item => item).join("\n");
    const usageFiles = data.files.split(',');
    console.log(usageFiles)
    const listOfFiles = (screenshot) => {
      let newArray = [];
      for (let i = 0; i < screenshot.length; i++) {
        newArray.push('![Screenshot](' + screenshot[i] + ')')
      }
      return newArray.join('\n')
    }
    const collaborators = data.credits.split(',').map(item => item).join("\n");

    const content = `# ${data.title}

## Description
${data.motivation} ${data.intention} ${data.problem} 

${data.learning} ${data.project}

${data.confirmTable !== 'NA' ? tableOfContents : ''}

## Usage
${steps}
${listOfFiles(usageFiles)}

## Credits
${collaborators}

## License
MIT License

Copyright (c) [${data.year}] [${data.fullName}]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`

    fs.writeFile('README.md', content, (err) =>
      err ? console.log(err) : console.log('Success!')
    );

  });