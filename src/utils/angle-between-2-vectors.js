export default function angleBetween2Vectors(x1,y1,x2,y2)
{
    let v1= [4,0];
    let v2 = [x2-x1, y2-y1];

    let part = Math.sqrt(Math.pow(v1[0],2)+Math.pow(v1[1],2))*Math.sqrt(Math.pow(v2[0],2)+Math.pow(v2[1],2))
    let val = (v1[0]*v2[0]+v1[1]*v2[1])/part;
    return Math.acos(val)*(180/Math.PI);
  
}
