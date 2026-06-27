const video = document.getElementById("camara");

navigator.mediaDevices.getUserMedia({

video:{
facingMode:"user"
}

})

.then(stream=>{

video.srcObject=stream;

})

.catch(error=>{

alert("No fue posible abrir la cámara.");

});
