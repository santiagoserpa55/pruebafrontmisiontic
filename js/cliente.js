//const getCustomerUrl = 'https://bicimarketunal.herokuapp.com/biciapp/getOneCustomer/';
const getCustomerUrl = 'http://127.0.0.1:8000/biciapp/getOneCustomer/';

function getCustomer() {
  const parsedUrl = new URL(window.location.href);
  console.log(parsedUrl);
  const id = parsedUrl.searchParams.get("id");
  console.log("Imprimiendo id",id);
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  console.log("Acá en el otro archivo: " + accessToken);
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
  customer.compras.forEach(comp => {
    const singleAccInfo = `

  <table class="table">
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>${comp.product_id}</td>
        <td>${comp.cantidad}</td>
        <td>${comp.price}</td>
        <td>${comp.cantidad * comp.price}</td>
        <td>${comp.fecha}</td>
      </tr>
    </tbody>
  </table>

      `;
    comprasInfo.push(singleAccInfo);

  });
  const custDiv = document.createElement("div");
  custDiv.innerHTML = `
    <div class="box-register-right">
    <div class="title">
        <h2>Bienvenido esta es su informacion</h2>
    </div>
    <div class="cajaprincipal" id="info">
        <div id="formData">
            <form name="registro" class="form" method="post">
                <label for="identificacion">Identificación<input type="text" name="id" id="identificacion" value="${customer.documento}" disabled></label>

                <label for="primernombre">Primer nombre <input type="text" name="primernombre"
                        id="primernombre" value="${customer.primernombre}" disabled></label>

                <label for="segundonombre">Segundo nombre<input type="text" name="segundonombre"
                        id="segundonombre" value="${customer.segundonombre}" disabled></label>

                <label for="primerapellido">Primer apellido<input type="text" name="primerapellido"
                        id="primerapellido" value="${customer.primerapellido}" disabled></label>

                <label for="segundoapellido">Segundo apellido<input type="text" name="segundoapellido"
                        id="segundoapellido" value="${customer.segundoapellido}" disabled></label>

                <label for="telefono">Telefono<input type="text" name="telefono" id="telefono" value="${customer.telefono}" disabled></label>

                <label for="email">Email<input type="text" name="email" id="email" value="${customer.correo}" disabled></label>
                <label for="contraseña">Departamento<input type="text" name="departamento" id="departamento" value="${customer.departamento}" disabled></label>

                <label for="ciudad">Ciudad<input type="text" name="ciudad" id="ciudad" value="${customer.ciudad}" disabled></label>

                <label for="barrio">Barrio<input type="text" name="barrio" id="barrio" value="${customer.barrio}" disabled></label>

                <label for="direccion">Dirección<input type="text" name="direccion" id="direccion" value="${customer.direccion}" disabled></label>
            </form>
          
            
        </div>
    </div>
</div>

<div class="container-compras">
Compras
</div>



<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Procucto</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Precio</th>
      <th scope="col">Total</th>
      <th scope="col">Fecha</th>
    </tr>
  </thead>
</table>

    
    `;
  comprasInfo.forEach(com => custDiv.innerHTML += com);
  document.getElementById("cargando").remove();
  const info = document.getElementById("info-customers");
  info.appendChild(custDiv);
   

  sessionStorage.setItem("fname", customer.primernombre);
  sessionStorage.setItem("lname", customer.segundonombre);
  sessionStorage.setItem("email", customer.correo);
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