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

    // Backgroundcolor Fade Animation
    changeBG(){
        
    
        if(this.red>=255){
            this.redDirection = false;
        }
        if(this.red<=0){
            this.redDirection = true;
        }
    
        if(this.green>=255){
            this.greenDirection = false;
        }
        if(this.green<=0){
            this.greenDirection = true;
        }
    
        if(this.blue>=255){
            this.blueDirection = false;
        }
        if(this.blue<=0){
            this.blueDirection = true;
        }
    
        this.red = this.iterateColor(this.red, this.redDirection);
        this.green = this.iterateColor(this.green, this.greenDirection);
        this.blue = this.iterateColor(this.blue, this.blueDirection);
    
        let color = "rgb("+this.red+","+this.green+","+this.blue+")";
        
        console.log("Backgroundcolor: "+color);

        document.body.style.backgroundColor = color;
    
    }
    
   
}
