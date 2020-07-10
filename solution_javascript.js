class EventSourcer {
  constructor() {
    // the value variable that will be modified on operations
    this.value = 0;

    // the values array to store the passes in values to add/subtract
    this.valuesStack = [];

    //the undoredoStack to track the undo and redo operations
    this.undoredoStack = [];
  }

  add(num) {
    this.valuesStack.push(num);
    this.value = this.value + num;
  }
  subtract(num) {
    this.valuesStack.push(-num);
    this.value = this.value - num;
  }
  undo() {
    if(this.valuesStack.length != 0) {
      this.undoredoStack.push(this.valuesStack.pop());
      this.value = this.value - this.undoredoStack[this.undoredoStack.length - 1];
    }
  }
  redo() {
    if(this.undoredoStack.length != 0) {
      this.valuesStack.push(this.undoredoStack.pop());
      this.value = this.value + this.valuesStack[this.valuesStack.length - 1];
    }
  }
  bulk_undo(steps) {
    while(this.valuesStack.length != 0 && steps > 0) {
      steps--;
      this.undoredoStack.push(this.valuesStack.pop());
      this.value = this.value - this.undoredoStack[this.undoredoStack.length - 1]
    }
  }
  bulk_redo(steps) {
    while(this.undoredoStack.length != 0 && steps > 0) {
      steps--;
      this.valuesStack.push(this.undoredoStack.pop());
      this.value = this.value + this.valuesStack[this.valuesStack.length - 1]
    }
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
