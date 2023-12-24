import VerticeSVG from './../components/VerticeSVG.vue'


import ElementListItem from './element-list-item';

const availableElements = new Map();


availableElements.set("Vertice", new ElementListItem("Vertice", "circle", VerticeSVG));

availableElements.set("Vertice2", new ElementListItem("Vertice2", "circle", VerticeSVG));



export default availableElements;