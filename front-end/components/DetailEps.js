const meta=require("./meta")

let info;
let genre="";
function getInfo(id){
    info=meta.getDetailOfEp(id);
}
const DetailEps = (props) =>(
	<div className="epsInfo">
        {getInfo(props.id)}
        <div>
            <span id="title">{info["title"]}</span>
            <span> (S{info["season"]}, Ep{info["number"]})</span>
            <span id="date">{info["date"]}</span>
        </div>
        <div>
            <img src="../img/star.jpg"></img>
            <span> {info["rating"]}</span>
        </div>
        <p>{info["description"]}</p>
    </div>
)

export default DetailEps
