//const updateCustomerUrl = 'https://bicimarketunal.herokuapp.com/biciapp/updateCustomer/';
const updateCustomerUrl = 'http://127.0.0.1:8000/biciapp/updateCustomer/';

const userId = sessionStorage.getItem("clientId");
console.log("mostrando id",userId);
function validate_names(val) {
    const letters = /^[A-Z a-zÁÉÍÓÚáéíóúñ]+$/;
    if (val.match(letters))
        return true;
    else
        return false;
}
function validate_password(val) {
    if (val.length >= 5)
        return true;
    else
        return false;
}
function collectData(evt) {
    evt.preventDefault();
    const firstName = document.update.primernombre.value.trim();
    const middleName = document.update.segundonombre.value.trim();
    const firstSurname = document.update.primerapellido.value.trim();
    const secondSurname = document.update.segundoapellido.value.trim();
    const phone = document.update.telefono.value.trim();
    const email = document.update.email.value.trim();
    const departament = document.update.departamento.value.trim();
    const city = document.update.ciudad.value.trim();
    const neighborhood = document.update.barrio.value.trim();
    const address = document.update.direccion.value.trim();
    const password = document.update.contrasena.value;

    let result = true;//ojo con este nombre de variable
    if (firstName) {
        let result = validate_names(firstName);
        if (!result) {
            alert("Nombre no es válido");
            return;
        }
    }
    if (firstSurname) {
        result = validate_names(firstSurname);
        if (!result) {
            alert('Apellido no es válido');
            return;
        }
    }
    if (password) {
        result = validate_password(password);
        if (!result) {
            alert('Contraseña no es válida. Debe tener al menos 5 caracteres.');
            return;
        }
    }
    const customer = {}
    if (firstName)
        customer.primernombre = firstName;
    if (middleName)
        customer.segundonombre = middleName;
    if (firstSurname)
        customer.primerapellido = firstSurname;
    if (secondSurname)
        customer.segundoapellido = secondSurname;
    if (phone)
        customer.telefono = phone;
    if (email)
        customer.correo = email;
    if (departament)
        customer.departamento = departament;
    if (city)
        customer.ciudad = city;
    if (neighborhood)
        customer.barrio = neighborhood;
    if (address)
        customer.direccion = address;
    if (password)
        customer.contrasena = password;
    console.log(customer);
    const dataToSend = JSON.stringify(customer);
    updateCustomer(dataToSend);
}
function updateCustomer(data) {
    console.log("sesion storagee",sessionStorage)
    const accessToken = sessionStorage.getItem("accessToken ")
    console.log("Access Token:: ", accessToken);
    // Petición HTTP
    console.log(userId)
    fetch(updateCustomerUrl + userId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken

        },
        body: data
    })
        .then(response => {
            console.log(response);
            if (response.ok)
                return response.text()
            else
                throw new Error(response.text());
        })
        .then(data => {
            console.log(data);
            alert("Datos actualizados")
            goBack();
        })
        .catch(error => {
            console.error("ERROR: ", error.message);
            alert("Error al actualizar datos");
            goBack()
        });
}
function goBack(){
    window.location.href = './cliente.html?id=' + userId;
}
document.update.addEventListener("submit", collectData);

