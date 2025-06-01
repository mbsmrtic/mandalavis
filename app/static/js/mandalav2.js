import { Mandala } from "/static/js/mandala.js"
import { MandalaInteractions, setSvgViewBox } from "/static/js/svg-interactions.js";
import { createShape } from "/static/js/shapes/shapefactory.js";
import { CompositeMandala } from "/static/js/mandala.js";


// Loop through all the articles in the DOM
const articles = document.querySelectorAll('article')
articles.forEach(article => {
    // Draw the mandala for that article
    var mandalaNum = article.getAttribute('post_id');
    if (! mandalaNum) 
        return;
    const mandalaElementId = "mandala" + mandalaNum; 
    var interactions = new MandalaInteractions(mandalaNum);
    
    const myData = getMandalaDataFromDOM(mandalaElementId);

    if (myData){
        if ('view_box' in myData) {
            let viewboxDict = interactions.getViewBox(interactions.svg);
            let vb = myData['view_box'];
            if (vb) {
                let newViewBoxArray = vb.split(' ').map(Number);
                if (newViewBoxArray.length === 4) {
                    [viewboxDict.x, viewboxDict.y, viewboxDict.width, viewboxDict.height] = newViewBoxArray;
                }
                setSvgViewBox(interactions.svg, viewboxDict);
            }
        }
        if ('mandalas' in myData) {
            var dataForMandalas = myData['mandalas']
            // Count the number of mandalas at this level.
            // In this case "at this level" means those mandalas with 
            //  the same offset (distance from the center). 
            var countOfMandalas = dataForMandalas.length;
            //countOfMandalas = dataForMandalas.filter(md => md['offset'] === )
            var cm = new CompositeMandala(mandalaElementId, 300, 300);
            var i = 0;
            dataForMandalas.forEach(dataForMandala => {
                var offset = dataForMandala['offset'] ?? 0;
                var angleStart = dataForMandala['angleStart'] ?? 0;
                var i = dataForMandala['i'] ?? 0;
                var c = dataForMandala['c'] ?? 1;
                var mandala = cm.addMandala(i, c, offset, angleStart);
                var clustersData = dataForMandala['clusters']
                clustersData.forEach(cluster => addShapes(mandala,cluster))
            })
        }
        else if ('clusters' in myData) {
            var mandala = new Mandala(mandalaElementId, 300, 300);
            var clustersData = myData['clusters']
            clustersData.forEach(cluster => addShapes(mandala, cluster));
        }
    }
    
})


function getMandalaDataFromDOM(mandalaElementId) {
    const dataElement = document.getElementById(mandalaElementId + '-data');
    if (! dataElement) {
        throw new Error("Mandala data element not found: " + this.elementId + '-data');
    }
    const strData = dataElement.dataset.mandala;
    const validJson = strData.replace(/'/g, '"');
    var myData = JSON.parse(validJson);
    return myData;
}



function addShapes(mandala, cluster) {
    var svgAttrs = cluster['svgAttrs'] || null;
    var newShape = createShape(cluster.shape, {
        offset: cluster.offset,
        width: cluster.width,
        length: cluster.length,
        howMany: cluster.data.length,
        angleStart: (cluster['angleStart'] || 0),
        toolTipText: cluster.data,
    }, svgAttrs, cluster['tiltLeft']);
    mandala.addShape(newShape);
}
