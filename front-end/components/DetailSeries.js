import DetailEps from "./DetailEps";
const meta=require("./meta")

let seriesInfo;
let epsIds=new Array();
let genre="";
function getInfo(id){
    seriesInfo=meta.getSeries(id);
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
const DetailSeries = (props) =>(
	<div id="detailInfo">
        {getInfo(props.id)}
        <nav>
            <img src={seriesInfo["thumb_url"]}></img>
            <p className="center">{seriesInfo["title"]}</p>
            <p className="center">{seriesInfo["year"]}</p>
            <p className="center">{genre}</p>
            <p className="center">{seriesInfo["synopsis"]}</p>
        </nav>
        <article>
            {epsIds.map((value,index) =>(
                <DetailEps id={value} index={index}></DetailEps>
            ))}
        </article>
    </div>
)

export default DetailSeries
