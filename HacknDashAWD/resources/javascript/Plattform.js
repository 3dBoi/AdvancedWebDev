

//let plattforms = document.getElementById("plattform");
//let plattformBounds = plattforms.getBoundingClientRect();
let collisionPlattformY;


export function Collision(){

    let plattforms = document.getElementsByClassName("plattform");

    let player = document.getElementById("player").getBoundingClientRect();

    let bottomEdgePlayerA = [player.left , (player.top+player.height)];
    let bottomEdgePlayerB = [(player.left+player.width) , (player.top+player.height)];

    for(let i = 0; i<plattforms.length; i++){

        let plattformBounds = plattforms[i].getBoundingClientRect();

        let topEdgePlattform = [plattformBounds.left , plattformBounds.top , (plattformBounds.left+plattformBounds.width) , plattformBounds.top];
        let vectorEdge = [topEdgePlattform[2]-topEdgePlattform[0] , topEdgePlattform[3]-topEdgePlattform[1]];

        let intersectionA = intersection(bottomEdgePlayerA, topEdgePlattform, vectorEdge);
        let intersectionB = intersection(bottomEdgePlayerB, topEdgePlattform, vectorEdge);

        let distanceA = distance(bottomEdgePlayerA, intersectionA);
        let distanceB = distance(bottomEdgePlayerB, intersectionB);

        if(distanceA<=30&&inBounds(intersectionA, topEdgePlattform, vectorEdge)){
            
            collisionPlattformY = plattformBounds.top;
            return true;
        } else if(distanceB<=30&&inBounds(bottomEdgePlayerB, topEdgePlattform, vectorEdge)){

            collisionPlattformY = plattformBounds.top;
            return true;
        }

    }

    return false;

}

export function YPosition(){

    return collisionPlattformY;
}

function intersection(pointPlayer , edge, vectorEdge){

    let orth = [vectorEdge[1], -vectorEdge[0]];

    let detA = determinante((pointPlayer[0]-edge[0]) , orth[0] , (pointPlayer[1]-edge[1]) , orth[1]);
    let detB = determinante(vectorEdge[0] , orth[0] , vectorEdge[1] , orth[1]);

    let r = detA/detB;

    let intersection = [edge[0]+r*vectorEdge[0] , edge[1]+r*vectorEdge[1]];

    return intersection;

}

// distance of player to plattform
function distance(pointPlayer, intersection){

    let distance = Math.sqrt(Math.pow(pointPlayer[0]-intersection[0], 2)+ Math.pow(pointPlayer[1]-intersection[1], 2));

    return distance;
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

export function InstantiatePlattforms(){

    let parent = document.getElementById("plattforms");

    for(let i = 0; i<6; i++){

        let child = document.createElement("div");
        child.className = "plattform";
        child.style.width = getRandomArbitrary(150, 300)+"px";
        child.style.top = getRandomArbitrary(0, window.innerHeight)+"px";
        child.style.left = getRandomArbitrary(0, (window.innerWidth-parseInt(child.style.width)))+"px";

        parent.appendChild(child);
    }
}

function getRandomArbitrary(min, max) {
    let r = Math.random() * (max - min) + min;
    //console.log(r);
    return r;
  }
  
