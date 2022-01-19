

let red = 0;
let green = 150;
let blue = 255;
let redDirection = true;
let greenDirection = true;
let blueDirection = true;

// Backgroundcolor Fade Animation
export function ChangeBG(){

    redDirection = checkDirection(red, redDirection);
    greenDirection = checkDirection(green, greenDirection);
    blueDirection = checkDirection(blue, blueDirection);

    red = iterateColor(red, redDirection);
    green = iterateColor(green, greenDirection);
    blue = iterateColor(blue, blueDirection);

    let color = "rgb("+red+","+green+","+blue+")";

    document.body.style.backgroundColor = color;

}


function iterateColor(color, direction){

    if(direction){
        color++;
    }else{
        color--;
    }

    return color;
}

function checkDirection(color, direction){

    if(color>=255){
        direction = false;
    }
    if(color<=0){
        direction = true;
    }

    return direction;

}
    
   

