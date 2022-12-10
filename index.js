// const livereload = require("livereload");
// const connectLivereload = require("connect-livereload");
const express = require("express");
const path = require("path");
const pug = require('pug');
const fs = require('fs');
const PORT = process.env.PORT | 3031;


const app = express();
// app.use(connectLivereload());
app.use(express.static(path.join(process.cwd(),"/public")))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views",path.join(process.cwd(),"views"));
app.set("view engine","pug")


// const liveReloadServer = livereload.createServer();
// liveReloadServer.watch(path.join(process.cwd(), 'public'));
// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/");
//   }, 100);
// });


let rawdata = fs.readFileSync("gamelist.json", 'utf8');
let data = JSON.parse(rawdata);


app.post("/search",(req,res)=>{
  const key = req.body["search-key"];
  
  const gamedata = data.data;
  const newdata = gamedata.filter(d=>(d.title.toLowerCase()).includes(key.toLowerCase())||d.genre.toLowerCase().includes(key.toLowerCase()))
  console.log(newdata.length);
  res.render("main",{genres:JSON.stringify(data.genres),data:JSON.stringify(newdata)})
})
app.get("/",(req,res)=>{

    res.render("main",{genres:JSON.stringify(data.genres),data:JSON.stringify(data.data)})
    
})
app.listen(PORT,()=>{
    console.log(`Listening to http://localhost:${PORT}`)
})

