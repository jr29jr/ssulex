var http = require('http');
var fs = require('fs');
var url = require('url');
const meta =require('./meta.js');


function templateHTML(list,sdata,edata){
  return `
  <!doctype html>
  <html>
  <head>
  <style>
  body {
      margin: 0;
      background-color: #3f3f3f;
  }
  #top {
      display: flex;
      height: 50px;
      background-color: #1d1d1d;
  }
  #top > input {
      background-color: #3f3f3f;
      color: white;
      width: 15%;
      margin: 10px 10px 10px auto;
      border: 0px;
      padding: 10px;
      border-radius: 10px;
  }
  #view {
      display: flex;
  }
  #view.main {	
      flex-wrap: wrap;
  }
  #view > article {
      margin: 50px;
  }
  #view > article > table {
      width: 100%;
      color: white;
      text-align: center;
  }
  #view > article > table tr:nth-child(even) {
      background-color: #363636;
  }
  #view > article > table tr:nth-child(odd) {
      background-color: #222021;
  }
  #view > nav {
      margin: 50px;
      display: flex;
      flex-flow: column;
      width: 200px;
  }
  #view > nav p {
      color: white;
      margin-block-end: 0px;
  }
  #view > nav p.center {
      text-align: center;
  }
  #view > nav img {
      opacity: 1;
      width: 100%;
      box-shadow: 5px 5px black;
      transition: .1s ease-in-out;
  }
  #view > nav:hover img {
      opacity: .5;
  }
  #view  article {
      flex: auto;
  }
  #view > figure {
      width: 10%;
  }
  #view > figure > img {
      opacity: 1;
      width: 100%;
      box-shadow: 5px 5px black;
      transition: .1s ease-in-out;
  }
  #view > figure:hover > img {
      opacity: .5;
  }
  #view > figure > figcaption {
      color: white;
      margin-top: 10px;
      text-align: center;
  }
  </style>
  </head>
  <body>
  <section id="top">
    <input type="text" name="search" placeholder="Search" onkeydown="search(this)">
  </section>
  <section id="view" class="main">
  </section>
  <script> 
  let s=${sdata}
  let e=${edata}
  function show_detail(id) {
    let view = document.querySelector("#view");
    view.innerHTML = "";
    view.className = "detail";
    let nav = document.createElement("nav");
    let poster = document.createElement("img");
    poster.src = s[id]["thumb_url"];
    nav.appendChild(poster);
    let title = document.createElement("p");
    title.textContent = s[id]["title"];
    title.className = "center";
    nav.appendChild(title);
    let year = document.createElement("p");
    year.textContent = s[id]["year"];
    year.className = "center";
    nav.appendChild(year);
    let genre = document.createElement("p")
    genre.className = "center";
    s[id]["genres"].forEach(function(element, index) {
        if (index != 0)
            genre.textContent += ", ";
        genre.textContent += element;
    });
    nav.appendChild(genre);
    let synopsis = document.createElement("p");
    synopsis.textContent = s[id]["synopsis"];
    synopsis.className= "center";
    nav.appendChild(synopsis);
    let article = document.createElement("article");
    let table = document.createElement("table");
    let r = table.insertRow();
    let c1 = r.insertCell();
    let c2 = r.insertCell();
    let c3 = r.insertCell();
    let c4 = r.insertCell();
    c1.innerHTML = "Season";
    c2.innerHTML = "Episode";
    c3.innerHTML = "Title";
    c4.innerHTML = "Date";
    if (s[id]["episode"])
        s[id]["episode"].forEach(function(eid) {
            let row = table.insertRow();
            let cell1 = row.insertCell();
            let cell2 = row.insertCell();
            let cell3 = row.insertCell();
            let cell4 = row.insertCell();
            cell1.innerHTML = e[eid]["season"];
            cell2.innerHTML = e[eid]["number"];
            cell3.innerHTML = e[eid]["title"];
            cell4.innerHTML = e[eid]["date"];
        });
    article.appendChild(table);
    view.appendChild(nav);
    view.appendChild(article);

  }
  function redraw(filtered) {
    let view = document.querySelector("#view");
    view.innerHTML = "";
    view.className = "main";
    let target = filtered ? filtered : s;
    for (let id in target) {
      let title = target[id];
      let figure = document.createElement("figure");
      figure.addEventListener("click", function (e) {
          show_detail(id);
      });
      let poster = document.createElement("img");
      poster.src = title["thumb_url"];
      let figcaption = document.createElement("figcaption");
      figcaption.textContent = title["title"];
      figure.appendChild(poster);
      figure.appendChild(figcaption);
      view.appendChild(figure);
    }
  }
  function filter(keyword) {
    let ret = {};
    for (let id in s)
      for (let value of Object.values(s[id]))
        if (typeof value === "string") {
          if (value.toLowerCase().includes(keyword.toLowerCase()))
              ret[id] = s[id];
        }
        else if (typeof value === 'object')
          for (let e of value)
            if (e.toLowerCase().includes(keyword.toLowerCase()))
              ret[id] = s[id];
    return ret;
  }
  function search(e) {
    if (event.keyCode == 13)
      redraw(filter(e.value));
  }
  redraw();
  </script>
  </body>
  `;
}
function tempTvshow(thumb_url,id,title){
  //console.log(JSON.stringify(meta.getSeriesAll()));
  //console.log(JSON.stringify(meta.getSeriesAll()))
  return `
    <figure onClick='show_detail("${id}")'>
      <img src="${thumb_url}"/>
      <figcaption>${title}</figcaption>
    </figure>
  `;
}

function templateList(filtered){
  var list=``;
  var i = 0;
  var target = filtered ? filtered : meta.getSeriesAll();
  for(let id in target){
    var node=target[id];
    list+=tempTvshow(node['thumb_url'],id,node['title']);
  }
  return list;
}

function filter(keyword) {
  let ret = {};
  let s=meta.getSeriesAll();
  for (let id in s)
      for (let value of Object.values(s[id]))
          if (typeof value === "string") {
              if (value.toLowerCase().includes(keyword.toLowerCase()))
                  ret[id] = s[id];
          }
          else if (typeof value === 'object')
              for (let e of value)
                  if (e.toLowerCase().includes(keyword.toLowerCase()))
                      ret[id] = s[id];
  return ret;
}

var app = http.createServer(function(request,response){
  var _url = request.url;
  var template;
  var pathname=url.parse(_url,true).pathname;
  var list;
  //not safety url
	if(pathname !== '/'){
   	response.writeHead(404);
		response.end("Not Found");
  }

  fs.readdir('./data',function(error,fileList){
    list=templateList();
    var sdata=JSON.stringify(meta.getSeriesAll());
    var edata=JSON.stringify(meta.getEpsAll());
    template=templateHTML(list,sdata,edata);
    response.writeHead(200);
    response.end(template);
  });
});
app.listen(3000);