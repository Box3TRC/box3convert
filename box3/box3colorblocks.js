const fs=require('fs');
const VOXEL_TXT=require("../voxels.txt.js");
function rgb(r,g,b){
    return {r:r,g:g,b:b}
}
const BLOCKS={
    cadet_blue:rgb(55, 98, 156),
    sky_blue:rgb(88, 170, 231),
    powder_blue:rgb(193, 236, 248),
    dark_gray:rgb(66, 66, 66),
    light_gray:rgb(174, 174, 174),
    olive_green:rgb(117, 143, 56),
    yellow_green:rgb(176, 204, 76),
    pale_green:rgb(210, 224, 137),
    red:rgb(245, 14, 14),
    dark_red:rgb(158, 25, 6),
    brick_red:rgb(222, 74, 74),
    medium_gray:rgb(113, 113, 113),
    dark_slate_blue:rgb(40, 53, 115),
    pink:rgb(255, 125, 156),
    sakura_pink:rgb(255, 191, 226),
    orange:rgb(255, 148, 14),
    lemon:rgb(255, 247, 76),
    black:rgb(0, 0, 0),
    white:rgb(255, 255, 255),
    blue:rgb(0, 0, 255),
    turquoise:rgb(77, 208, 225),
    dark_orchid:rgb(123, 31, 162),
    medium_orchid:rgb(186, 104, 200),
    medium_purple:rgb(139, 140, 222),
    medium_violet:rgb(221, 52, 141),
    maroon:rgb(221, 52, 141),
    coffee_gray:rgb(121, 85, 72),
    peru:rgb(187, 117, 71),
    dark_salmin:rgb(219, 164, 99),
    navajo_white:rgb(251, 223, 155),
    orange_red:rgb(230, 81, 0),
    medium_yellow:rgb(255, 213, 65),
    medium_green:rgb(10, 126, 7),
    sienna:rgb(132, 107, 41),
    mint_green:rgb(183, 255, 164),
    medium_spring_green:rgb(55, 255, 193)
}
const VOXEL_NAME2ID={},VOXEL_ID2NAME={};
VOXEL_TXT.split(',').forEach((voxel,i)=>{
    let x=voxel.split(" ");
    VOXEL_NAME2ID[x[1]]=parseInt(x[0]);
    VOXEL_ID2NAME[parseInt(x[0])]=x[1];
});
const box3={
    voxels:{
        id(name){
            return VOXEL_NAME2ID[name];
        },
        name(id){
            return VOXEL_ID2NAME[id];
        }
    }
}

const color_names = Object.keys(BLOCKS);
const rgbs= Object.values(BLOCKS);
function nearestColor(r,g,b){
    let min_dist = Infinity;
    let min_color = null;
    for(let i = 0; i < color_names.length; i++){
        let dist=Math.sqrt(Math.pow(rgbs[i].r-r,2)+Math.pow(rgbs[i].g-g,2)+Math.pow(rgbs[i].b-b,2));
        if(dist<min_dist){
            min_dist=dist;
            min_color=color_names[i];
        }
    }
    return min_color;
}
module.exports={
    BLOCKS,nearestColor,box3,rgb
}