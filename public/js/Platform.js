import { DeltaTime, gamestart } from "./Main.js";
import { velocity } from "./Character.js";
import { SpawnCollectable , MoveCollectables } from "./Collectable.js";
import { intersection, distance, inBounds } from "./Game.js";



let collisionPlatformY;
let minDistance = 15;
let startplatforms = 12;
let platformHeight = 3;
let minPlatforms = 8;
let collisionDistance;
let platforms;
let player;
let platformVY = 6;


export function Collision(){

    platforms = document.getElementsByClassName("platform");

    player = document.getElementById("player").getBoundingClientRect();

    let bottomEdgePlayerA = [player.left , (player.top+player.height)];
    let bottomEdgePlayerB = [(player.left+player.width) , (player.top+player.height)];

    collisionDistance = (velocity+platformVY)/2;

    for(let i = 0; i<platforms.length; i++){

        let platformBounds = platforms[i].getBoundingClientRect();

        let topEdgePlatformA = [platformBounds.left , platformBounds.top ,  , platformBounds.top];
        let topEdgePlatformB = [(platformBounds.left+platformBounds.width) , platformBounds.top];

        let intersectionA = intersection(topEdgePlatformA, topEdgePlatformB, bottomEdgePlayerA);
        let intersectionB = intersection(topEdgePlatformA, topEdgePlatformB, bottomEdgePlayerB);

        let distanceA = distance(bottomEdgePlayerA, intersectionA);
        let distanceB = distance(bottomEdgePlayerB, intersectionB);

        if(abovePlatform(platformBounds)&&distanceA<=collisionDistance&&inBounds(intersectionA, topEdgePlatformA, topEdgePlatformB)){
            
            collisionPlatformY = parseFloat(platforms[i].style.top);
            return true;
        } else if(abovePlatform(platformBounds)&&distanceB<=collisionDistance&&inBounds(intersectionB, topEdgePlatformA, topEdgePlatformB)){

            collisionPlatformY = parseFloat(platforms[i].style.top);
            return true;
        }

    }

    return false;

}

export function PlatformVY(){

    return platformVY;
}

export function YPosition(){

    return collisionPlatformY;
}

export function MovePlatforms(){

    platformVY += 0.01;

    platforms = document.getElementsByClassName("platform");

    if(platforms.length<minPlatforms){

        let parent = document.getElementById("platforms");
        let newChild = newPlatform();
        newChild.style.top = 0+"%";

        if(platforms.length>0){
            if(!checkPlatformDistances(parent, newChild)){

                SpawnCollectable(platformCenter(newChild));

                parent.appendChild(newChild);
            }
        }
    }

    for(let i = 0; i<platforms.length; i++){

        let platformPosY = parseFloat(platforms[i].style.top);
        platforms[i].style.top = platformPosY+platformVY*(DeltaTime()*0.001)+"%";

        if((parseFloat(platforms[i].style.top)+parseFloat(platforms[i].style.height))+5>100){

            destroyPlatform(platforms[i]);

            let parent = document.getElementById("platforms");
            let newChild = newPlatform();
            newChild.style.top = 0+"%";

            if(platforms.length>0){
                if(!checkPlatformDistances(parent, newChild)){

                    SpawnCollectable(platformCenter(newChild));

                    parent.appendChild(newChild);
                }
            }
        } else if(platformPosY <= 100/10&&gamestart) {

            platforms[i].children[0].innerHTML = "Platform.init();";
        } else if(platformPosY >= ((100/10)*9)&&gamestart) {

            platforms[i].children[0].innerHTML = "Platform.destroy();";
        } else if(gamestart){

            platforms[i].children[0].innerHTML = "Platform.fall();";
        }

    }

    MoveCollectables(platformVY);
}

function platformCenter(platform){

    return parseFloat(platform.style.left)+(parseFloat(platform.style.width)/2);

}

function destroyPlatform(platform){

    platform.parentNode.removeChild(platform);

}

function newPlatform(){

    let child = document.createElement("div");
    child.className = "platform";
    child.style.width = getRandomArbitrary(9, 15)+"%";
    child.style.height = platformHeight+"%";
    child.style.left = getRandomArbitrary(0, (100-parseInt(child.style.width)))+"%";
    let text = document.createElement("p");
    text.className = "text";
    text.innerHTML = "Platform.init();"
    child.appendChild(text);
    return child;

}



function abovePlatform(edgeBounds){

    if((player.top+player.height)<edgeBounds.top+5){
        return true;
    }

    return false;


}

// Instantiates Platforms
export function InstantiatePlatforms(){

    let parent = document.getElementById("platforms");

    for(let i = 0; i<=startplatforms; i++){

        let child = newPlatform();
        child.style.top = getRandomArbitrary(0, (100-parseInt(child.style.height)))+"%";

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

    let platformCenter = [(parseInt(platform.style.top)+(parseInt(platform.style.height)/2)) , (parseInt(platform.style.left)+(parseInt(platform.style.width)/2))];

    for(let i = 0; i<parent.children.length; i++){

        let currCenter = [(parseInt(parent.children[i].style.top)+(parseInt(parent.children[i].style.height)/2)) , (parseInt(parent.children[i].style.left)+(parseInt(parent.children[i].style.width)/2))];

        if(distance(platformCenter, currCenter)<=minDistance){

            return true;
        }
    }

    return false;

}

function getRandomArbitrary(min, max) {

    return Math.random() * (max - min) + min;
}
  
