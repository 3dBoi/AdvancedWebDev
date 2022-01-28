import {DeltaTime} from "./Main.js";
import { intersection, distance, inBounds } from "./Game.js";

let parent = document.getElementById("enemies");
let collisionDistance;
let radius = 1;

// Collision between Player and Enemy
function enemyCollision(){

    let player = document.getElementById("player").getBoundingClientRect();

    let enemies = document.getElementsByClassName("enemy");
    
    let bottomEdgePlayerA = [player.left , (player.top+player.height)];
    let bottomEdgePlayerB = [(player.left+player.width) , (player.top+player.height)];

    let topEdgePlayerA = [player.left , player.top];
    let topEdgePlayerB = [(player.left+player.width) , player.top];

    let leftEdgePlayerA = [player.left , player.top];
    let leftEdgePlayerB = [player.left , (player.top+player.height)];

    let rightEdgePlayerA = [(player.left+player.width) , player.top];
    let rightEdgePlayerB = [(player.left+player.width) , (player.top+player.height)];

    collisionDistance = 30;

    for(let i = 0; i<enemies.length; i++){

        let enemyBounds = enemies[i].getBoundingClientRect();
        let enemyCenter = [enemyBounds.left+(enemyBounds.width/2) , enemyBounds.top+(enemyBounds.height/2)];

        let intersectionBottom = intersection(bottomEdgePlayerA, bottomEdgePlayerB, enemyCenter);
        let intersectionTop = intersection(topEdgePlayerA, topEdgePlayerB, enemyCenter);
        let intersectionLeft = intersection(leftEdgePlayerA, leftEdgePlayerB, enemyCenter);
        let intersectionRight = intersection(rightEdgePlayerA, rightEdgePlayerB, enemyCenter);

        let distanceBottom = Math.abs(distance(enemyCenter, intersectionBottom));
        let distanceTop = Math.abs(distance(enemyCenter, intersectionTop));
        let distanceLeft = Math.abs(distance(enemyCenter, intersectionLeft));
        let distanceRight = Math.abs(distance(enemyCenter, intersectionRight));

        if((distanceBottom-radius)<=collisionDistance&&inBounds(intersectionBottom, bottomEdgePlayerA, bottomEdgePlayerB)){
            
            return true;
        } else if((distanceTop-radius)<=collisionDistance&&inBounds(intersectionTop, topEdgePlayerA, topEdgePlayerB)){

            return true;
        } else if((distanceLeft-radius)<=collisionDistance&&inBounds(intersectionLeft, leftEdgePlayerA, leftEdgePlayerB)){

            return true;
        } else if((distanceRight-radius)<=collisionDistance&&inBounds(intersectionRight, rightEdgePlayerA, rightEdgePlayerB)){

            return true;
        }

    }

    return false;

}

function destroyEnemy(collectable){

    collectable.parentNode.removeChild(collectable);
}

// If Player collides with Enemy something happens
export function Fight(){

    if(enemyCollision()){
        return true;
    }

    return false;

}

// Spawn Enemies randomly on Platform
export function SpawnEnemy(center){

    let random = Math.floor(getRandomArbitrary(0,5));

    if(random==0){

        let newChild = newEnemy(center);

        parent.appendChild(newChild);
    }

}

// Move Enemies at speed of platforms
export function MoveEnemies(speed){

    let enemies = document.getElementsByClassName("enemy");

    for(let i = 0; i<enemies.length; i++){

        let enemyPosY = parseFloat(enemies[i].style.top);
        enemies[i].style.top = enemyPosY+speed*(DeltaTime()*0.001)+"%";

        if((parseFloat(enemies[i].style.top)+parseFloat(enemies[i].style.height))+5>100){

            destroyEnemy(enemies[i]);
        }
    }


}

function newEnemy(center){

    let child = document.createElement("div");
    child.className = "enemy";
    child.style.width = radius*2+"%";
    child.style.height = (((radius*2/100)*window.innerWidth)/window.innerHeight)*100+"%";
    child.style.top = -6+"%";
    child.style.left = center-radius+"%";
    return child;

}

function getRandomArbitrary(min, max) {

    return Math.random() * (max - min) + min;
}