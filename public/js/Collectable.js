import {velocity} from "./Character.js";
import {DeltaTime} from "./Main.js";
import { intersection, distance, inBounds } from "./Game.js";


let parent = document.getElementById("collectables");
let collisionDistance;
let radius = 1;
let points = 10000;

// Collision between Player and Collectable
function collectableCollision(){

    let player = document.getElementById("player").getBoundingClientRect();

    let collectables = document.getElementsByClassName("collectable");
    
    let bottomEdgePlayerA = [player.left , (player.top+player.height)];
    let bottomEdgePlayerB = [(player.left+player.width) , (player.top+player.height)];

    let topEdgePlayerA = [player.left , player.top];
    let topEdgePlayerB = [(player.left+player.width) , player.top];

    let leftEdgePlayerA = [player.left , player.top];
    let leftEdgePlayerB = [player.left , (player.top+player.height)];

    let rightEdgePlayerA = [(player.left+player.width) , player.top];
    let rightEdgePlayerB = [(player.left+player.width) , (player.top+player.height)];

    collisionDistance = 15;

    for(let i = 0; i<collectables.length; i++){

        let collectableBounds = collectables[i].getBoundingClientRect();
        let collectableCenter = [collectableBounds.left+(collectableBounds.width/2) , collectableBounds.top+(collectableBounds.height/2)];

        let intersectionBottom = intersection(bottomEdgePlayerA, bottomEdgePlayerB, collectableCenter);
        let intersectionTop = intersection(topEdgePlayerA, topEdgePlayerB, collectableCenter);
        let intersectionLeft = intersection(leftEdgePlayerA, leftEdgePlayerB, collectableCenter);
        let intersectionRight = intersection(rightEdgePlayerA, rightEdgePlayerB, collectableCenter);

        let distanceBottom = Math.abs(distance(collectableCenter, intersectionBottom));
        let distanceTop = Math.abs(distance(collectableCenter, intersectionTop));
        let distanceLeft = Math.abs(distance(collectableCenter, intersectionLeft));
        let distanceRight = Math.abs(distance(collectableCenter, intersectionRight));

        if((distanceBottom-radius)<=collisionDistance&&inBounds(intersectionBottom, bottomEdgePlayerA, bottomEdgePlayerB)){
            
            destroyCollectable(collectables[i]);
            return true;
        } else if((distanceTop-radius)<=collisionDistance&&inBounds(intersectionTop, topEdgePlayerA, topEdgePlayerB)){

            destroyCollectable(collectables[i]);
            return true;
        } else if((distanceLeft-radius)<=collisionDistance&&inBounds(intersectionLeft, leftEdgePlayerA, leftEdgePlayerB)){

            destroyCollectable(collectables[i]);
            return true;
        } else if((distanceRight-radius)<=collisionDistance&&inBounds(intersectionRight, rightEdgePlayerA, rightEdgePlayerB)){

            destroyCollectable(collectables[i]);
            return true;
        }

    }

    return false;

}

function destroyCollectable(collectable){

    collectable.parentNode.removeChild(collectable);
}

// If Player collides with Collectable something happens
export function Collect(){

    if(collectableCollision()){
        return points;
    }

    return 0;

}

// Spawn Collectables randomly on Platform
export function SpawnCollectable(center){

    let random = Math.floor(getRandomArbitrary(0,5));

    if(random==0){

        let newChild = newCollectable(center);

        parent.appendChild(newChild);
    }


}

// Move Collectables at speed of platforms
export function MoveCollectables(speed){

    let collectables = document.getElementsByClassName("collectable");

    for(let i = 0; i<collectables.length; i++){

        let collectablePosY = parseFloat(collectables[i].style.top);
        collectables[i].style.top = collectablePosY+speed*(DeltaTime()*0.001)+"%";

        if((parseFloat(collectables[i].style.top)+parseFloat(collectables[i].style.height))+5>100){

            destroyCollectable(collectables[i]);
        }
    }


}

function newCollectable(center){

    let child = document.createElement("div");
    child.className = "collectable";
    child.style.width = radius*2+"%";
    child.style.height = (((radius*2/100)*window.innerWidth)/window.innerHeight)*100+"%";
    child.style.top = -6+"%";
    child.style.left = center-radius+"%";
    return child;

}

function getRandomArbitrary(min, max) {

    return Math.random() * (max - min) + min;
}