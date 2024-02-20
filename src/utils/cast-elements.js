//this function casts from object parsed from json to corresponding typed objects
import Vertex from "../abstractions/vertex";
export default function(elements)
{
    let castedElements = []
    for(let el of elements)
    {
        if(el.name == "Vertex")
        {
            
            castedElements.push(Vertex.castFromObject(el));
        }else
        {
            castedElements.push(el);
        }
    }
    return castedElements;
}