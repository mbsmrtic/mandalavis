import { shapeClasses, createShape } from "/static/js/shapes/shapefactory.js";
import { DropDownField, ColorField, SliderField, AngleStartSlider, DeleteButtonField, 
    AddButtonField, PredefinedColorsField } from "/static/js/cpfield.js"
import { MandalaData } from "/static/js/mandaladata.js"

export class ControlPanel {
    constructor(parentElement, clustersData, mandala) {
        this.parentElement = parentElement;
        this.clustersData = new MandalaData(clustersData); //clustersData;
        this.mandala = mandala;
        this.fieldInstArray = [];

        // levels/clusters dropdown
        let clustersDropdown = new DropDownField('#clusterdropdown', parentElement);
        //fill options
        // const levelArray = this.clustersData.makeLevelsArray();
        // clustersDropdown.addData(levelArray, 'level');
        this.fieldInstArray.push(clustersDropdown);
        this.fillLevelsDropdown();

        // shapes dropdown
        let shapesDropdown = new DropDownField('#shapedropdown', parentElement, 'shape');
        const shapeArray = [];
        for (let shapeName in shapeClasses) {
            let shape = shapeClasses[shapeName];
            if (shape.includeInControlPanel) {
                shapeArray.push({ id: shape.name, name: shape.name});  //add id, name to the array
            }
        }
        shapesDropdown.addData(shapeArray, 'shape');
        this.fieldInstArray.push(shapesDropdown);

        // predefined colors dropdown
        //  todo - maybe create separate classes for these dropdowns in which they
        //    fill themselves
        let pdColorsDropdown = new PredefinedColorsField('#fillcolordropdown', parentElement, 'svgAttrs.fill');
        const colors = pdColorsDropdown.loadPresetColors();
        //pdColorsDropdown.addData(colors, 'color');
        this.fieldInstArray.push(pdColorsDropdown);

        this.fieldInstArray.push(new SliderField('#widthinput', parentElement, 'width'));
        this.fieldInstArray.push(new SliderField('#heightinput', parentElement, 'length'));
        this.fieldInstArray.push(new SliderField('#offset', parentElement, 'offset'));
        this.fieldInstArray.push(new AngleStartSlider('#anglestart', parentElement, 'angleStart'));
        this.fieldInstArray.push(new ColorField('#strokecolor', parentElement, 'svgAttrs.stroke'));
        this.fieldInstArray.push(new SliderField('#strokewidth', parentElement, 'svgAttrs.stroke-width'));
        this.fieldInstArray.push(new ColorField('#fillcolor', parentElement, 'svgAttrs.fill'));
        this.fieldInstArray.push(new DeleteButtonField('#delete-mandala-level', parentElement, 'clusters', true));
        this.fieldInstArray.push(new AddButtonField('#add-mandala-level', parentElement, 'clusters', true));
        
        //add all the change event listeners
        this.handleLevelDropdownChange = this.handleLevelDropdownChange.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        for (let fieldInst of this.fieldInstArray) {
            let etype = fieldInst.eventTypeToHandle();
            if (fieldInst.elementId == '#clusterdropdown')
                fieldInst.element.addEventListener(etype, this.handleLevelDropdownChange);
            else 
                fieldInst.element.addEventListener(etype, this.handleFieldChange); 
        }
    }

    fillLevelsDropdown(idOfLevel = -1) {
        // get the levels dropdown field instance
        let clustersDropdownInst = this.fieldInstArray.find(fieldInst => fieldInst.elementId == '#clusterdropdown');
        const levelArray = this.clustersData.makeLevelsArray();
        clustersDropdownInst.addData(levelArray, 'level');
        if (idOfLevel >= 0) {
            clustersDropdownInst.selectIndex(this.clustersData.indexFromId(idOfLevel));
        }
    }

    handleLevelDropdownChange(event) {
        // get the selected level/cluster
        const selectedIndex = event.target.selectedIndex;
        const selectedCluster = this.clustersData.levelData(selectedIndex - 1);
        this.selectedCluster = selectedCluster;
        if (! selectedCluster) {
            //disable all the fields
            this.disableFields();
            return;
        }
        // otherwise make sure they are all enabled
        this.disableFields(false);
        // set the other fields to the values for the selected level/cluster
        for (let fieldInst of this.fieldInstArray) {
            fieldInst.setValueFromData(selectedCluster);
        }
    }

    handleFieldChange(event) {
        let elementid = '#' + event.target.id;  //e.g. shapedropdown
        let targetFieldInst = this.fieldInstArray.find(fieldInst => fieldInst.elementId == elementid);
        let idOfItem = targetFieldInst.setValueInData(this.selectedCluster, this.clustersData);
        if (targetFieldInst.isLevelsChange) {
            this.fillLevelsDropdown(idOfItem);
        }
        if (idOfItem < 0) {
            this.disableFields();
        }

        let clustersDropdownInst = this.fieldInstArray.find(fieldInst => fieldInst.elementId == '#clusterdropdown');
        clustersDropdownInst.element.dispatchEvent(new Event('change'));
        this.redrawmandala();
    }

    //adds and deletes
    handleLevelChange(event) {
        let elementid = '#' + event.target.id; 
        let targetFieldInst = this.fieldInstArray.find(fieldInst => fieldInst.elementId == elementid);
        targetFieldInst.setValueInData(this.selectedCluster, this.clustersData);
    }

    disableFields(disable = true) {
        for (let fieldInst of this.fieldInstArray) {
            //The level/cluster dropdown we always leave enabled
            if (fieldInst.elementId != "#clusterdropdown" && fieldInst.elementId != "#add-mandala-level")
                fieldInst.disable(disable);
        }
    }

    redrawmandala() {
        this.mandala.removeAllShapes();
        //loop through adding each cluster - sorted by zindex
        let levels = this.clustersData.allLevelsData();
        for (let level of levels) {
            var svgAttrs = level['svgAttrs'] || null;
            var newShape = createShape(level.shape, {
                clusterid: level.id,
                offset: level.offset,
                width: level.width,
                length: level.length,
                howMany: level.data.length,
                angleStart: (level['angleStart'] || 0),
                toolTipText: level.data,
            }, svgAttrs, level['tiltLeft']);
            this.mandala.addShape(newShape);
        }
    }
}

