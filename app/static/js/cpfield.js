class CPField {
    constructor(elementId, parentElement, dataFieldName='', isLevelsChange=false) {
        this.elementId = elementId;
        this.value = null; //?
        this.element = parentElement.querySelector(elementId);
        this.dataFieldName = dataFieldName;
        this.dataFieldNames = dataFieldName.split('.');
        this.isLevelsChange = isLevelsChange;
    }
    // Some fields (e.g. dropdowns) will need some data
    addData(data = null, itemname='') {}

    setValue(value) {
        this.element.value = value;
    }
    getValue(value) {
        return this.element.value;
    }
    setParentElement(element) {
        this.element = parentElement.querySelector(this.elementId);
    }
    setValueFromData(cluster) {
        if (this.dataFieldName == '')
            return;
        if (this.dataFieldNames.length > 1) {
            let structName = this.dataFieldNames[0];
            let fieldName = this.dataFieldNames[1];
            let dataStruct = cluster[structName];
            if (! dataStruct) {
                let newStruct = {};
                newStruct[fieldName] = '';
                cluster[structName] = newStruct;
                this.setValue('');
            }
            if (dataStruct) {
                let dataValue = dataStruct[this.dataFieldNames[1]];
                this.setValue(dataValue);
            }
        }
        else {
            this.setValue(cluster[this.dataFieldNames[0]]);
        }
    }
    // Changes the data within cluster (one of the items in clustersData)
    //   returns the id of the cluster that was affected. 
    setValueInData(cluster, clustersData) {
        if (this.dataFieldName == '')
            return;
        if (this.dataFieldNames.length > 1) {
            cluster[this.dataFieldNames[0]][this.dataFieldNames[1]] = this.getValue();
        }
        else {
            cluster[this.dataFieldNames[0]] = this.getValue();
        }
        return cluster.id;
    }
    disable(disable = true) {
        this.element.disabled = disable;
    }
    eventTypeToHandle() {
        return "input";
    }
    setMax(value) {};

}

export class DropDownField extends CPField {
    addData(dataArray, itemname) {
        //todo check to ensure dataArray is an array
        //  if it isn't, then put it into an array 
        //  e.g. shapeclasses ?
        this.element.innerHTML = `<option value = "" selected disabled hidden>-- Select ${itemname} --</option>`;
        dataArray.forEach(item => {
            const option = document.createElement("option");
            option.id = item.id;
            option.value = item.name;
            option.textContent = item.name;
            this.element.appendChild(option);
        })
    }

    selectIndex(iSelect) {
        // There is an additional item at the top ("select item")
        //   that is not in the data, so we increase the index by one. 
        this.element.selectedIndex = iSelect + 1;
        this.element.dispatchEvent(new Event("change"));
    }

    eventTypeToHandle() {
        return "change";
    }
};

export class SliderField extends CPField {
    setValue(value) {
        if (! value)
            return;
        // set the value within the slider
        this.element.value = Number(value);
        // set the value of the number next to the slider track
        this.element.nextElementSibling.value = value;
    }
    getValue() {
        return Number(this.element.value);
    }
    setMax(value) {
        this.element.max = Number(value);
    }
};

export class AngleStartSlider extends SliderField {
    setValueFromData(cluster) {
        this.setValue(cluster[this.dataFieldNames[0]]);
        this.setMax(360 / Number(cluster.data.length) - 1);
    }
}

export class ColorField extends CPField {
    setValue(color) {
        color ??= 'transparent'; //default color
        if (color === 'none' || color === '') {
            color = 'transparent';
            return;
        }
        // if the color is #rgb change it to #rrggbb
        if (color.length == 4) {
            color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
        }
        // set the value of the color in the color picker element
        this.element.value = (color == 'transparent') ? '#ffffff' : color;
        // set the value of the color in the text next to the picker element
        this.element.nextElementSibling.value = color;
    }
};

export class ButtonField extends CPField {
    eventTypeToHandle() {
        return "click";
    }
};

export class AddButtonField extends ButtonField {
    setValueInData(cluster, clustersData) {
        const newLevelName = prompt("Enter new level name");
        if (! newLevelName)
            return;
        const howMany = prompt("How many items?", 6);
        if (! howMany)
            return;
        const numHowMany = parseInt(howMany) || 6;
        let newId = clustersData.createLevel(newLevelName, numHowMany);
        return newId;
    }
};

export class DeleteButtonField extends ButtonField {
    // Here we don't return the id of the deleted cluster since it 
    //  no longer exists. We instead return the id of the first item. 
    setValueInData(cluster, clustersData) {
        clustersData.deleteLevel(cluster);
        return clustersData.idFromIndex(0);
    }
};