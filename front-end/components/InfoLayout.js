const meta=require("./meta")

function showDetail(tt){
    let id=tt.currentTarget.id;
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

const InfoLayout = (props) =>(
	<figure id={props.id} onClick={showDetail}>
        <img src={props.thumb_url}/>
        <figcaption>{props.title}</figcaption>
    <style jsx>{`
    figure {
        width: 10%;
    }
    figure > img {
        opacity: 1;
        width: 100%;
        box-shadow: 5px 5px black;
        transition: .1s ease-in-out;
    }
    figure:hover > img {
        opacity: .5;
    }
    figure > figcaption {
        color: white;
        margin-top: 10px;
        text-align: center;
    }
    `}
    </style>
    </figure>
)

export default InfoLayout
