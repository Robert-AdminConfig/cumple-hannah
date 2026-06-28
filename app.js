
const video = document.getElementById("camara");
const canvas = document.getElementById("canvas");
const boton = document.getElementById("capturar");

async function iniciarCamara(){

    if(stream){

        stream.getTracks().forEach(track=>track.stop());

    }

    stream = await navigator.mediaDevices.getUserMedia({

        video:{
            facingMode:camara
        }

    });

    video.srcObject = stream;

}
navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: "user"
  }
})
.then(stream => {
  video.srcObject = stream;
})
.catch(() => {
  alert("No fue posible abrir la cámara");
});


boton.addEventListener("click", async () => {

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");

  // Foto
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Marco
  const marco = new Image();
  marco.src = "marco.png";

  marco.onload = async () => {

    ctx.drawImage(marco, 0, 0, canvas.width, canvas.height);

    // Base64 sin el encabezado
    const base64 = canvas.toDataURL("image/png").split(",")[1];

    boton.disabled = true;
    boton.innerHTML = "⏳ Compartiendo...";

    try {

      const respuesta = await fetch(
        "https://script.google.com/macros/s/AKfycby0N7-C3sqccRVgdBeQZYl0ZfS-tTuiR8pDQcP1mJ-suitpeD36nD_mjq6kx1zBV0F2fA/exec",
        {
          method: "POST",
          redirect: "follow",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify({
            imagen: base64
          })
        }
      );

      const resultado = await respuesta.json();

      if (resultado.ok) {

        boton.innerHTML = "💜 ¡Foto enviada!";

        setTimeout(() => {
          boton.disabled = false;
          boton.innerHTML = "📸 Tomar Foto";
        }, 2500);

      } else {

        alert("Error al subir la foto");

        boton.disabled = false;
        boton.innerHTML = "📸 Tomar Foto";

      }

    } catch (e) {

      console.error(e);

      alert("No fue posible conectar con Google Drive.");

      boton.disabled = false;
      boton.innerHTML = "📸 Tomar Foto";

    }

  };


document.getElementById("cambiarCamara").addEventListener("click",()=>{

    camara = camara === "user"
        ? "environment"
        : "user";

    iniciarCamara();

});
