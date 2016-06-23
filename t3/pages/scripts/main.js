$(document).ready(function(){
    $.get("/api/get", function(data){
        $("#tasks").text(JSON.stringify(data, null, 4));
    });
});
