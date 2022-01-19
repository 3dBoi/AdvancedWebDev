
let collisionPlatformY;
let minDistance = 300;
let platformcount = 10;
let platformHeight = 30;
let collisionDistance = 35;


export function Collision(){

    let platforms = document.getElementsByClassName("platform");

    let player = document.getElementById("player").getBoundingClientRect();

    let bottomEdgePlayerA = [player.left , (player.top+player.height)];
    let bottomEdgePlayerB = [(player.left+player.width) , (player.top+player.height)];

    for(let i = 0; i<platforms.length; i++){

        let platformBounds = platforms[i].getBoundingClientRect();

        let topEdgePlatform = [platformBounds.left , platformBounds.top , (platformBounds.left+platformBounds.width) , platformBounds.top];
        let vectorEdge = [topEdgePlatform[2]-topEdgePlatform[0] , topEdgePlatform[3]-topEdgePlatform[1]];

        let intersectionA = intersection(bottomEdgePlayerA, topEdgePlatform, vectorEdge);
        let intersectionB = intersection(bottomEdgePlayerB, topEdgePlatform, vectorEdge);

        let distanceA = distance(bottomEdgePlayerA, intersectionA);
        let distanceB = distance(bottomEdgePlayerB, intersectionB);

        if(distanceA<=collisionDistance&&inBounds(intersectionA, topEdgePlatform, vectorEdge)){
            
            collisionPlatformY = platformBounds.top;
            return true;
        } else if(distanceB<=collisionDistance&&inBounds(bottomEdgePlayerB, topEdgePlatform, vectorEdge)){

            collisionPlatformY = platformBounds.top;
            return true;
        }

    }

    return false;

}

export function YPosition(){

    return collisionPlatformY;
}

function intersection(pointPlayer , edge, vectorEdge){

    let orth = [vectorEdge[1], -vectorEdge[0]];

    let detA = determinante((pointPlayer[0]-edge[0]) , orth[0] , (pointPlayer[1]-edge[1]) , orth[1]);
    let detB = determinante(vectorEdge[0] , orth[0] , vectorEdge[1] , orth[1]);

    let r = detA/detB;

    let intersection = [edge[0]+r*vectorEdge[0] , edge[1]+r*vectorEdge[1]];

    return intersection;

}

// distance of 2 Points
function distance(p1, p2){

    return Math.sqrt(Math.pow(p1[0]-p2[0], 2)+ Math.pow(p1[1]-p2[1], 2));
}

// Check if intersection is between points
function inBounds(intersection, edge, vectorEdge){
    
    let tx,ty;

    if(vectorEdge[0]!=0){

        tx = (intersection[0] - edge[0]) / vectorEdge[0];
    } else {

        tx = 0;
    }

    if(vectorEdge[1]!=0){

        ty = (intersection[1] - edge[1]) / vectorEdge[1];
    } else {

        ty = 0;
    }

    if(tx <= 1 && tx >= 0 && ty <= 1 && ty >= 0) {
        return true;
    } else {
        return false;
    }
}

function determinante(a11, a12, a21, a22){

    return (a11*a22) - (a21*a12);
}

// Instantiates Platforms
export function InstantiatePlatforms(){

    let parent = document.getElementById("platforms");

    for(let i = 0; i<=platformcount; i++){

        let child = document.createElement("div");
        child.className = "platform";
        child.style.width = getRandomArbitrary(150, 300)+"px";
        child.style.height = platformHeight+"px";
        child.style.top = getRandomArbitrary(0, (window.innerHeight-parseInt(child.style.height)))+"px";
        child.style.left = getRandomArbitrary(0, (window.innerWidth-parseInt(child.style.width)))+"px";

        if(i>0){
            if(!checkPlatformDistances(parent, child)){
                parent.appendChild(child);
            } else {
                i--;
            }
        }
    }
}

// Check if another Platform is near
function checkPlatformDistances(parent, platform){

    let platformCenter = [(parseInt(platform.style.top)+parseInt(platform.style.height)) , (parseInt(platform.style.left)+parseInt(platform.style.width))];

    for(let i = 0; i<parent.children.length; i++){

        let currCenter = [(parseInt(parent.children[i].style.top)+parseInt(parent.children[i].style.height)) , (parseInt(parent.children[i].style.left)+parseInt(parent.children[i].style.width))];

        if(distance(platformCenter, currCenter)<=minDistance){

            return true;
        }
    }

    return false;

}

function getRandomArbitrary(min, max) {

    return Math.random() * (max - min) + min;
  }
  
