import Document, { Head, Main, NextScript } from 'next/document';


class CustomDocument extends Document {
    render() {
        return (
            <html>
            <Head>
            <style>{`
            body {
                margin: 0;
                background-color: #3f3f3f;
            }
            #detailInfo {
                display: flex;
                border :1px solid #000000
            }
            #title {
                color : blue;
                font-size : 20px;
            }
            #date {
               float:right;
            }
            p{
                color : white;
            }
            span{
                color : white;
            }
            #view {
                display: flex;
            }
            #view.main {
                flex-wrap: wrap;
            }
            #view article {
                margin: 50px;
            }
            #view nav {
                margin: 50px;
                display: flex;
                flex-flow: column;
                width: 200px;
            }
            #view nav p {
                color: white;
                margin-block-end: 0px;
            }
            #view nav p.center {
                text-align: center;
            }
            #view nav img {
                opacity: 1;
                width: 100%;
                box-shadow: 5px 5px black;
                transition: .1s ease-in-out;
            }
            #view nav:hover img {
                opacity: .5;
            }
            #view article {
                flex: auto;
            }
            #view figure {
                width: 10%;
            }
            #view figure img {
                opacity: 1;
                width: 100%;
                box-shadow: 5px 5px black;
                transition: .1s ease-in-out;
            }
            #view figure:hover img {
                opacity: .5;
            }
            #view figure figcaption {
                color: white;
                margin-top: 10px;
                text-align: center;
            }      
            `}</style>
            </Head>
            <body>
		        <Main/>
                <NextScript/>
                <script>{`
                    var divs = document.querySelectorAll("figure");
                    divs.forEach(function(div) {
                        div.addEventListener('click', logEvent)
                    });

                    function logEvent(event) {
                        console.log(event.currentTarget.className)
                    }
                `}</script>
            </body>
            </html>
        );
    }
}

export default CustomDocument;
