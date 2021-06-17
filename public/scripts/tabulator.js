

//create Tabulator on DOM element with id "quotr-table"
let table = new Tabulator("#quotr-table", {
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
        {formatter:"buttonCross", align:"center", title:"", width:20, headerSort:false, cellClick:function(e, cell){
            if(confirm('Are you sure you want to delete this entry?'))
                cell.getRow().delete();
            }
        }
    ],
    placeholder:"No Data Available", //display message to user on empty table
    cellEdited: function(cell){
        console.log("updating row")
        let newBoq = JSON.stringify(table.getData())
        console.log(newBoq)
        let url = "./update_boq?id=" + projectId
        $.ajax({
            type: 'POST',
            data: newBoq,
            contentType: 'application/json',
            url: url
          });
    }
});

//Add row on "Add Row" button click
document.getElementById("professional").addEventListener("click", function(){
    table.addRow({work_category: "Professional Services"}, false);
});
document.getElementById("hacking").addEventListener("click", function(){
    table.addRow({work_category: "Hacking and Removal"}, false);
});
document.getElementById("wet").addEventListener("click", function(){
    table.addRow({work_category: "Flooring / Wet Works"}, false);
});
document.getElementById("carpentry").addEventListener("click", function(){
    table.addRow({work_category: "Carpentry"}, false);
});
document.getElementById("glass").addEventListener("click", function(){
    table.addRow({work_category: "Glass Works"}, false);
});
document.getElementById("ceiling").addEventListener("click", function(){
    table.addRow({work_category: "Ceiling"}, false);
});
document.getElementById("door").addEventListener("click", function(){
    table.addRow({work_category: "Doors and windows"}, false);
});
document.getElementById("painting").addEventListener("click", function(){
    table.addRow({work_category: "Painting"}, false);
});
document.getElementById("electrical").addEventListener("click", function(){
    table.addRow({work_category: "Electrical"}, false);
});
document.getElementById("plumbing").addEventListener("click", function(){
    table.addRow({work_category: "Plumbing"}, false);
});
document.getElementById("misc").addEventListener("click", function(){
    table.addRow({work_category: "Miscellaneous"}, false);
});

// Callback to update mongoDB whenever row is updated
function updateRow () {

}
