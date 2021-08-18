let object={
    media:["mp4","mkv"],
    archives:['zip','7z','rar','gz','ar','iso','xz'],
    documents:['docx','doc','pdf','xlsx','odt','odp'],
    app:['exe','dmg','pkg','deb']
}
let obj1=require("../command/organiser");
// console.log(obj1);
let obj2=require("../command/tree");
// console.log(obj2);
let fs=require("fs");
let path=require("path");
let inputArr=process.argv.slice(2);
let command=inputArr[0];
let directrypath=inputArr[1];
let f=false;

switch(command){

    case "help":
        console.log(`list of all commands
        1.help 
        2.organise
        3.tree`);
        break;

    case "organise":
        organisefn(directrypath);
        break;
    case "tree":
        obj2.treefxn(directrypath);
        break;
    default:
        console.log("plz enter right input");
        break;            
}


function organisefn(directorypath){
let folderpath=path.join(directorypath,"random");
// console.log(folderpath);
if(fs.existsSync(folderpath)==false){
fs.mkdirSync(folderpath);
}
let filenames=fs.readdirSync(directorypath);
// console.log(filenames);
for(let j=0;j<filenames.length;j++){
    f=false;
    //   console.log(filenames[j]);
let ext=path.extname(filenames[j]).slice(1);
// console.log(ext);
for(let key in object){
    let extensions=object[key];
    // console.log(extensions);
    for(let i=0;i<extensions.length;i++){
      if(ext==extensions[i]){
        //   console.log(ext, extensions[i]);
          let p1=path.join(folderpath,key);
        //   console.log(p1);
        if(fs.existsSync(p1)==false){
            fs.mkdirSync(p1);
        }
        let f1=path.join(p1,filenames[j]);
        // console.log(f1);
     let srcpath=path.join(directorypath,filenames[j]);
    //  console.log(srcpath);
    fs.copyFileSync(srcpath,f1);
     f=true;
     console.log(f);
      }

    }
}
console.log(f);
if(f==false){
     otherss(folderpath,filenames[j],directorypath);   
}

//     //   if(ext!=ext){
//     //   {
//     //     console.log(ext, extensions[i]);
//         //   let p2=path.join(folderpath,"others");
//         //   console.log(p2);
//         //   if(fs.existsSync(p2)==false){
//         //       fs.mkdirSync(p2);
//         //   }
//         //   console.log(filenames[j]);
//         // let check=fs.lstatSync(filenames[j]);
//         // if(check.isFile()){
//         //   let dest=path.join(p2,filenames[j]);
//         //   console.log(dest);
//         //   let srcpth=path.join(directorypath,filenames[j]);
//         //   console.log(srcpth);
//         //   fs.copyFileSync(srcpth,dest);
//         // otherss(folderpath,filenames[j],directorypath);
//     //   }
//     // }

// }
}
}
function otherss(folderpath,filename,directorypath){
    let p2=path.join(folderpath,"others");
          console.log(p2);
          if(fs.existsSync(p2)==false){
              fs.mkdirSync(p2);
          }
          console.log(filename);
          let filepath=path.join(directorypath,filename);
          let check=fs.lstatSync(filepath);
        if(check.isFile()){
          let dest=path.join(p2,filename);
          console.log(dest);
          let srcpth=path.join(directorypath,filename);
          fs.copyFileSync(srcpth,dest);
}
}

