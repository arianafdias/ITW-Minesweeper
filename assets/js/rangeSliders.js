$(document).ready(function(){ 
    $(".drop-down-wrapper select").on("change",function(){
        var selVal = $(this).val();
        $("h2").html(selVal);
    });
});