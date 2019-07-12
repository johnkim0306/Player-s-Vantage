function newWeaponCard(data){
    //  get the template for the skin 
    return nunjucks.renderString($("#weaponTmpl").html(), data);
}

$(document).ready(()=>{
    //  
    renderWeaponsGrid({});
});

function renderWeaponsGrid(filter){
    // set the html to the loading thing 
    $("#weapon-grid").html('<div class="block-loader"></div>');
    //  only render the rare ones 
    $.post("https://fortnite-public-api.theapinetwork.com/prod09/weapons/get").done((data)=>{
        var html = "";
        console.log(data);
        for(var i=0;i<data.weapons.length;i++){
            if(filter.rarity != null){
                if(data.weapons[i].rarity != filter.rarity){
                    continue;
                }
            }
            if(filter.type != null){
                if(data.weapons[i].name.indexOf(filter.type) < 0){
                    continue;
                }
            }
            //  else render the weapn card
            html += newWeaponCard({
                name : data.weapons[i].name,
                rarity : data.weapons[i].rarity,
                stats : data.weapons[i].stats,
                image : data.weapons[i].images.image

            });
        }
        console.log(data);
    $("#weapon-grid").html(html);
    });
}


function filterRarity(name){
    //  set the drop down text to the name 
    $("#rarity-filter").html(name);
    renderWeaponsGrid({
        rarity : name
    });

}
function filterType(name){
    $("#type-filter").html(name);
    renderWeaponsGrid({
        type : name
    });
}