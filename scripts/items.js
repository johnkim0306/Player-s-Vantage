

function newSkinCard(data){
    //  get the template for the skin 
    return nunjucks.renderString($("#skinTmpl").html(), data);
}

$(document).ready(()=>{
    //  
    $.post("https://fortnite-public-api.theapinetwork.com/prod09/store/get?language=en").done((data)=>{
        var html = "";
        for(var i=0;i<data.items.length;i++){
            var image = data.items[i].item.images.featured.transparent;
            if(image == null){
                image = data.items[i].item.images.transparent;
            }
            html += newSkinCard({
                skinName : data.items[i].name,
                skinPrice : data.items[i].cost,
                imageUrl : image
            });
        }
    $("#daily-skin-grid").html(html);
    });

    $.post("https://fortnite-public-api.theapinetwork.com/prod09/upcoming/get").done((data)=>{
        var html = "";
        for(var i=0;i<data.items.length;i++){
            var image = data.items[i].item.images.featured.transparent;
            if(image == null){
                image = data.items[i].item.images.transparent;
            }
            html += newSkinCard({
                skinName : data.items[i].name,
                skinPrice : data.items[i].cost,
                imageUrl : image
            });
        }
    $("#upcoming-skin-grid").html(html);
    });

    
});