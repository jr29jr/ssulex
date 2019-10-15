import Header from "../components/Header"
import InfoLayout from "../components/InfoLayout"
import { Head } from "next/document";

const meta=require("../components/meta.js")

let series=new Array();
let list=[1,2,3,4]
function makeList(){
    let s=meta.getSeriesAll();
    for(let id in s){
        s[id].id=id;
        series.push(s[id]);
    }
}
function retu(){
    let test=<div>
        {list.map((value) =>(
                <InfoLayout id={value.id} thumb_url={value.thumb_url} title={value}></InfoLayout>
        ))}
        <InfoLayout id='td'title='hello'></InfoLayout>
        <InfoLayout id='td'title='hello'></InfoLayout>
    </div>
    return test;
}

function search(tt){
	if(tt.key == 'Enter'){
		let result=tt.currentTarget.value;
		console.log(result);		
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

const Index = () =>(
	<div>
        <Header/>
        <div id="view" className="main">
            {makeList()}
            {series.map((value) =>(
                <InfoLayout id={value.id} thumb_url={value.thumb_url} title={value.title}></InfoLayout>
            ))}
        </div>
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
	</div>
)

export default Index