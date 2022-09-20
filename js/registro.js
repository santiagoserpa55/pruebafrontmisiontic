const newCustomerUrl = 'http://bicimarketunal.herokuapp.com/biciapp/add';
//const newCustomerUrl = 'http://127.0.0.1:8000/newCustomer';

function validate_names(val) {
    const letters = /^[A-Z a-z]+$/;
    if (val.match(letters))
        return true;
    else
        return false;
}

function validate_id(val) {
    if (Number(val) > 1000)
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
    const id = Number(document.registro.id.value);
    const firstName = document.registro.primernombre.value.trim();
    const middleName = document.registro.segundonombre.value.trim();
    const firstSurname = document.registro.primerapellido.value.trim();
    const secondSurname = document.registro.segundoapellido.value.trim();
    const phone = document.registro.telefono.value.trim();
    const email = document.registro.email.value.trim();
    const departament = document.registro.departamento.value.trim();
    const city = document.registro.ciudad.value.trim();
    const neighborhood = document.registro.barrio.value.trim();
    const address = document.registro.direccion.value.trim();
    const password = document.registro.contrasena.value;

    let result = validate_id(id);
    if (!result) {
        alert('Cédula no es válida');
        return;
    }
    result = validate_names(firstName);
    if (!result) {
        alert('Nombre no es válido');
        return;
    }
    result = validate_names(firstSurname);
    if (!result) {
        alert('Apellido no es válido');
        return;
    }
    result = validate_password(password);
    if (!result) {
        alert('Contraseña no es válida. Debe tener al menos 5 caracteres.');
        return;
    }
/* 
    const customer = {
        customer_id: id,
        first_name: firstName,
        middle_name: middleName,
        first_surname: firstSurname,
        second_surname: secondSurname,
        phone: phone,
        email: email,
        departament: departament,
        city: city,
        neighborhood: neighborhood,
        address: address,
        password: password
    } */

    const customer = {
        documento: id,
        primernombre: firstName,
        segundonombre: middleName,
        primerapellido: firstSurname,
        segundoapellido: secondSurname,
        telefono: phone,
        correo: email,
        departamento: departament,
        ciudad: city,
        barrio: neighborhood,
        direccion: address,
        contraseña: password
    }
    //console.log(customer);
    const dataToSend = JSON.stringify(customer);
    saveCustomer(dataToSend);
}

function saveCustomer(data) {
    // Petición HTTP
    fetch(newCustomerUrl, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: data
    })
        .then(response => {
            //console.log(response);
            if (response.ok)
                return response.text()
            else
                throw new Error(response.text());
        })
        .then(data => {
            //console.log(data);
            handleSuccess();
        })
        .catch(error => {
            console.error("ERROR: ", error.message);
            handleError(error.message);
        });
}

function handleSuccess() {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerText = "Cliente creado exitosamente.";
    const info = document.getElementById("info");
    info.appendChild(message);
}

function handleError(msg) {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerText = "No se pudo crear el cliente. Intente luego. " + msg;
    const info = document.getElementById("info");
    info.appendChild(message);
}

// --------------------
document.registro.addEventListener("submit", collectData);