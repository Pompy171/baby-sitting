
status = "";
objects = "";
alarm="";

function preload()
{
    alarm = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(630, 420);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    object_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    
}

function draw() {
    image(video, 0, 0, 630, 420);
    if(status!=""){
        object_detector.detect(video,gotResult);

        for (i = 0; i < objects.length; i++) {
            
            if (objects[i].label=="person") {
                
                document.getElementById("baby_idenytify").innerHTML = "Baby Found";
                alarm.stop();
            }
    
            else{
                document.getElementById("baby_idenytify").innerHTML = "Baby Not Found";
                alarm.play();
            }
    
            
    
        }
    }
    

}

function modelLoaded() {
    console.log("MODEL LOADED");

    status = true;
    object_detector.detect(video, gotResult);

}

function gotResult(error, results) {

    if (error == true) {
        console.error(error);
    }

        console.log(results);

        objects = results;
}