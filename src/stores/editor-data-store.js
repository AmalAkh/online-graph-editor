import { defineStore } from "pinia";

let useEditorDataStore = defineStore("editor-data-store", 
{
    state:()=>({selectedElement:null, currentElements:[], draggingMode:"", newElementName:""})
});

export default useEditorDataStore;