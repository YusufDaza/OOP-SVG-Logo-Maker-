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
    console.log("Text entered:", text); // Debugging statement

    if (text.length > 3) {
      console.log("Text must be up to three characters.");
      rl.close();
      return;
    }

    const textColor = await promptUser("Enter text color (keyword or hexadecimal): ");
    console.log("Text color entered:", textColor); // Debugging statement

    const shape = await promptUser("Choose a shape (circle, triangle, square): ");
    console.log("Shape chosen:", shape); // Debugging statement

    const shapeColor = await promptUser("Enter shape color (keyword or hexadecimal): ");
    console.log("Shape color entered:", shapeColor); // Debugging statement

    const svgContent = `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${shapeColor}" />
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
      </svg>
    `;
    console.log("SVG content:", svgContent); // Debugging statement

    fs.writeFileSync('logo.svg', svgContent);
    console.log("Generated logo.svg");
    rl.close();
  } catch (error) {
    console.error("An error occurred:", error);
    rl.close();
  }
}

main();
