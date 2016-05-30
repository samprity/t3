'use strict';

var Task = require('../models/task.js').Task();

module.exports.GetTasks = function(){
    var tasks = [];
    for(var i=0;i<3;i++){
        tasks.push(new Task(i,false));
    }
    return tasks;
}
