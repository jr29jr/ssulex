import Header from "../components/Header"
import InfoLayout from "../components/InfoLayout"

const meta=require("../components/meta.js")

let series=new Array();

function makeList(){
    let s=meta.getSeriesAll();
    for(let id in s){
        s[id].id=id;
        series.push(s[id]);
    }
}

const Index = () =>(
	<div>
        <Header/>
        <div id="view" className="main">
            {makeList()}
            {series.map((value) =>(
                <InfoLayout id={value.id} thumb_url={value.thumb_url} title={value.title}></InfoLayout>
            ))}
        </div>
	</div>
)

export default Index
