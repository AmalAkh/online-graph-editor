import generateId from "../utils/generate-id";

export default class GraphElement
{
    
    x = 100;y = 100;
    componentName = "";
    id;
    constructor(name, x, y, componentName)
    {
        this.name = name;
        this.x = x;
        this.y = y;
        this.componentName = componentName;
        this.id = generateId();
    }
}