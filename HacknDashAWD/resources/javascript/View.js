export default class View{

    red = 0;
    green = 150;
    blue = 255;
    redDirection = true;
    greenDirection = true;
    blueDirection = true;

    constructor(){

    }

    iterateColor(color, direction){
    
        if(direction){
            color++;
        }else{
            color--;
        }
    
        return color;
    }

    checkDirection(color, direction){

        if(color>=255){
            direction = false;
        }
        if(color<=0){
            direction = true;
        }

        return direction;

    }

    // Backgroundcolor Fade Animation
    changeBG(){

        this.redDirection = this.checkDirection(this.red, this.redDirection);
        this.greenDirection = this.checkDirection(this.green, this.greenDirection);
        this.blueDirection = this.checkDirection(this.blue, this.blueDirection);
    
        this.red = this.iterateColor(this.red, this.redDirection);
        this.green = this.iterateColor(this.green, this.greenDirection);
        this.blue = this.iterateColor(this.blue, this.blueDirection);
    
        let color = "rgb("+this.red+","+this.green+","+this.blue+")";
        
        console.log("Backgroundcolor: "+color);

        document.body.style.backgroundColor = color;
    
    }
    
   
}
