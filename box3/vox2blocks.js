const box3ColorBlocks = require("./box3colorblocks.js");
const readVox = require("vox-reader");
const {axispermedstr}=require("./utils.js");

function vox2blocks(buf,scale,axis){
    var vox=readVox(buf);
    var voxelColor = {};// "x,y,z":{r:0,g:0,b:0,a:0} 
    var blocks = {};
    var maxsize = { x: 0, y: 0, z: 0 };
    vox.xyzi.values.forEach((v, index) => {
        if (v.x > maxsize.x) maxsize.x = v.x;
        if (v.y > maxsize.y) maxsize.y = v.y;
        if (v.z > maxsize.z) maxsize.z = v.z;
    })
    var size = {
        x: parseInt(maxsize.x * scale)+1,
        y: parseInt(maxsize.y * scale)+1,
        z: parseInt(maxsize.z * scale)+1
    }
    vox.xyzi.values.forEach((v, index) => {
        // xzy 方向旋转可以试试三个都试试在前面加上 size.?-
        let pos_str=axispermedstr({x:parseInt(v.x*scale),y:parseInt(v.y*scale),z:parseInt(v.z*scale)},size,axis);
        let color = vox.rgba.values[v.i - 1];
        voxelColor[pos_str] = color;
        let voxel_name = box3ColorBlocks.nearestColor(color.r, color.g, color.b);
        blocks[pos_str] = box3ColorBlocks.box3.voxels.id(voxel_name);
    });
    return blocks;
}
module.exports={
    vox2blocks
}