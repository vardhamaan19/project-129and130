scorerightwrist=0;

scoreleftwrist=0;


song1="Marshmello, Demi Lovato - OK Not To Be OK (Pendona.com).mp3";
song2="BTS-Dynamite-(TrendyBeatz.com).mp3";

leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;

function preload()
{
    song1=loadSound("Marshmello, Demi Lovato - OK Not To Be OK (Pendona.com).mp3");
    song=loadSound("BTS-Dynamite-(TrendyBeatz.com).mp3");
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    //video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
    console.log("modelloaded");
}

function draw()
{
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(scorerightwrist>0.2 ) {
        circle(rightwristX,rightwristY,20);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("song").innerHTML="playing Marshmello, Demi Lovato - OK Not To Be OK (Pendona.com).mp3";
        }
    }

    if(scoreleftwrist>0.2 ) {
        circle(leftwristX,leftwristY,20);
        song1.stop();
        if(song2_status==false){
            song2.play();
            document.getElementById("song").innerHTML="BTS-Dynamite-(TrendyBeatz.com).mp3";
        }
    }

}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0) {
        console.log (results);
        scorerightwrist=results[0].pose.keypoints[10].score;
        scoreleftwrist=results[0].pose.keypoints[9].score;
        leftwristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftwristX="+leftwristX+"leftwristY="+leftwristY);
        rightwristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightwristX="+rightwristX+"rightwristY="+rightwristY);
        
    }
}