const express=require('express');
const app=express();
const fs=require('fs');
const path=require('path');
const port=4004;
app.listen(port,(req,res)=>{
    console.log(`Server running on localhost: ${port}`);
});
const newfolder='./output';
if(!fs.existsSync(newfolder)){
    fs.mkdirSync(newfolder);
};
app.get('/KavinM',(req,res)=>{
    const currentTime=new Date();
    const year=currentTime.getFullYear().toString();
    const month=(currentTime.getMonth()+1).toString();
    const date=currentTime.getDate().toString();
    const hours=currentTime.getHours().toString();
    const mins=currentTime.getMinutes().toString();
    const secs=currentTime.getSeconds().toString();

    const dateTimeForfileName = `${year}-${month}-${date}-${hours}-${mins}-${secs}.txt`;
    const filePath=path.join(newfolder,dateTimeForfileName);
    console.log(`${filePath}`);
    fs.writeFile(filePath,currentTime.toISOString(),(err)=>{
       if(err){
        res.status(500).send(`Error : ${err}`);
       }
       res.send(`File Created Successfully: ${filePath}`);
    });
});

app.get('/readFile',(req,res)=>{
    fs.readdir(newfolder,(err,files)=>{
        if(err){
            res.status(500).send(`Error :${err}`);
        }
        console.log(files);
        const txtFiles=files.filter((item)=>path.extname(item)==='.txt');
        res.json(txtFiles);
    });
});