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

    server.get("/search",(req,res) => {
        let keyword=req.query.keyword;
        let info=meta.getSeriesByKeyword(keyword);
        let list="";
        for(let id in info){
            list+=`<figure id=${id}>
                <img src=${info[id]["thumb_url"]}/>
                <figcaption>${info[id]["title"]}</figcaption>
            </figure>`
        }    
        let output=`${list}`;
        res.send(output);
    })

    server.get("/detailSeries",(req,res) => {
        let id=req.query.id;
        let genre="";
        let seriesInfo=meta.getSeries(id);
        let epsIds=new Array();
        if(seriesInfo != null){
            seriesInfo["genres"].forEach(function(element, index) {
                if (index != 0)
                    genre+= ", ";
                genre+= element;
            });
            let temp=meta.getEps(id);
            if(temp != null)
                temp.forEach(function(element,index){
                    epsIds.push(element);
                })    
        }
        let list="";
        epsIds.forEach(function(element){
            let info=meta.getDetailOfEp(element);
            list+=
            `<div className="epsInfo">
                <div>
                    <span id="title">${info["title"]}</span>
                    <span> (S${info["season"]}, Ep${info["number"]})</span>
                    <span id="date">${info["date"]}</span>
                </div>
                <div>
                    <img src="../img/star.jpg"></img>
                    <span> ${info["rating"]}</span>
                </div>
                <p>${info["description"]}</p>
            </div>`;
        });
        let output=
        `<div id="detailInfo">
            <nav>
                <img src=${seriesInfo["thumb_url"]}></img>
                <p className="center">${seriesInfo["title"]}</p>
                <p className="center">${seriesInfo["year"]}</p>
                <p className="center">${genre}</p>
                <p className="center">${seriesInfo["synopsis"]}</p>
            </nav>
            <article>
                ${list}
            </article>
        </div>`;
        res.send(output);
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