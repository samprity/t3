'use strict';

// The class Task
// id : identifier of the task
// done : true iff the task has been completed
// children : a list of Task which are children of the Task being created

var Task = function(id, done, children) {
    this.Id = id;
    this.Done = done;
    this.SubTasks = children===undefined ? [] : children;

    this.AddTask = function(task) {
        this.SubTasks.push(task);
    }
};

module.exports.Task = function(){
    return Task;
}
