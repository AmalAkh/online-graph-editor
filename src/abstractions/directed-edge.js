import Edge from "./edge";
import GraphElement from "./graph-element";
export default class DirectedEdge extends GraphElement
{
    
    constructor(x1,y1,x2,y2, weight=null)
    {
        super("DirectedEdge",[x1,x2],[y1,y2], "DirectedEdgeSVG");
        this.bezierPointX = (x1+x2)/2;
        this.bezierPointY = (y1+y2)/2;
        this.weight = null;
    }
}