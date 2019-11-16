import InfoLayout from "./InfoLayout";
import DetailSeries from "./DetailSeries";

const meta=require("./meta")
const ReactDOMServer=require("react-dom/server");

function search(tt){
	if(tt.key == 'Enter'){
		let result=tt.currentTarget.value;
		redraw(filter(tt.currentTarget.value));
		
    }
}

function showDetail(tt){
    let id=tt.currentTarget.id;
    let view = document.querySelector("#view");
    view.innerHTML = "";
    view.className = "detail";
    let temp="";
    temp=ReactDOMServer.renderToString(<DetailSeries id={id}></DetailSeries>);
    view.innerHTML=temp;
    //insert clickevent code
}

function redraw(filtered) {
    let view = document.querySelector("#view");
	let s=meta.getSeriesAll();
    view.innerHTML = "";
    view.className = "main";
    let info="";
    let target = filtered ? filtered : s;
    for (let id in target) {
        let title = target[id];
        let lay=<InfoLayout id={id} thumb_url={title["thumb_url"]} title={title["title"]}></InfoLayout>
        let str=ReactDOMServer.renderToString(lay);
        info+=str;
    }
    view.innerHTML=info;
    let divs=view.querySelectorAll("figure");
    divs.forEach(function(div) {
        div.addEventListener('click', showDetail);
    });
    
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