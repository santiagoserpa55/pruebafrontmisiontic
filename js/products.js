const bicicletas = document.getElementById('bicicletas');

document.addEventListener("DOMContentLoaded", e => {
    fetchData();
})
const fetchData = async () => {
    try {
        const res = await fetch('https://bicimarketunal.herokuapp.com/biciapp/getAllBikes');
        //const res = await fetch('all.json')
        const data = await res.json();
        console.log(data)
        bikes(data);
        //      formularioCliente(data);
        //filtros(data);
    } catch (error) {
        console.log("errorsesr", error);
    }
}
const bikes = data => {
    let elementos = '';
    data.forEach(item => {
        elementos += `
        <article class="card">
                <img src="${item.imagen}" alt="" class="img-fluid"/>
            <div class="card-content">
                <h3>${item.nombre}</h3>
                <p>
                    <b></b>
                    ${item.categoria}
                </p>
                <p>
                    <b></b>
                   ${item.descripcion}
                </p>
                <p class="price">
                    <b>$
                    ${item.preciounitario}
                    </b>
                </p>
                <p>
                <a href="pais.html?name=${item.e}">Mas info</a>
                </p>
                <br/>
                <button class="btnAdd">Add</button>
            </div>
        </article> `
    });
    bicicletas.innerHTML = elementos;
}