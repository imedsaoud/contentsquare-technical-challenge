const fs = require('fs');
const Lawn = require('./component/lawn');
const Mower = require('./component/mower');

function main() {
  // Path of the input file of the mower
  let path = 'data/instructions.txt';

  // Init data from instructions file
  let data;

  try {
    data = fs.readFileSync('data/instructions.txt', { encoding: 'utf8' });
  } catch (e) {
    console.error(`Cannot read the file ${path} - error: ${e.message}`);
    process.exit(1);
  }

  // Init configuration from instructions file
  let configuration;

  try {
    // Parse input file to get configuration
    configuration = configurationParser(data);

    // Create new Lawn instance
    let lawn = new Lawn(configuration.lawn.width, configuration.lawn.height);

    // Create new Mower instance then execute mower's instructions
    configuration.mowers.forEach(function (mowerInstruction) {
      // Init mower position
      var initialPosition = mowerInstruction.init;

      // Create new instance of the mower
      var mower = new Mower(lawn, initialPosition.x, initialPosition.y, initialPosition.directions);

      // Move the mower
      mowerInstruction.instructions.forEach(function (instruction) {
        mower.move(instruction);
      });

      /* print the final position of this mower */
      console.log(mower.getPosition());
    });
  } catch (e) {
    console.error(e.message);
  }
}

/**
 * Parse configuration intructions from input configuration text for lawn & mowers
 * @param text - input configuration text
 * @returns lawn & mowers configuration
 */
function configurationParser(input) {
  // remove empty lines from text
  let cleanText = input.replace(/^\s*\n/gm, '');
  // remove start and end empty lines
  cleanText = cleanText.replace(/^\n|\n\s*$/g, '');
  // split each line of the instruction input
  let configlines = cleanText.split('\n');
  // Retrieve lawn line in new array
  let lawnLine = configlines.shift();

  var lawn = lawnParser(lawnLine);
  var mowers = mowersParser(configlines);

  return {
    lawn: lawn,
    mowers: mowers,
  };
}

/**
 * Parse lawn line to get  width and height
 * @param lawnConfig - lawn line dimension
 * @returns lawn's width and height
 */
function lawnParser(lawnConfig) {
  let parsedLine = lawnConfig.split(' ');
  let width = parseInt(parsedLine[0]);
  let height = parseInt(parsedLine[1]);
  return {
    width: width,
    height: height,
  };
}

/**
 * Init  position, direction & give all instructions for each mowers
 * @param lines
 * @returns
 */
function mowersParser(lines) {
  let mowers = [];
  let mower = {};
  let index = 0;

  // To improve
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (index === 0) {
      let initLine = line.split(' ');
      mower.init = { x: initLine[0], y: initLine[1], directions: initLine[2] };
      index += 1;
    } else {
      mower.instructions = [];
      let instructions = line.split('');
      instructions.forEach((instruction) => {
        mower.instructions.push(instruction);
      });

      mowers.push(mower);
      mower = {};
      index = 0;
    }
  }
  return mowers;
}

main();
