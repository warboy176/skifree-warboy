class Input {
  constructor() {
    this.keys = new Set();
    this.pointer = false;
  }

  isPressed(key) {
    return this.keys.has(key);
  }
}

const input = new Input();
export default input;