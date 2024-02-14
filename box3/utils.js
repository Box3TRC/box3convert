function axispermedstr(pos,size,axis){
    let xyz=[];
    for(let i=0;i<axis.length;i++){
      if("xyz".includes(axis[i])){
        xyz.push(pos[axis[i]]);
      }
      if("XYZ".includes(axis[i])){
        xyz.push(size[axis[i].toLowerCase()]-pos[axis[i].toLowerCase()]);
      }
    }
    return xyz;
  }
module.exports={
  axispermedstr
}