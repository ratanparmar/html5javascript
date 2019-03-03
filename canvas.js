var can = document.querySelector('canvas');
can.width = window.innerWidth;
can.height = window.innerHeight;

var c = can.getContext('2d');



var maxRadius = 30;
var minRadius = 2;
var colorArray = ["yellow","blue","orange","red","purple","grey"];
var mouse = {
    x : undefined,
    y : undefined
}

window.addEventListener('mousemove',function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});
 
 window.addEventListener('resize',function(){
     can.width = window.innerWidth;
    can.height = window.innerHeight;
    init();
 })

function Circle(x,y,radius,dx,dy){
    this.x=x;
    this.y=y;
    this.radius= radius;
    this.dx=dx;
    this.dy=dy;
    this.minRadius = radius;
    //console.log(this.radius+" before resizing");
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
    this.draw=function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,Math.PI*2,false);
        c.fillStyle  = this.color;
        c.fill();
    }

    this.update=function(){
        if(this.x+radius > window.innerWidth || this.x-this.radius <0){

            this.dx = -this.dx;
        }
        if(this.y +this.radius > window.innerHeight || this.y - this.radius <0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interactivity

        if((mouse.x-this.x <40 && mouse.x-this.x >-40) && (mouse.y - this.y <40 && mouse.y-this.y>-40)){
            if(this.radius < maxRadius){
                this.radius +=1;
                this.x = mouse.x;
                this.y = mouse.y;
            
            }
        }else if(this.radius>this.minRadius){
                this.radius -= 1;
        }
        this.draw();
    }

}

var circleArr =[];

function init(){
    //console.log("hi");
    circleArr = [];
    for (var i = 0; i < 1300; i++) {
        var radius = Math.random()*3+1;
        var x = Math.random()* (window.innerWidth - radius*3)+radius;
        var y = Math.random()* (window.innerHeight - radius*3) +radius;
        var dx = (Math.random() - 0.5)* 3;
        var dy = (Math.random() - 0.5) *4;
        circleArr.push(new Circle(x,y,radius,dx,dy));
    }
}


    function animate(){
        requestAnimationFrame(animate);
        //console.log(animate);
        c.clearRect(0,0,window.innerWidth,window.innerHeight);
        for (var i =0 ; i < circleArr.length; i++) {
            circleArr[i].update();
        }
    }


init();
animate();
