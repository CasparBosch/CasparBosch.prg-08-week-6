// import deecision tree
import { DecisionTree } from "./libraries/decisiontree.js"

// load model
function loadSavedModel() {
    fetch("./model.json")
        .then((response) => response.json())
        .then((model) => modelLoaded(model))
}

function modelLoaded(model) {
    // define features
    let decisionTree = new DecisionTree(model)
    let capshape = document.getElementById('capShape')
    let capsurface = document.getElementById('capSurface')
    let capcolor = document.getElementById('capColor')
    let odor = document.getElementById('odor')
    let gillattachment = document.getElementById('gillAttachment')
    let gillspacing = document.getElementById('gillSpacing')
    let gillsize = document.getElementById('gillSize')
    let gillcolor = document.getElementById('gillColor')

    // test to see if the model works
    let mushroom = { Capshape: capshape, Capsurface: capsurface, Capcolor: capcolor, Odor: odor, Gillattachment: gillattachment, Gillspacing: gillspacing, Gillsize: gillsize, Gillcolor: gillcolor}
    let prediction = decisionTree.predict(mushroom)
    console.log("predicted " + prediction)
    if (prediction == "p") {
    document.getElementById("prediction").innerHTML = "This mushroom is poisonous."
    } else if (prediction == "e") {
    document.getElementById("prediction").innerHTML = "This mushroom is edible."
    }
}

loadSavedModel();