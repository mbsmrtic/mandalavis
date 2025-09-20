/**
 * @file mandaladata.js
 * @description Handles the data that is stored in the dom from which 
 *      we draw the mandala.
 */

export class MandalaData {
    constructor(data) {
        // Array where each item describes a mandala level 
        //   It's shape, color ...
        this.data = data;
    }
    idFromIndex(i) {
        if (i < this.data.length)
            return this.data[i].id;
        else if (this.data.length > 0) 
            return this.data[0].id;
        else 
            return -1;
    }
    indexFromId(id) {
        let index = this.data.findIndex(obj => obj.id == id);
        return index;
    }
    levelData(iLevel) {
        return this.data[iLevel];
    }
    allLevelsData() {
        return this.data
            .slice() // makes a shallow copy so that we don't mutate the original
            .sort((a, b) => a.zindex - b.zindex); //ascending by zindex
    }
    makeLevelsArray() {
        let levelsArray = [];
        this.data.forEach(cluster => {
            levelsArray.push({ id: cluster.id, name: cluster.clustername });
        })
        return levelsArray;
    }
    deleteLevel(levelDataItem) {
        const i = this.data.findIndex(obj => obj.id == levelDataItem.id);
        if (i !== -1) {
            this.data.splice(i, 1);
        }
    };
    createLevel(levelName, howMany, shapeName = "DropletShape") {
        // Create the data items
        let dataitems = [];
        for (let i = 1; i <= howMany; i++) {
            dataitems.push({desc: `${levelName} ${i}`});
        }
        // Create a unique id.
        // To get the max id we create an array of ids, ... spread the array into 
        //   numbers and get the max of those. 
        const maxId = Math.max(...this.data.map(i => i.id));
        const newId = maxId + 1;
        // Create the level and add it to the data.
        this.data.push({
            id: newId, clustername: levelName,
            shape: shapeName, length: 30, //height of the shape
            width: 27,
            offset: 5,  //distance from center
            angleStart: 0,
            data: dataitems
        });
        return newId;
    };
}
