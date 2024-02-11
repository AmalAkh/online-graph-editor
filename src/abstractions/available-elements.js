import VertexSVG from './../components/VertexSVG.vue'
import EdgeSVG from './../components/EdgeSVG.vue';
import DirectedEdgeSVG from './../components/DirectedEdgeSVG.vue';



import ElementListItem from './element-list-item';

const availableElements = new Map();


availableElements.set("Vertex", new ElementListItem("Vertex", "circle", VertexSVG));

availableElements.set("Edge", new ElementListItem("Edge", "minus", EdgeSVG));

availableElements.set("DirectedEdge", new ElementListItem("Directed edge", "arrow-right-long", DirectedEdgeSVG));



export default availableElements;