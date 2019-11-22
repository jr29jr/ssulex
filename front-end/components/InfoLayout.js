const meta=require("./meta")
let ReactDOMServer=require("react-dom/server");
const tempUrl="http://1.231.53.49:2000"

async function showDetail(tt){
    let id=tt.currentTarget.id;
    let view = document.querySelector("#view");
    view.innerHTML = "";
    view.className = "detail";
    view.innerHTML=await meta.getData(tempUrl+"/detailSeries?id="+id);
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
