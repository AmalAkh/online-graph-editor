import generateId from "../utils/generate-id";

export default class GraphElement
{
    
    x = 100;y = 100;
    componentName = "";//name of the vue component
    id;
    constructor(name, x, y, componentName)
    {
        
        this.name = name;//just the name of an element
        this.x = x;
        this.y = y;
        this.componentName = componentName;
        this.id = generateId();
    }
}