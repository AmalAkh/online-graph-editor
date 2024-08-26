import { defineStore } from "pinia";

let useEditorDataStore = defineStore("editor-data-store", 
{
    state:()=>({selectedElement:null, currentElements:[], draggingMode:"", previousDraggingMode:"", newElementName:"", zoom:1}),
    getters:
    {
        editorZoom:(state)=>
        {

            return Math.round(state.zoom*100)
        },
        editorWidth:(state)=>
        {
            return 400;
        },
        editorHeight:(state)=>
        {
            return 400;
        }
        
    },
    actions:
    {
        setSelectedElementProperty(name,e)
        {
            this.selectedElement.properties[name].value = e.target.value;
        },
        zoomin()
        {
            this.zoom+=0.1;

        },
        zoomout()
        {
            this.zoom-=0.1
        },
        removeElement(elId)
        {
            this.currentElements = this.currentElements.filter((el)=>el.id != elId)
        }
        
    }
});

export default useEditorDataStore;