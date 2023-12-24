import { defineStore } from "pinia";

let useEditorDataStore = defineStore("editor-data-store", 
{
    state:()=>({selectedElement:null, editingMode:"", newElementName:""})
});

export default useEditorDataStore;