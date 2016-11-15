
// String.prototype.trim = function () {
//     return this.replace(/^\s+|\s+$/g, '');
// };

var nodes = new vis.DataSet([
    { id: 0, group: 1, label: 'RenPlant', description: 'RenPlant generator.', inputtext: "", outputtext: "RenCandy" },
    { id: 4, group: 1, label: 'DiPlant', description: 'DiPlant generator.', inputtext: "", outputtext: "DiCandy" },
    { id: 5, group: 1, label: 'TianPlant', description: 'TianPlant generator.', inputtext: "", outputtext: "TianCandy" },

    { id: 1, group: 2, label: 'Pumpkat', description: 'Spring Animal. Easy to fetch. Economy Animal.', inputtext: "RenCandy", outputtext: "Pumpkin,Pumpkat Fur" },
    { id: 2, group: 2, label: 'Leafuki', description: 'Spring Animal.', inputtext: "RenCandy", outputtext: "Tanuki Leaf, Tanuki Fur" },
    { id: 3, group: 2, label: 'Ashpider', description: 'Sprint Animal. Huge booth generator.', inputtext: "DiCandy", outputtext: "Ash Fiber, Ash Crystal" },
    { id: 6, group: 2, label: 'Soliqurriel', description: 'Spring Animal.', inputtext: "DiCandy", outputtext: "Solid Fur, Earth Crystal" },
    { id: 7, group: 2, label: 'Luna Sparrow', description: 'Spring Animal.', inputtext: "TianCandy", outputtext: "Lunar Essence, Lunar Feather" },

    { id: 8, group: 3, label: 'RenCandy', description: 'Ren candy', inputtext: "", outputtext: "" },
    { id: 9, group: 3, label: 'DiCandy', description: 'Di candy', inputtext: "", outputtext: "" },
    { id: 10, group: 3, label: 'TianCandy', description: 'Tian candy', inputtext: "", outputtext: "" },

    { id: 11, group: 4, label: 'Alma', description: 'Mayor.' },

    { id: 12, group: 5, label: 'Library', description: 'Library in Town.', outputtext: "ResearchPoint" },

    { id: 13, group: 6, label: 'ResearchPoint', description: "Research Point" },
    { id: 14, group: 6, label: 'PumpkatZootechnologyLv1', description: "", inputtext: "ResearchPoint", outputtext: "Pumpkat" },
    { id: 15, group: 6, label: 'PumpkatZootechnologyLv2', description: "", inputtext: "ResearchPoint", outputtext: "Pumpkat" },
    { id: 16, group: 6, label: 'PumpkatEcologyLv1', description: "", inputtext: "ResearchPoint", outputtext: "Pumpkat" },
    { id: 17, group: 6, label: 'PumpkatEcologyLv2', description: "", inputtext: "ResearchPoint", outputtext: "Pumpkat" },

]);
var edges = new vis.DataSet();

function addnewedge(nodea, nodeb) {
    if (nodea == null)
        return;
    if (nodea.outputtext == null || nodea.outputtext == undefined) {
        nodea.outputtext = "";
    }
    if (nodeb == null)
        return;
    if (nodeb.inputtext == null || nodeb.inputtext == undefined) {
        nodeb.inputtext = "";
    }


    var fromNodeOutputArray = nodea.outputtext.trim().split(',');
    var toNodeInputArray = nodeb.inputtext.trim().split(',');
    for (var i = 0; i < toNodeInputArray.length; i++) {
        console.log("index -> " + i + " " + toNodeInputArray[i]);
    }

    for (var i = 0; i < fromNodeOutputArray.length; i++) {
        if (fromNodeOutputArray[i].toLowerCase() == nodeb.label.trim().toLowerCase() && fromNodeOutputArray[i] !== "") {
            console.log("equal!");
            try {
                edges.add({
                    from: nodea.id,
                    to: nodeb.id,
                    label: fromNodeOutputArray[i],
                    font: { size: 10, align: 'top' },
                    arrows: 'to',
                    length: 250
                });
            }
            catch (err) {
                alert(err);
            }
        }
    }
    for (var j = 0; j < toNodeInputArray.length; j++) {
        console.log(toNodeInputArray[j].toLowerCase() + " -> " + nodea.label.toLowerCase());
        if (toNodeInputArray[j].toLowerCase() == nodea.label.toLowerCase() && toNodeInputArray[j] !== "") {
            console.log("equal!");
            try {
                edges.add({
                    from: nodea.id,
                    to: nodeb.id,
                    label: nodea.label,
                    font: { size: 10, align: 'top' },
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

// nodes.update({id: 2, color:"lime", label:'Node 22222'});

// create an array with edges
// var edges = new vis.DataSet([
//     { from: 1, to: 3, length: 300 },
//     { from: 1, to: 2, length: 300 },
//     { from: 2, to: 4, length: 300 },
//     { from: 2, to: 5, length: 300 }
// ]);


// colorize

for (var i = 0; i < nodes.length; i++) {
    for (var j = 0; j < nodes.length; j++) {
        console.log("=======================================" + "\ni -> " + i + " j -> " + j);
        if (i != j)
            addnewedge(nodes.get(i), nodes.get(j));
    }
}

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