import GraphElement from "./graph-element";
export default class Edge extends GraphElement
{
    weight;start; end;
    constructor(x1,y1,x2,y2)
    {
        super("Edge",[x1,x2],[y1,y2], "EdgeSVG");
        
    }
}