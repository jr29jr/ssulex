const meta=require("./components/meta")
const ReactDOMServer=require("react-dom/server");
const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000
const dev=process.env.NODE_ENV !== "production";
const app=next({dev})
const handle=app.getRequestHandler();


app.prepare()
.then(() => {
    const server= express()

    server.get("/api/search",(req,res) => {
        let type=req.query.type;
        let keyword=req.query.keyword;
        console.log(type+"/"+keyword);
        let result=meta.getSeriesByKeyword(type,keyword);
        res.json(result);
    })

    server.get("/api/detailSeries",(req,res) => {
        let id=req.query.id;
        let seriseInfo=meta.getDataForDetailPage(id);
        if(seriseInfo == null)
            seriseInfo={};
        res.json(seriseInfo);
    })
    server.get('*', (req, res) => {
        return handle(req, res)
    })
    server.listen(port,(err) =>{
        if(err) throw err
        console.log("> Ready on http://localhost:3000")
    })
})
.catch((ex) =>{
    //console.error(ex.stack)
    process.exit(1)
})