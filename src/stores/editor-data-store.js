import { defineStore } from "pinia";

let useEditorDataStore = defineStore("editor-data-store", 
{
    state:()=>({selectedElement:null, currentElements:[], editingMode:"", newElementName:""})
});

export default useEditorDataStore;