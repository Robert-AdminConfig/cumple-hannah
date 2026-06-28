
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
