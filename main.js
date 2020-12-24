objects=[];
status="";
function setup()
{
canvas=createCanvas(550,420);
canvas.center();
video=createCapture(VIDEO);
video.hide();
video.size(550,420);
}

function start()
{
objectDetector=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="Status:Detecting Objects";
object_name=document.getElementById("objectname").value;
}

function modelLoaded()
{
    console.log("modelLoaded");
    status=true;
}

function gotResult(error,results)
{
if(error)
{
console.log(error);
}
else{ 
    console.log(results);
    objects=results;
}
}

function draw()
{
image(video,0,0,550,420);
if(status!="")
{
objectDetector.detect(video,gotResult);
for(i=0;i<objects.length;i++)
{
document.getElementById("status").innerHTML="Status:Objects Detected";
fill("#FF0000");
percent=floor(objects[i].confidence*100);
text(objects[i].label +""+percent+"%",objects[i].x,objects[i].y);
noFill();
stroke("#FF0000");
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
if(objects[i].label==object_name)
{
video.stop();
objectDetector.detect(gotResult);
document.getElementById("status").innerHTML=object_name+"found";
synth=window.speechSynthesis;
utterThis=new SpeechSynthesisUtterance(object_name+"found");
synth.speak(utterThis);
}
else{
document.getElementById("status").innerHTML=object_name+"not found";

}
}


}

}