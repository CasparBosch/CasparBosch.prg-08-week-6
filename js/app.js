import { DecisionTree } from "../libraries/decisiontree.js"
import { VegaTree } from "../libraries/vegatree.js"

//
// DATA
//
const csvFile = "./data/mushrooms.csv"
const trainingLabel = "class"  
const ignored = ["bruises"]  
let amountCorrect = 0;
let edibleAndEdible = 0;
let edibleAndUnedible = 0;
let unedibleAndEdible = 0;
let unedibleAndUnedible = 0;

//
// load csv data as json
//
function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => trainModel(results.data)//console.log(results.data),   // use this data to train the model
    })
}

//
// MACHINE LEARNING - Decision Tree
//
function trainModel(data) {
    // todo : split data in traindata and testdata
    data.sort(() => (Math.random() - 0.5))
    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8) + 1)

    // create algorithm
    let decisionTree = new DecisionTree({
        ignoredAttributes: ignored,
        trainingSet: trainData,
        categoryAttr: trainingLabel
    })

    // draw tree structure - DOM element, width, height, decision tree
    let json = decisionTree.toJSON()
    let visual = new VegaTree('#view', 2300, 1000, json)
    

    // todo : make a prediction with a sample from testdata

    for (let i = 0; i < testData.length; i++) {
    
        let mushroom = testData[i]
        // create copy of passenger, without label
        const mushroomNoLabel = Object.assign({}, mushroom)
        delete mushroomNoLabel.class
    
        // prediction
        let prediction = decisionTree.predict(mushroomNoLabel)
    
        // compare prediction with real label
        if (prediction == mushroom.class) {
            console.log("Deze voorspelling is goed gegaan!")
            amountCorrect = amountCorrect + 1;
        }
    
        if (prediction == "e" && mushroom.class == "e") {
            edibleAndEdible = edibleAndEdible + 1;
        }   else if (prediction == "e" && mushroom.class == "p") {
            edibleAndUnedible = edibleAndUnedible + 1;
        }   else if (prediction == "p" && mushroom.class == "p") {
            unedibleAndUnedible = unedibleAndUnedible + 1;
        }   else if (prediction == "p" && mushroom.class == "e") {
            unedibleAndEdible = unedibleAndEdible + 1;
        }

        

    }

let totalAmount = testData.length;
let accuracy = amountCorrect / totalAmount * 100;
document.getElementById('accuracy').innerHTML = "The accuracy is " + accuracy + "%";

var confusionTable = document.getElementById("confusion");
confusionTable.rows[1].cells[1].textContent = edibleAndEdible;
confusionTable.rows[1].cells[2].textContent = edibleAndUnedible;
confusionTable.rows[2].cells[1].textContent = unedibleAndEdible;
confusionTable.rows[2].cells[2].textContent = unedibleAndUnedible;

let jsons = decisionTree.stringify()
    console.log(jsons)
}   


loadData()