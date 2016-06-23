// Indented tree code taken from http://bl.ocks.org/mbostock/1093025

var margin = {top: 30, right: 20, bottom: 30, left: 20},
    width = 960 - margin.left - margin.right,
    barHeight = 30,
    barWidth = width * .3;

var duration = 400,
    root;

var tree = d3.layout.tree()
    .nodeSize([0, 20]);

// Replace the "children" method, because I like my data model
tree.children(function(d) {
    return d.SubTasks;
});

var svg = d3.select("#tasks").append("svg")
    .attr("width", width + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("/api/get", function(error, tasks) {
    if (error) throw error;
    var task = tasks[0];

    task.x0 = 0;
    task.y0 = 0;
    redraw(root = task);
});

function redraw(source) {
    var i=0;

    // Compute the flattened node list
    var nodes = tree.nodes(root);

    var height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);

    d3.select("svg").transition()
        .duration(duration)
        .attr("height", height);

    d3.select(self.frameElement).transition()
        .duration(duration)
        .style("height", height + "px");

    // Compute the "layout".
    nodes.forEach(function(n, i) {
        n.x = i * barHeight;
    });

    // Update the nodes…
    var node = svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .style("opacity", 1e-6);

    // Enter any new nodes at the parent's previous position.
    nodeEnter.append("rect")
        .attr("y", -barHeight / 2)
        .attr("height", barHeight)
        .attr("width", barWidth)
        .style("fill", color)
        .on("click", click);

    nodeEnter.append("text")
        .attr("dy", 3.5)
        .attr("dx", 5.5)
        .text(function(d) { return d.Title; });

    // Transition nodes to their new position.
    nodeEnter.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
        .style("opacity", 1);

    node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
        .style("opacity", 1)
        .select("rect")
        .style("fill", color);

    // Transition exiting nodes to the parent's new position.
    node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .style("opacity", 1e-6)
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

// Toggle SubTasks on click.
function click(d) {
    if (d.SubTasks) {
        d._SubTasks = d.SubTasks;
        d.SubTasks = null;
    } else {
        d.SubTasks = d._SubTasks;
        d._SubTasks = null;
    }
    redraw(d);
}

function color(d) {
    return HasHiddenSubTasks(d) ? "#49708A" : HasSubTasks(d) ? "#88ABC2" : "#EBF7F8";
}

function HasHiddenSubTasks(d) {
    return d._SubTasks && d._SubTasks.length > 0;
}

function HasSubTasks(d) {
    return d.SubTasks && d.SubTasks.length > 0;
}
