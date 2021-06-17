

//create Tabulator on DOM element with id "quotr-table"
let table = new Tabulator("#cnstr-table", {
    height: '50%',
    data: boq, //assign data to table
    // layout:"fitColumns", //fit columns to width of table (optional)
    addRowPos:"bottom",
    groupBy:"work_category",
    layout:"fitColumns",
    
    columns:[
        {title:"Description", field:"work_description", formatter:"textarea", variableHeight:true, editor:"input"},
        {title:"Qty", field:"work_quantity", width:100, hozAlign:"center", sorter:"number", editor:"input"},
        {title:"Units", field:"work_unit",width:100, editor:"select", editorParams:{
            
            values:["sqm", "sqft","m", "ft", "nil"], //create list of values from all values contained in this column
            sortValuesList:"asc", //if creating a list of values from values:true then choose how it should be sorted
            defaultValue:"sqm", //set the value that should be selected by default if the cells value is undefined
            elementAttributes:{
                maxlength:"4", //set the maximum character length of the input element to 10 characters
            },
            verticalNavigation:"hybrid", //navigate to new row when at the top or bottom of the selection list
            multiselect:false, //allow multiple entries to be selected
        }},
        {title:"Rate", field:"work_rate", width:100, hozAlign:"center", sorter:"number", editor:"input"},
        {title:"Amount", field:"work_amount", width:100, hozAlign:"center", sorter:"number", editor:"input"},
    ],
    placeholder:"No Data Available", //display message to user on empty table
});

//Add row on "Add Row" button click
document.getElementById("submit").addEventListener("click", function(){
    let newBoq = JSON.stringify(table.getData())
        console.log(newBoq)
        let url = "./quote?id=" + projectId
        $.ajax({
            type: 'POST',
            data: newBoq,
            contentType: 'application/json',
            url: url,
            success: () => {
                window.location.href = '/dashboard'
            }
          });

       
});


