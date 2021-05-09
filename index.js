const inq = require('inquirer');
const fs = require('fs');

function generateREADME(response) {
    var weblink = (response.link.length > 0);
    var inst = (response.install.length > 0);
    var features = (response.features.length > 0);
    var tests = (response.tests.length > 0);
    var credit = (response.credit.length > 0);
    var contr = (response.contribute.length > 0);
    var license = (response.license.length > 0);
    var str = `# ${response.name}

`;
    if (weblink) {
        str += `## Link to Access
* [${response.name} Live Webpage](${response.link})

`;
    }
// Table of contents printed here:
    str += `## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
`;
if (features) {
    str += `* [Features](#features)
`;
}
if (tests) {
    str += `* [Tests](#tests)
`;
}
if (credit) {
    str += `* [Credit](#credit)
`;
}
str += `* [Contributions](#contributions)
* [License](#license)
* [Questions](#questions)

`;
// End Table Of Contents

    str += `## Description
${response.summary}

`;
    if (inst) {
        str += `## Installation
${response.install}

`;
    }
    else {
        str += `## Installation
This project requires no installations to use.

`
    }
    str += `## Usage
${response.usage}

`;
    if (features) {
str += `## Features
${response.features}

`;
    }
    if (tests) {
        str += `## Tests
${response.tests}

`;
    }
    if (credit) {
        str += `## Credit
${response.credit}

`;
    }
    if (contr) {
        str += `## Contributions
${response.contribute}

`;
    }
    else {
        str += `## Contributions
This project is not accepting contributions.

`;
    }
    if (license) {
        str += `## License
This project uses the ${response.license} License.

`;
    }
    else {
        str += `## License
This project does not currently use any license.

`;
    }
    str += `## Questions
* If you have any quesions or concerns about this project, contact me at [${response.email}](mailto:${response.email}).
* Visit my [GitHub page](https://github.com/${response.github}) to see more of my work.
`;
    return str;
}

inq.prompt([
    {
        type: 'input',
        message: 'What is the name of your project?',
        name: 'name',
        validate: name => {
            return (name.length != 0) || "This field is required.";
        }
    },
    {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'github',
        validate: github => {
            return (github.length != 0) || "This field is required.";
        }
    },
    {
        type: 'input',
        message: 'If the project is deployed on the Internet, paste its link here. If not, press ENTER.',
        name: 'link',
    },
    {
        type: 'input',
        message: 'Write a brief summary describing the function and purpose of your project.',
        name: 'summary',
        validate: summary => {
            return (summary.length >= 50) || "Your summary should be a few sentences long (minimum is 50 characters).";
        }
    },
    {
        type: 'input',
        message: 'What steps need to be taken to install your project and its dependencies? If your project does not require any installation to use, press ENTER.',
        name: 'install',
    },
    {
        type: 'input',
        message: 'Provide instructions for how to use your project here.',
        name: 'usage',
        validate: usage => {
            return (usage.length != 0) || "This field is required.";
        }
    },
    {
        type: 'input',
        message: 'If you would like to discuss any features in better detail, do so here. If not, press ENTER.',
        name: 'features',
    },
    {
        type: 'input',
        message: 'If you have created any tests for your project, provide instructions on how to run them here. If not, press ENTER.',
        name: 'tests',
    },
    {
        type: 'input',
        message: 'Give credit to your resources / fellow collaborators here. If this is an independent project, press ENTER.',
        name: 'credit',
    },
    {
        type: 'input',
        message: 'Explain how people can contribute to your project. If this project is not open to contributions, press ENTER.',
        name: 'contribute',
    },
    {
        type: 'input',
        message: 'State the type of license your project uses (ex. MIT, GNU GPLv3). If you are not using a license, press ENTER.',
        name: 'license',
    },
    {
        type: 'input',
        message: 'Which email address should people use to contact you with issues?',
        name: 'email',
        validate: email => {
            return (email.length > 4 && email.includes('@') && email.includes('.')) || "Please enter a proper email address.";
        }
    },
]).then((response) =>
    fs.writeFile(`README-NEW.md`, generateREADME(response), (err) =>
        err ? console.log("Error creating file! Try again.") : console.log(`File created! Look over your new README-NEW.md file and make sure you've included everything you need.`))
    );