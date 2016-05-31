'use strict';

var Task = require('../models/task.js').Task();

module.exports.GetTasks = function(){
    var tasks = [
        new Task(0,false),
        new Task(1,true, [
            new Task(3,false)
        ])
    ];

    tasks[0].AddTask(new Task(2,true));
    tasks[0].AddTask(new Task(5,true));
    tasks[1].SubTasks[0].AddTask(new Task(4,true));

    return tasks;
}
