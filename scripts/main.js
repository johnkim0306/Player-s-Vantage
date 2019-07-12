//  this script will store all the item data in local storage or indexed db for later usage 
var items;
var EpicName;
var epicID;
var myStats;
var itemsLoaded = false;

$(document).ready(()=>{
    //  load the items 
    var itemString = localStorage.getItem("items");
    if(itemString != null){
        items =JSON.parse(itemString);
        itemsLoaded = true;
        startGrid();
        
    }else{
        $.post("https://fortnite-public-api.theapinetwork.com/prod09/items/list").done((data)=>{
            localStorage.setItem("items", JSON.stringify(data));
            items = data;
            itemsLoaded = true;
            startGrid();
    })
    }

    //  check loacl storage for an epic name 
    epicID = localStorage.getItem("epicID");
    console.log(epicID);
    //  we can get your stats 
    if(localStorage.getItem("epicID")!= null){
        //  load stats 
    
    $.post("https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats_v2?user_id="+localStorage.getItem("epicID")).done((data)=>{ 
        console.log("from request",localStorage.getItem("epicID"));
        //  set the form the the name and then idk 
        EpicName = data.epicName;
        //  set the thing in the corrner to the name 
        $("#epicName").val(data.epicName);
    });
}
        
    
});

function enterEpicID(epicName){
    console.log(epicName)
    $.post("https://fortnite-public-api.theapinetwork.com/prod09/users/id?username="+epicName).done((data)=>{
        console.log(data.uid);
        if(data.uid != null){
            epicID = data.uid;
            localStorage.setItem("epicID", data.uid);
            location.reload();
        }else{
            //  the username is not real so alet the user to that some how with swall 
            console.log("usernam isnt right ")
        }
        
        
    });

}
function enterEpicIDHome(epicName){
    console.log(epicName)
    $.post("https://fortnite-public-api.theapinetwork.com/prod09/users/id?username="+epicName).done((data)=>{
        console.log(data.uid);
        if(data.uid != null){
            epicID = data.uid;
            localStorage.setItem("epicID", data.uid);
            window.location.assign("/Stats/player.html");
        }else{
            //  the username is not real so alet the user to that some how with swall 
            console.log("usernam isnt right ")
        }
        
        
    });

}
function startGrid(){
    $("#all-items-grid").jsGrid({
        width: "1200px",
 
        sorting: true,
        paging: true,
 
        data: items,

        rowClick : function(data){
            console.log(data.item);
            Swal.fire({
                title:data.item.name,
                html: data.item.description + "<br> <b>Cost:</b> " +data.item.cost,
                imageUrl: data.item.images.background,
                imageWidth: 472,
                imageHeight: 472,
                imageAlt: 'Custom image'
              })
        },
 
        fields: [
            { name: "name", type: "text" },
            { name: "cost", type: "number" },
            { name: "rarity", type: "text" },
            { name: "type", type: "text" }
        ]
    });
}

function getStats(EpicName,callback){
    $.post("https://fortnite-public-api.theapinetwork.com/prod09/users/id?username="+EpicName).done((data)=>{
        $.post("https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats_v2?user_id="+data.uid).done((data)=>{ 

        });
    });
}  



function loadEpic(userName){
    $.post("https://fortnite-public-api.theapinetwork.com/prod09/users/id?username="+userName).done((data)=>{
        console.log(data);
        
        if(data.uid == null){
            $("#testToast").toast({
            autohide:false
        });
        $("#testToast").toast("show");
        }else{
            window.location.href = "/Stats/player.html";
            

        }


        // }
       
    });
}