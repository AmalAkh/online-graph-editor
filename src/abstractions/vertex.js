import GraphElement from "./graph-element";
export default class Vertex extends GraphElement
{
    connectedVertices;
    constructor(x,y)
    {
        super("Vertex",x,y, "VertexSVG");
        this.connectedVertices = new Map();

    }
    static castFromObject(obj)
    {
        let target = new Vertex(obj.x,obj.y);
        target.connectedVertices = new Map(target.connectedVertices);
        return target;
    }
    addConnection(vertexId, edge)
    {
        if(this.connectedVertices.has(vertexId))
        {
            
            this.connectedVertices.set(vertexId, [...this.connectedVertices.get(vertexId), edge.id]);
        }else
        {
            this.connectedVertices.set(vertexId, [edge.id]);
        }
    }
}