import { Mandala } from "/static/js/mandala.js"
import { MandalaInteractions, setSvgViewBox } from "/static/js/svg-interactions.js";
import { shapeClasses, createShape } from "/static/js/shapes/shapefactory.js";
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
                clustersData.forEach(cluster => addShapes(mandala,cluster))
            })
            clustersData = dataForMandalas[0]['clusters'];
            mandala = cm;
        }
        else if ('clusters' in myData) {
            mandala = new Mandala(mandalaElementId, 300, 300);
            clustersData = myData['clusters']
            clustersData.forEach(cluster => addShapes(mandala, cluster));
            // Fill dropdowns
            // Get the dropdowns elements
            const clusterDropdown = article.querySelector("#clusterdropdown");
            const shapeDropdown = article.querySelector("#shapedropdown");
            if (clusterDropdown && shapeDropdown) {
                clusterDropdown.innerHTML = '<option value="" selected disabled hidden>-- Select cluster --</option>';
                clustersData.forEach(cluster => {
                    const option = document.createElement("option");
                    option.value = cluster.clustername;   // value attribute
                    option.textContent = cluster.clustername; // visible text
                    clusterDropdown.appendChild(option);
                })
                //fill the shapes from the shapefactory list
                shapeDropdown.innerHTML = '<option value="" selected disabled hidden>-- Select shape --</option>';
                for (let shapeName in shapeClasses) {
                    let shapeClass = shapeClasses[shapeName];
                    if (shapeClass.prototype.includeInControlPanel()) {
                        const option = document.createElement("option");
                        option.value = shapeName;
                        option.textContent = shapeName;
                        shapeDropdown.appendChild(option);
                    }
                }
                let widthinput = article.querySelector("#widthinput");
                let heightinput = article.querySelector("#heightinput");
                let offsetinput = article.querySelector("#offset");
                let anglestartinput = article.querySelector("#anglestart");
                let strokecolorinput = article.querySelector("#strokecolor");
                let strokewidthinput = article.querySelector("#strokewidth");
                let fillcolorinput = article.querySelector("#fillcolor");

                let selectedCluster = null;
                //select the shape of the selected cluster
                clusterDropdown.addEventListener("change", function() {
                    const selectedClusterName = this.value;
                    //what shape is assigned to this cluster?
                    selectedCluster = clustersData.find(c => c.clustername === selectedClusterName);
                    
                    //set all the control panel settings to match the current values 
                    // of the newly selected cluster
                    shapeDropdown.value = selectedCluster.shape;
                    //set the width
                    widthinput.value = selectedCluster.width;
                    widthinput.nextElementSibling.value = selectedCluster.width;
                    //set the height
                    heightinput.value = selectedCluster.length;
                    heightinput.nextElementSibling.value = selectedCluster.length;
                    //set the angle offset
                    offsetinput.value = selectedCluster.offset;
                    offsetinput.nextElementSibling.value = selectedCluster.offset;
                    //set the angle start
                    anglestartinput.value = selectedCluster.angleStart;
                    anglestartinput.max = (360 / Number(selectedCluster.data.length) - 1);
                    anglestartinput.nextElementSibling.value = selectedCluster.angleStart;
                    //svg attributes
                    if (selectedCluster.svgAttrs) {
                        //set the colors
                        //stroke color
                        setColorValue(strokecolorinput, selectedCluster.svgAttrs["stroke"]);
                        //fill color
                        setColorValue(fillcolorinput, selectedCluster.svgAttrs["fill"]);
                        //set the stroke width
                        strokewidthinput.value = selectedCluster.svgAttrs["stroke-width"];
                        strokewidthinput.nextElementSibling.value = strokewidthinput.value;
                    }
                    else {
                        selectedCluster.svgAttrs = {}
                    }
                    //make sure they are all now enabled (now that we have a cluster selected)
                    shapeDropdown.disabled = false;
                    widthinput.disabled = false;
                    heightinput.disabled = false;
                    offsetinput.disabled = false;
                    anglestartinput.disabled = false;
                    strokecolorinput.disabled = false;
                    strokewidthinput.disabled = false;
                    fillcolorinput.disabled = false;
                });
                shapeDropdown.addEventListener("change", function() {
                    selectedCluster.shape = this.value;
                    redrawmandala(mandala, clustersData);
                });
                widthinput.addEventListener("input", function() {
                    selectedCluster.width = Number(this.value);
                    redrawmandala(mandala, clustersData);
                });
                heightinput.addEventListener("input", function() {
                    selectedCluster.length = Number(this.value);
                    redrawmandala(mandala, clustersData);
                });
                offsetinput.addEventListener("input", function() {
                    selectedCluster.offset = Number(this.value);
                    redrawmandala(mandala, clustersData);
                });
                anglestartinput.addEventListener("input", function() {
                    selectedCluster.angleStart = Number(this.value);
                    redrawmandala(mandala, clustersData);
                });
                strokecolorinput.addEventListener("input", function() {
                    selectedCluster.svgAttrs["stroke"] = this.value;
                    redrawmandala(mandala, clustersData);
                });
                strokewidthinput.addEventListener("input", function() {
                    selectedCluster.svgAttrs["stroke-width"] = this.value;
                    redrawmandala(mandala, clustersData);
                });
                fillcolorinput.addEventListener("input", function() {
                    selectedCluster.svgAttrs["fill"] = this.value;
                    redrawmandala(mandala, clustersData);
                });
            }
        }
    }
    
})

function setColorValue(element, color) {
    color ??= ''; //default color
    if (color === 'none') {
        color = '';
    }
    if (color.length == 4) {
        color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
    }
    element.value = color;
    element.nextElementSibling.value = color;
}

function redrawmandala(mandala, clustersData) {
    mandala.removeAllShapes();
    clustersData.forEach(cluster => addShapes(mandala, cluster));
}

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
