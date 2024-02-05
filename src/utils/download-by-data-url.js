export default function(url, name="file")
{
   
    let a = document.createElement("a");
    a.href = url;
    
    a.download = name;

    document.body.append(a);
    a.style.display = "none";
    a.click();
    a.remove();
    
}