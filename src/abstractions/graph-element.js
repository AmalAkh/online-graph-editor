export default class GraphElement
{
    
    x = 100;y = 100;
    componentName = "";
    constructor(name, x, y, componentName)
    {
        this.name = name;
        this.x = x;
        this.y = y;
        this.componentName = componentName;
    }
}