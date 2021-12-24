console.log("plots.js")

function InitDashboard() {

    console.log("initalizing dashboard");
    // attended Dom's tutorial for the homework 12/11/2021

    let selector = d3.select("#selDataset"); 
    //loop to populate the drop down of the names from the datafile
    d3.json("samples.json").then(data => {
    
        //console.log(data);
        let sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option")
            .text(sampleId)
            .property("value",sampleId);
        });

    let sampleId = sampleNames[0];
    
    optionChanged(sampleId);
    });

}


function optionChanged(id) {

    console.log(id);

    //populate the demographic info

    populateDemographics(id);

    // draw the bar chart 

    drawBarChart(id);

    // draw the bubble chart 

    drawBubbleChart(id);


}

function drawBarChart (sampleId) {

    //console.log("The value for id is " + sampleId); 

    d3.json("samples.json").then(data => {

        let samples = data.samples; 
        let resultArray = samples.filter(s => s.id === sampleId); 
        let result = resultArray[0];
        console.log(result);

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
        let yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}` ).reverse();
        

        let barData = [{
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"

        }]

        let barLayout =  {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}

        }

        Plotly.newPlot("bar", barData, barLayout); 

    });
}


function populateDemographics (sampleId) {

    console.log(`populateDemographics`);
    // d3.json("samples.json").then(data => {

    //     let samples = data.samples; 
    //     let resultArray = samples.filter(s => s.id === sampleId); 
    //     let result = resultArray[0];
    //     console.log(result);

    //     let otu_ids = result.otu_ids;
    //     let otu_labels = result.otu_labels;
    //     let sample_values = result.sample_values;
    //     let yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}` );
        

    //     let barData = [{
    //         x: sample_values.slice(0,10),
    //         y: yticks,
    //         type: "bar",
    //         text: otu_labels.slice(0,10),
    //         orientation: "h"

    //     }]

    //     Plotly.newPlot("bar", barData); 

    // });


}


function drawBubbleChart (sampleId) {

    console.log(`drawBubbleChart`);
}


// Call the function to initialize the dashboard, 
//  populate the dropdown and select the first item to view 

InitDashboard();
