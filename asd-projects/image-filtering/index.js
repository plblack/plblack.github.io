// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    applyFilter();
    var rgbString = [150, 155, 155];
    function arrayToString(array){
        for (var i =0; i < array.length; i++){
            str += array[i]
        }
        return str;
        }
    var rgbNumbers = rgbStringToArray(rgbString);
    rgbString = rgbArrayToString(rgbNumbers);
    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1 & 3: Create the applyFilter function here
function applyFilter(array){

};
// TODO 5: Create the applyFilterNoBackground function


// TODO 2 & 4: Create filter functions


// CHALLENGE code goes below here