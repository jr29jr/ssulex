import Layout from "../components/MyLayout.js"
import Link from "next/link"
import fetch from "isomorphic-unfetch"

const styles = {
	body : {
		margin : 0,
		background : '#3f3f3f',
	},
	top :{
		display:'flex',
		height : '50px',
		background : '#1d1d1d',
	},
	input : {
		background : '#3f3f3f',
		color : 'white',
		width : '15%',
		margin : '10px 10px 10px auto',
	},
	view : {
		display : 'flex',
	},
	
}
function getPost () {
	return [
		{id :'hello-nextjs',title :'hello.js'},
		{id : 'two',title:'twwo page'},
		{id : 'three',title:'three page'}
	]
}
function click1 (){
	let view=document.querySelector('#view');
	console.log(view);
	view.innerHTML='';
}
const Index = () =>(
	<div style={styles.body}>
		<section style={styles.top}>
			<input style={styles.input} type='text' name='search' placeholder='Search'	onkeydown='search(this)'/>
		</section>
		<section id='view' class="main" style={styles.view}>
			<ul>
				{getPost().map((post) =>(
					<li id={post.id} onClick={click1}>
						{post.title}
					</li>
				))}
			</ul>
		</section>
	</div>
)

Index.getInitialProps = async function(){
	return 'tt';
}
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

export default Index
