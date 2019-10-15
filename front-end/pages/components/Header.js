import Link from "next/link"

const meta=require("./meta")

function search(tt){
	if(tt.key == 'Enter'){
		let result=tt.currentTarget.value;
		//console.log(result);
		redraw(filter(tt.currentTarget.value));
		
	}
}
function showDetail(id){
	let s=meta.getSeries(id);
    let view = document.querySelector("#view");
    view.innerHTML = "";
    view.className = "detail";
    let nav = document.createElement("nav");
    let poster = document.createElement("img");
    poster.src = s["thumb_url"];
    nav.appendChild(poster);
    let title = document.createElement("p");
    title.textContent = s["title"];
    title.className = "center";
    nav.appendChild(title);
    let year = document.createElement("p");
    year.textContent = s["year"];
    year.className = "center";
    nav.appendChild(year);
    let genre = document.createElement("p")
    genre.className = "center";
    s["genres"].forEach(function(element, index) {
        if (index != 0)
            genre.textContent += ", ";
        genre.textContent += element;
    });
    nav.appendChild(genre);
    let synopsis = document.createElement("p");
    synopsis.textContent = s["synopsis"];
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
    if (s["episode"])
    s["episode"].forEach(function(eid) {
        let row = table.insertRow();
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();
        let cell3 = row.insertCell();
        let cell4 = row.insertCell();
        let detail=meta.getDetailOfEp(eid);
        cell1.innerHTML = detail["season"];
        cell2.innerHTML = detail["number"];
        cell3.innerHTML = detail["title"];
        cell4.innerHTML = detail["date"];
    });
    article.appendChild(table);
    view.appendChild(nav);
    view.appendChild(article);
}
function redraw(filtered) {
	let view = document.querySelector("#view");
	let s=meta.getSeriesAll();
    view.innerHTML = "";
    view.className = "main";
    let target = filtered ? filtered : s;
    for (let id in target) {
        let title = target[id];
		let figure = document.createElement("figure");
		figure.id=id;
        figure.addEventListener("click", function (e) {
            showDetail(id);
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


const Header = () =>(
	<section id="top">
		<input id='searchBar' type="text" name="search" placeholder="Search" onKeyPress={search}/>
		<style jsx>{`
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
		`}</style>
	</section>
)

export default Header
