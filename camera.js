
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

let mediaStream;
let mediaRecorder;
let chunks = [];

startCamera();

async function startCamera(){

mediaStream =
await navigator.mediaDevices.getUserMedia({

video:{
facingMode:"environment"
},

audio:true

});

video.srcObject = mediaStream;

}
document
.getElementById("photoBtn")
.addEventListener("click",takePhoto);

function takePhoto(){

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

const ctx = canvas.getContext("2d");

ctx.drawImage(
video,
0,
0,
canvas.width,
canvas.height
);

canvas.toBlob(async(blob)=>{

await uploadFile(
blob,
`foto_${Date.now()}.jpg`
);

alert("Foto subida");

},"image/jpeg",0.95);

}
