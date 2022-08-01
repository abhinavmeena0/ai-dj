song="";
leftwristx=0;
rightwristx=0;
leftwristy=0;
rightwristy=0;
scorerightwrist=0;
scoreleftwrist=0;
function preload()
{
    song=loadSound("Lovely(PagalWorld).mp3");
}

function setup(){
video=createCapture(VIDEO);
canvas=createCanvas(600,500);
video.hide();
canvas.center();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("leftwristx=" + leftwristx + "leftwristy =")

    scorerightwrist=results[0].pose.keypoints[10].score;
    scoreleftwrist=results[0].pose.keypoints[9].score;
    }
}

function modelLoaded(){
    console.log('Model Is Inaitialized !');
}

function draw(){
    image(video,0,0,600,500);
    stroke("#FF0000");
    fill("#FF0000");
    circle(rightwristx,rightwristy,20);
   
    if(rightwristy > 0 && rightwristy <=100){
        document.getElementById("speed").innerHTML="speed = 0.5";
        song.setRate(0.5);
    }
    
    
    else if(rightwristy > 100 && rightwristy <=200){
        document.getElementById("speed").innerHTML="speed = 1";
        song.setRate(1);
    }

    else if(rightwristy > 200 && rightwristy <=300){
        document.getElementById("speed").innerHTML="speed = 1.5";
        song.setRate(1.5);
    }

    else if(rightwristy > 300 && rightwristy <=400){
        document.getElementById("speed").innerHTML="speed = 2";
        song.setRate(2);
    }

    else if(rightwristy > 400 && rightwristy <=500){
        document.getElementById("speed").innerHTML="speed = 2.5";
        song.setRate(2.5);
    }


    circle(leftwristx,leftwristy,20) ;
    inNumberLeftWristY=Number(leftwristy);
    removeDecimel_leftWristY=floor(inNumberLeftWristY);
    volume=removeDecimel_leftWristY/500;
   document.getElementById("volume").innerHTML="volume = "+volume;
   song.setVolume(volume);
    
}

function play(){
song.play();    
song.setVolume(1);
song.rate(1);
}