

let posy = 0;
let posx = 0;
let moverate = 5;
let cube = document.getElementById("player");
let cubeBounds = cube.getBoundingClientRect();


// Update Player Position
export function PlayerUpdate(){

    console.log(posx);
    console.log(posy);
    console.log(cube);
    
    cube.style.top = posy+"px";
    cube.style.left = posx+"px";
}

// Events for Movement
export function RegisterEventListener(){

    window.addEventListener("keydown", function(event) {

        console.log(event.code);

        if(event.code === "ArrowDown"){

            console.log(event.code);
            posy = updateYPosition(moverate);
            
        } else if (event.code === "ArrowUp"){

            console.log(event.code);
            posy = updateYPosition(-moverate);
            
        } else if (event.code === "ArrowLeft"){

            console.log(event.code);
            posx = updateXPosition(-moverate);
            
        } else if (event.code === "ArrowRight"){

            console.log(event.code);
            posx = updateXPosition(moverate);
            
        }

        event.preventDefault();

    }, true)


}

// Update Position for X, Spawns on opposite side on leaving window
function updateXPosition(moverate){


    posx = posx + moverate;

    if(posx<0){
        posx = window.innerWidth-cubeBounds.width;
    }else if (posx>window.innerWidth-cubeBounds.width) {
        posx = 0;
    }

    return posx;

}

// Update Position for Y, Spawns on opposite side on leaving window
function updateYPosition(moverate){

    posy = posy + moverate;

    if(posy<0){
        posy = window.innerHeight-cubeBounds.height;
    }else if (posy>window.innerHeight-cubeBounds.height) {
        posy = 0;
    }

    return posy;

}

    


