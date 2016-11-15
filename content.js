
var nodes = new vis.DataSet([
    { id: 1, label: 'Node 1' },
    { id: 2, label: 'Node 2' },
    { id: 3, label: 'Node 3' },
    { id: 4, label: 'Node 4' },
    { id: 5, label: 'Node 5' }
]);

nodes.forEach(
    function(element){
        // console.log(element);
        // console.log(element.label.indexOf('Node'));
        if (element.label.indexOf("Node") >= 0) {
            console.log(element.label.indexOf("Node"));
            nodes.update({id:element.id, label:element.label+"123", color:"lime"});
        }
    });
// nodes.update({id: 2, color:"lime", label:'Node 22222'});

// create an array with edges
var edges = new vis.DataSet([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 }
]);

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {};

// initialize your network!
var network = new vis.Network(container, data, options);