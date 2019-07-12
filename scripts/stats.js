function newMatchRow(data){
    //  get the template for the skin 
    return nunjucks.renderString($("#matchesTmpl").html(), data);
}



$(document).ready(()=>{
    // we need to get the id of the person stored 
    $.post("https://fortnite-public-api.theapinetwork.com/prod09/users/public/matches_v2?user_id=4735ce9132924caf8a5b17789b40f79c").done((data)=>{
        var html = "";
        html += newMatchRow({
            time : "Time",
            type : "TYPE",
            kills : "KILLS",
            diedBefore : "PLAYERS outlived",
            mode : "mode"
        });
        for(var i=0;i<data.matches.length;i++){
            
            html += newMatchRow({
                time : (new Date(parseInt(data.matches[i].time *1000))).toUTCString(),
                type : data.matches[i].meta.playlist,
                kills : data.matches[i].stats.kills,
                diedBefore : data.matches[i].stats.playersoutlived,
                mode : data.matches[i].meta.mode
            });
        }
    $("#pastMachesGrid").html(html);
    });

});

function getFormatedTimeStamp(unixTimeStamp){
    var d = new Date(unixTimeStamp);
    
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    //  before check to see if we need to add a 0 infront of it 
    if(hours < 10){
        hours = "" + "0" + hours.toString();
    }
    if(minutes < 10){
        minutes = "" + "0" + minutes.toString();
    }
    if(seconds < 10){
        seconds = "" + "0" + seconds.toString();
    }
    return  hours + ":" + minutes + ":" + seconds ;
}