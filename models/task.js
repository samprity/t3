'use strict';

// The class Task
// id : identifier of the task
// done : true iff the task has been completed
var Task = function(id, done) {
    this.id=id;
    this.done=done;
};

module.exports.Task = function(){
    return Task;
}
