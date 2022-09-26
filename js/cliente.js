const getCustomerUrl = 'https://bicimarketunal.herokuapp.com/biciapp/getOneCustomer/';
//const getCustomerUrl = 'http://127.0.0.1:8000/biciapp/getOneCustomer/';

function getCustomer() {
  const parsedUrl = new URL(window.location.href);
  //console.log(parsedUrl);
  const id = parsedUrl.searchParams.get("id");
  //console.log(id);
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  //console.log("Acá en el otro archivo: " + accessToken);
  console.log("Acá en el otro archivo: " + refreshToken);

  fetch(getCustomerUrl + id, {
    headers: {
      "Authorization": "Bearer " + accessToken
    }
  })
    .then(response => {
      console.log(response);
      if (response.ok || response.status == 400)
        return response.text()
      else
        throw new Error(response.status);
    })
    .then(data => {
      console.log("Datos: " + data);
      if (data.includes("No existe cliente con esa cédula")) {
        handleError(data);
      }
      customer = JSON.parse(data);
      handleCustomer(customer);
    })
    .catch(error => {
      console.error("ERROR: ", error.message);
      handleError();
    });
}

function handleCustomer(customer) {
  const comprasInfo = [];
  customer.compras.forEach(com => {
    const singleAccInfo = `
      <h4>Número de cuenta: ${com.cantidad}</h4>
      <h4>Saldo: ${com.cantidad}</h4>`;
    comprasInfo.push(singleAccInfo);
  });
  const custDiv = document.createElement("div");
  custDiv.innerHTML = `
    <h3>Nombres: ${customer.primernombre}  ${customer.segundonombre} ${customer.primerapellido} ${customer.segundoapellido}   </h3>
    <h3>Telefono: ${customer.telefono}</h3>
    <h3>Cédula: ${customer.documento}</h3>
    <h3>Correo: ${customer.correo}</h3>
    <h3>Direccion: ${customer.departamento}, ${customer.ciudad}, ${customer.barrio}, ${customer.direccion} </h3>
    <h3>Compras:</h3>`;
  comprasInfo.forEach(com => custDiv.innerHTML += com);
  document.getElementById("cargando").remove();
  const info = document.getElementById("info-customers");
  info.appendChild(custDiv);

  sessionStorage.setItem("fname", customer.primernombre);
  sessionStorage.setItem("lname", customer.lastname);
  sessionStorage.setItem("email", customer.email);
}

function handleError(err) {
  document.getElementById("cargando").remove();
  const message = document.createElement("p");
  if (err)
    message.innerText = err;
  else
    message.innerText = "No se pudo cargar la información. Intente más tarde.";
  const info = document.getElementById("info-customers");
  info.appendChild(message);
}

//-----------------------------------

document.addEventListener("DOMContentLoaded", getCustomer);