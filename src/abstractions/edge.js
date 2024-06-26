import GraphElement from "./graph-element";
export default class Edge extends GraphElement
{
    weight;start; end;
    constructor(x1,y1,x2,y2, weight=null)
    {
        super("Edge",[x1,x2],[y1,y2], "EdgeSVG");
        this.bezierPointX = (x1+x2)/2;
        this.bezierPointY = (y1+y2)/2;
        this.weight = null;
    }
}