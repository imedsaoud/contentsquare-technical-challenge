class Mower {
  constructor(lawn, x, y, direction) {
    this.directions = ['N', 'E', 'S', 'W'];
    this.lawn = lawn;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.initMower();
  }

  initMower() {
    // Check if value exist and pick index
    this.direction = this.directions.indexOf(this.direction);

    if (!this.isValidPosition(this.x, this.y)) {
      throw new Error('Initial position have to be in the lawn');
    }

    if (this.direction === -1) {
      throw new Error('directions error  should be : N or E or S or W');
    }
  }

  move(instruction) {
    switch (instruction) {
      case 'L':
        this.direction = 
          (this.direction + this.directions.length - 1) %
          this.directions.length;
        break;
      case 'R':
        this.direction = (this.direction + 1) % this.directions.length;
        break;
      case 'F':
        this.moveForward();
        break;
      default:
        throw new Error(`Unknown instruction: ${instruction}`);
    }
  }

  moveForward() {
    var x = this.x;
    var y = this.y;

    switch (this.direction) {
      case 0: // North
        y++;
        break;
      case 1: // East
        x++;
        break;
      case 2: // South
        y--;
        break;
      case 3: // West
        x--;
        break;
    }

    if (this.isValidPosition(x, y)) {
      this.x = x;
      this.y = y;
    }
  }

  /**
   * Check if mower's x & y are superior to 0 & check if x & y are in the lawn
   */
  isValidPosition(x, y) {
    return x >= 0 && y >= 0 && x <= this.lawn.width && y <= this.lawn.height;
  }

  getPosition() {
    return `${this.x} ${this.y} ${this.directions[this.direction]}`;
  }
}

module.exports = Mower;
