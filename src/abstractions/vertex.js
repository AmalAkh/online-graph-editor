import ElementProperty from "./element-property";
import GraphElement from "./graph-element";
export default class Vertex extends GraphElement
{
    connectedVertices;
    constructor(x,y)
    {
        super("Vertex",x,y, "VertexSVG");
        this.connectedVertices = new Map();

        this.properties["name"] = new ElementProperty("name", "Name", String(this.id), "text");
        this.properties["color"] = new ElementProperty("color", "Color", "#424242", "color");
        this.properties["text-color"] = new ElementProperty("text-color", "Text color", "#424242", "color");
        


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