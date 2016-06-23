'use strict';

var Task = require('../models/task.js').Task();

module.exports.GetTasks = function(){
    var tasks = [
        new Task(0, "Read David & Barber", false),
        new Task(9, "Watch House MD", false),
    ];

    tasks[0].AddTask(new Task(2, "Prob. theory", true));
    tasks[0].AddTask(new Task(5, "ML", false, [
        new Task(6, "Classification parts", false),
        new Task(9, "Regression parts", false)
    ]));
    tasks[0].AddTask(new Task(7, "Linear algebra", true, [
        new Task(8, "Duality theorem", true)
    ]));

    return tasks;
}
