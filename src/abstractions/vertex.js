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
        let target = Object.assign(new Vertex(obj.x, obj.y), obj);
        
        console.log(obj.connectedVertices);
        target.connectedVertices = new Map(Object.entries(obj.connectedVertices).map((con)=>
        {
            return [Number(con[0]), [...con[1]]]
        }));
        return target;
    }
    addConnection(vertexId, edgeId)
    {
        if(this.connectedVertices.has(vertexId))
        {
            
            this.connectedVertices.set(vertexId, [...this.connectedVertices.get(vertexId), edgeId]);
        }else
        {
            this.connectedVertices.set(vertexId, [edgeId]);
        }
    }
}