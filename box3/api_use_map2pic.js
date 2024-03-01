// const bl2c = require("./blocks2color");
// const Color = require("color");
// const ImageJS = require("imagejs");
// const { resolve } = require("path");
// const { Writable } = require('stream');
// async function map2pic(surfacedata, mapsize, DEFAULT_COLOR, CUSTROM_BLOCKS, dir) {
//     return new Promise((resolve, reject) => {
//         let bitmap = new ImageJS.Bitmap({ width: mapsize, height: mapsize });
//         let surfacedata_2_vec = {}
//         let vec_2_surfacedata = {}
//         let cnt = 0;
//         for (let x = 0; x < mapsize; x++) {
//             for (let z = 0; z < mapsize; z++) {
//                 surfacedata_2_vec[cnt] = [x, z];
//                 vec_2_surfacedata[`${x},${z}`] = cnt;
//                 cnt++;
//             }
//         }
//         console.log(surfacedata.length, mapsize, mapsize * mapsize)
//         var BLOCKS = Object.assign(Object.assign({}, bl2c.BLOCKS), CUSTROM_BLOCKS);
//         for (let x = 0; x < mapsize; x++) {
//             for (let z = 0; z < mapsize; z++) {
//                 let block_id = surfacedata[vec_2_surfacedata[`${x},${z}`]];
//                 let block_name = bl2c.box3.voxels.name(block_id)
//                 let block_color = DEFAULT_COLOR;
//                 if (BLOCKS[block_name]) {
//                     block_color = BLOCKS[block_name];
//                 }
//                 block_color = Color(block_color).object();
//                 bitmap.setPixel(x, z, block_color);
//                 if(bitmap.getPixel(x, z).r!=block_color.r||bitmap.getPixel(x, z).g!=block_color.g||bitmap.getPixel(x, z).b!=block_color.b){
//                     console.log("??")
//                 }
//             }
//         }
//         bitmap.writeFile(dir, { quality: 100 }).then(() => { resolve(); });
//     });
// }

// module.exports = {
//     map2pic
// }