const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptUser(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer.trim()); // Remove leading/trailing whitespace
    });
  });
}

async function main() {
  try {
    const text = await promptUser("Enter up to three characters: ");
    if (text.length > 3) {
      console.log("Text must be up to three characters.");
      rl.close();
      return;
    }

    const textColor = await promptUser("Enter text color (keyword or hexadecimal): ");

    const shapeOptions = ['circle', 'triangle', 'square'];
    console.log("Choose a shape: ");
    for (let i = 0; i < shapeOptions.length; i++) {
      console.log(`${i + 1}. ${shapeOptions[i]}`);
    }
    const shapeIndex = parseInt(await promptUser("Enter the number corresponding to the shape: "));
    if (isNaN(shapeIndex) || shapeIndex < 1 || shapeIndex > shapeOptions.length) {
      console.log("Invalid shape selection.");
      rl.close();
      return;
    }
    const shape = shapeOptions[shapeIndex - 1];

    const shapeColor = await promptUser("Enter shape color (keyword or hexadecimal): ");

    let svgContent = '';
    if (shape === 'circle') {
      svgContent = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="100" r="80" fill="${shapeColor}" />
          <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
        </svg>
      `;
    } else if (shape === 'triangle') {
      svgContent = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <polygon points="150,20 250,180 50,180" fill="${shapeColor}" />
          <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
        </svg>
      `;
    } else {
      svgContent = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${shapeColor}" />
          <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
        </svg>
      `;
    }

    fs.writeFileSync('logo.svg', svgContent);
    console.log("Generated logo.svg");
    rl.close();
  } catch (error) {
    console.error("An error occurred:", error);
    rl.close();
  }
}

main();
