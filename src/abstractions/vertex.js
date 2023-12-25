import GraphElement from "./graph-element";
export default class Vertex extends GraphElement
{
    connectedVertices;
    constructor(x,y)
    {
        super("Vertex",x,y, "VertexSVG");
        this.connectedVertices = new Map();

    }
    addConnection(vertexId, edge)
    {
        if(this.connectedVertices.has(vertexId))
        {
            
            this.connectedVertices.set(vertexId, [...this.connectedVertices.get(vertexId), edge]);
        }else
        {
            this.connectedVertices.set(vertexId, [edge]);
        }
    }
}