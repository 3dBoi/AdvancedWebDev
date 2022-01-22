
// Intersectionpoint
export function intersection(edgePointA, edgePointB, point){

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

export function distance(p1, p2){

    return Math.sqrt(Math.pow(p1[0]-p2[0], 2)+ Math.pow(p1[1]-p2[1], 2));
}

// In Bounds of Rectangle
export function inBounds(intersection, edgePointA, edgePointB){

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