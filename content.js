
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
};

var nodes = new vis.DataSet([
    { id: 0, label: 'Node 1', description: 'Nobody loves me.', inputtext: "air, sunlight", outputtext: "food" },
    { id: 1, label: 'Node 2', description: 'Nobody loves me.', inputtext: "food" },
    { id: 2, label: 'Node 3' },
    { id: 3, label: 'Node 4' },
    { id: 4, label: 'Node 5' }
]);
var edges = new vis.DataSet();

function addnewedge(nodea, nodeb) {
    if (nodea == null)
        return;
    if (nodea.outputtext == null || nodea.outputtext == undefined || nodea.outputtext == '') {
        return;
    }
    if (nodeb == null)
        return;
    if (nodeb.inputtext == null || nodea.inputtext == undefined || nodea.inputtext == '') {
        return;
    }
    var fromNodeOutputArray = nodea.outputtext.trim().split(',');
    var toNodeInputArray = nodeb.inputtext.trim().split(',');
    
    for (var i = 0; i < fromNodeOutputArray.length; i++) {
        for (var j = 0; j < toNodeInputArray.length; j++) {
            console.log("output -> " + fromNodeOutputArray[i] + " input -> " + toNodeInputArray[j]);
            if (fromNodeOutputArray[i].toLowerCase() == toNodeInputArray[j].toLowerCase()) {
                console.log("equal!");
                try {
                    
                    edges.add({
                        from: nodea.id,
                        to: nodeb.id,
                        label: fromNodeOutputArray[i],
                        font: { size: 15, align: 'top' },
                        arrows: 'to',
                        length: 200
                    });
                }
                catch (err) {
                    alert(err);
                }
            }
        }
    }

}

// nodes.update({id: 2, color:"lime", label:'Node 22222'});

// create an array with edges
// var edges = new vis.DataSet([
//     { from: 1, to: 3, length: 300 },
//     { from: 1, to: 2, length: 300 },
//     { from: 2, to: 4, length: 300 },
//     { from: 2, to: 5, length: 300 }
// ]);


// colorize
nodes.forEach(
    function (element) {
        element.label += "\n";
        element.label += "\n" + element.description + "\n";
        if (element.inputtext !== null && element.inputtext !== undefined && element.inputtext !== '') {
            element.inputtext = element.inputtext.trim();
            var textarray = element.inputtext.split(',');
            for (var i = 0; i < textarray.length; i++) {
                element.label += "\nInput[" + i + "] -> " + textarray[i];
            }
            element.label += "\n";
        }
        if (element.outputtext !== null && element.outputtext !== undefined && element.outputtext !== '') {
            element.outputtext = element.outputtext.trim();
            textarray = element.outputtext.split(',');
            for (var i = 0; i < textarray.length; i++) {
                element.label += "\nOutput[" + i + "] -> " + textarray[i];
            }
            // console.log(element);
            // console.log(element.label.indexOf('Node'));
        }
        nodes.update({ id: element.id, label: element.label, font: { size: 10, align: 'left' }, shape: 'box' });
    });

for (var i = 0; i < nodes.length; i++) {
    for (var j = 0; j < nodes.length; j++) {
        console.log("=======================================" + "\ni -> " + i + " j -> " + j);
        if (i != j)
            addnewedge(nodes.get(i), nodes.get(j));
    }
}
// edges.forEach(
//     function (element){
//         edges.update({from: element.from, to: element.to, length:500});
//     });

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