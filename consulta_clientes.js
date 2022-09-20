bicicletas = [];

function getBicicletas() {
  // Petición HTTP
  fetch('http://bicimarketunal.herokuapp.com/biciapp/getAllBikes')
    .then(response => {
      console.log(response);
      if (response.ok)
        return response.text()
      else
        throw new Error(response.status);
    })
    .then(data => {
      console.log("Datos: " + data);
      customers = JSON.parse(data);
      handleBicicletas();
    })
    .catch(error => {
      console.error("ERROR: ", error.message);
      handleError();
    });
}

function handleBicicletas() {
  const divs = [];
  customers.forEach((cust) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>Nombre: ${cust.bike_name}</h3>
      <h3>Apellido: ${cust.description}</h3>
      <h3>Cédula: ${cust.price}</h3>
      `;
    divs.push(div);
  });
  document.getElementById("cargando").remove();
  const info = document.getElementById("info-customers");
  divs.forEach(div => info.appendChild(div));
}

function handleError() {
 
  const message = document.createElement("p");
  message.innerText = "No se pudo cargar la información. Intente más tarde.";
  const info = document.getElementById("info-customers");
  info.appendChild(message);
}

//-----------------------------------

document.addEventListener("DOMContentLoaded", getBicicletas);