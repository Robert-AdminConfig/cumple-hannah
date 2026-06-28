const video=document.getElementById("camara");
const canvas=document.getElementById("canvas");
const boton=document.getElementById("capturar");
const compartir=document.getElementById("compartir");
const btnFoto = document.getElementById("foto");
const btnVideo = document.getElementById("videoBtn");
const btnCambiar = document.getElementById("cambiar");

let stream;
let facingMode = "environment";

let mediaRecorder;
let chunks = [];
let grabando = false;
navigator.mediaDevices.getUserMedia({

video:{
facingMode:"user"
}

})

.then(stream=>{

video.srcObject=stream;

})

.catch(()=>{

alert("No fue posible abrir la cámara");

});

boton.addEventListener("click",()=>{

canvas.width=video.videoWidth;

canvas.height=video.videoHeight;

const ctx=canvas.getContext("2d");

ctx.drawImage(video,0,0,canvas.width,canvas.height);

const marco=new Image();

marco.src="marco.png";

marco.onload=function(){

ctx.drawImage(marco,0,0,canvas.width,canvas.height);

const imagen=canvas.toDataURL("image/png");

const enlace=document.createElement("a");

enlace.href=imagen;

enlace.download="Hannah-Lia-6-anos.png";

enlace.click();

compartir.style.display="block";

}

});
