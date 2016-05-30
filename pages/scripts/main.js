$(document).ready(function(){
    $.get("api/get", function(data){
        console.log(data);
        $("#tasks").text(JSON.stringify(data, null, 4));
    });
});
