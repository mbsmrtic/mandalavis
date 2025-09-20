import { Mandala } from "/static/js/mandala.js"
import { MandalaInteractions } from "/static/js/svg-interactions.js";
import { createShape } from "/static/js/shapes/shapefactory.js";
import { CompositeMandala } from "/static/js/mandala.js";
import { ControlPanel } from "/static/js/controlpanel.js";

// Loop through all the articles in the DOM
const interactionsById = new Map();

const articles = document.querySelectorAll('article')
articles.forEach(article => {
    // Draw the mandala for that article
    const mandalaNum = article.getAttribute('post_id');
    if (! mandalaNum) return;
    const mandalaElementId = "mandala" + mandalaNum; 
    
    const interactions = new MandalaInteractions(mandalaNum, { minZoom: 0.4, maxZoom: 40 });
    interactionsById.set(mandalaNum, interactions);    
    
    const myData = getMandalaDataFromDOM(mandalaElementId);

    if (! myData) return;
    if ('view_box' in myData) {
        const vb = myData['view_box'];
        if (vb) {
            interactions.setViewBoxFromString(vb);  // e.g., "0 0 600 600"
        }
    }
    // @todo: at some point we may want to support the control panel for composite mandalas.
    var clustersData;
    var mandala;
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
            mandala = cm.addMandala(i, c, offset, angleStart);
            clustersData = dataForMandala['clusters']
            //loop through adding each cluster - sorted by zindex
            clustersData
                .slice() // makes a shallow copy so that we don’t mutate the original
                .sort((a, b) => a.zindex - b.zindex) // ascending by zindex
                .forEach(cluster => addShapes(mandala, cluster));
        })
        clustersData = dataForMandalas[0]['clusters'];
        mandala = cm;
    }
    else if ('clusters' in myData) {
        mandala = new Mandala(mandalaElementId, 300, 300);
        clustersData = myData.clusters;
        //loop through adding each cluster - sorted by zindex
        clustersData
            .slice() // makes a shallow copy so that we don’t mutate the original
            .sort((a, b) => a.zindex - b.zindex) // ascending by zindex
            .forEach(cluster => addShapes(mandala, cluster));

        new ControlPanel(article, clustersData, mandala);
    }

})

// page tear-down
window.addEventListener('beforeunload', () => {
  interactionsById.forEach(i => i.destroy());
  interactionsById.clear();
});

function getMandalaDataFromDOM(mandalaElementId) {
    const dataElement = document.getElementById(mandalaElementId + '-data');
    if (! dataElement) {
        throw new Error("Mandala data element not found: " + mandalaElementId + '-data');
    }
    const strData = dataElement.dataset.mandala;
    const validJson = strData.replace(/'/g, '"');
    var myData = JSON.parse(validJson);
    return myData;
}



function addShapes(mandala, cluster) {
    var svgAttrs = cluster['svgAttrs'] || null;
    var newShape = createShape(cluster.shape, {
        clusterid: cluster.id,
        offset: cluster.offset,
        width: cluster.width,
        length: cluster.length,
        howMany: cluster.data.length,
        angleStart: (cluster['angleStart'] || 0),
        toolTipText: cluster.data,
    }, svgAttrs, cluster['tiltLeft']);
    mandala.addShape(newShape);
}

export { togglePanel };
function togglePanel(btn) {
  const panelBody = btn.closest(".controlpanel").querySelector(".panel-body");
  if (panelBody.style.display === "none") {
    panelBody.style.display = "block";
    btn.textContent = "Hide";
  } else {
    panelBody.style.display = "none";
    btn.textContent = "Show";
  }
}
