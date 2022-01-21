import {velocity} from "./Character.js";
import {DeltaTime} from "./Main.js";


let parent = document.getElementById("collectables");
let collisionDistance;
let radius = 25;
let points = 10000;

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

    collisionDistance = 10;

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

        if(distanceBottom<=collisionDistance&&inBounds(intersectionBottom, bottomEdgePlayerA, bottomEdgePlayerB)){
            
            destroyCollectable(collectables[i]);
            return true;
        } else if(distanceTop<=collisionDistance&&inBounds(intersectionTop, topEdgePlayerA, topEdgePlayerB)){

            destroyCollectable(collectables[i]);
            return true;
        } else if(distanceLeft<=collisionDistance&&inBounds(intersectionLeft, leftEdgePlayerA, leftEdgePlayerB)){

            destroyCollectable(collectables[i]);
            return true;
        } else if(distanceRight<=collisionDistance&&inBounds(intersectionRight, rightEdgePlayerA, rightEdgePlayerB)){

            destroyCollectable(collectables[i]);
            return true;
        }

    }

    return false;

}

function intersection(edgePointA, edgePointB, point){

    let vectorEdge = [edgePointB[0]-edgePointA[0] , edgePointB[1]-edgePointA[1]];

    let orth = [vectorEdge[1], -vectorEdge[0]];

    let detA = determinante((point[0]-edgePointA[0]) , orth[0] , (point[1]-edgePointA[1]) , orth[1]);
    let detB = determinante(vectorEdge[0] , orth[0] , vectorEdge[1] , orth[1]);

    let r = detA/detB;

    let intersection = [edgePointA[0]+r*vectorEdge[0] , edgePointA[1]+r*vectorEdge[1]];

    return intersection;

}

function determinante(a11, a12, a21, a22){

    return (a11*a22) - (a21*a12);
}

function distance(p1, p2){

    return (Math.sqrt(Math.pow(p1[0]-p2[0], 2)+ Math.pow(p1[1]-p2[1], 2)))-radius;
}

function inBounds(intersection, edgePointA, edgePointB){

    let vectorEdge = [edgePointB[0]-edgePointA[0] , edgePointB[1]-edgePointA[1]];
    
    let tx,ty;

    if(vectorEdge[0]!=0){

        tx = (intersection[0] - edgePointA[0]) / vectorEdge[0];
    } else {

        tx = 0;
    }

    if(vectorEdge[1]!=0){

        ty = (intersection[1] - edgePointA[1]) / vectorEdge[1];
    } else {

        ty = 0;
    }

    if(tx <= 1 && tx >= 0 && ty <= 1 && ty >= 0) {
        return true;
    } else {
        return false;
    }
}

function destroyCollectable(collectable){

    collectable.parentNode.removeChild(collectable);
}

export function Collect(){

    if(collectableCollision()){
        return points;
    }

    return 0;

}

export function SpawnCollectable(center){

    let random = Math.floor(getRandomArbitrary(0, 3));

    if(random==1){

        let newChild = newCollectable(center);

        parent.appendChild(newChild);
    }


}

export function MoveCollectables(speed){

    let collectables = document.getElementsByClassName("collectable");

    for(let i = 0; i<collectables.length; i++){

        let collectablePosY = parseInt(collectables[i].style.top);
        collectables[i].style.top = collectablePosY+speed*(DeltaTime()*0.001)+"px";

        let collectableBounds = collectables[i].getBoundingClientRect();

        if((collectableBounds.top+collectableBounds.height)>window.innerHeight){

            destroyCollectable(collectables[i]);
        }
    }


}

function newCollectable(center){

    let child = document.createElement("div");
    child.className = "collectable";
    child.style.top = -80+"px";
    child.style.left = center-radius+"px";
    return child;

}

function getRandomArbitrary(min, max) {

    return Math.random() * (max - min) + min;
}