import InfoLayout from "./InfoLayout";

const meta=require("./meta")
const ReactDOMServer=require("react-dom/server");
const tempUrl="http://1.231.53.49:2000"

async function search(tt){
	if(tt.key == 'Enter')
		redraw(tt.currentTarget.value);    
}

async function showDetail(tt){
    let id=tt.currentTarget.id;
    let view = document.querySelector("#view");
    view.innerHTML = "";
    view.className = "detail";
    view.innerHTML=await meta.getData(tempUrl+"/detailSeries?id="+id);
    //insert clickevent code
}

async function redraw(keyword) {
    let view = document.querySelector("#view");
    view.innerHTML = "";
    view.className = "main";
    view.innerHTML=await meta.getData(tempUrl+"/search?keyword="+keyword);;
    let divs=view.querySelectorAll("figure");
    divs.forEach(function(div) {
        div.addEventListener('click', showDetail);
    });
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