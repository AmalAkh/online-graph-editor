import { defineStore } from "pinia";

let useEditorDataStore = defineStore("editor-data-store", 
{
    state:()=>({selectedElement:null, currentElements:[], draggingMode:"", newElementName:"", zoom:1}),
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
        zoomin()
        {
            this.zoom+=0.1;

        },
        zoomout()
        {
            this.zoom-=0.1
        }
    }
});

export default useEditorDataStore;