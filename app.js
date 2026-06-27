const video = document.getElementById("camara");

const canvas = document.getElementById("canvas");

const boton = document.getElementById("capturar");

const compartir = document.getElementById("compartir");

navigator.mediaDevices.getUserMedia({

video:{
facingMode:"user"
}

})

.then(stream=>{

video.srcObject=stream;

});

boton.addEventListener("click",()=>{

canvas.width=video.videoWidth;

canvas.height=video.videoHeight;

const ctx=canvas.getContext("2d");

ctx.drawImage(video,0,0);

const marco=new Image();

marco.src="marco.png";

marco.onload=()=>{

ctx.drawImage(marco,0,0,canvas.width,canvas.height);

const enlace=document.createElement("a");

enlace.download="Hannah-Lia.png";

enlace.href=canvas.toDataURL("image/png");

enlace.click();

compartir.style.display="inline-block";

}

});
