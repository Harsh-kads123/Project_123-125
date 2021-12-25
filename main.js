noseX=0;
noseY=0;
difference=0;
left_wristX=0;
right_wristX=0;

function setup()
{
    video=createCapture(VIDEO);
    video.size(550,500);

    canvas=createCanvas(550,400);
    canvas.position(590,120);

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
    console.log('Posenet is initialized.');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
      console.log(results);
      noseX = results[0].pose.nose.x;
      noseY = results[0].pose.nose.y; 
      console.log("noseX = " + noseX + "noseY = " + noseY);

      left_wristX = results[0].pose.leftWrist.x;
      right_wristX = results[0].pose.rightWrist.x;
      difference = floor(left_wristX - right_wristX);
      console.log("Left Wrist X = " + left_wristX + " Right Wrist X = " + right_wristX + " Difference = " + difference);
  }
}

function draw()
{
    background('#adfff7');
    document.getElementById("square_side").innerHTML = "Width and Height of the square will be  = " + difference + "px";
    fill('#ff0f0f');
    stroke('#ff0000');
    square(noseX,noseY,difference);
}