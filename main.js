const input_nombre = document.querySelector("#nombre-crear");
const input_poder = document.querySelector("#poder-crear");
const input_foto = document.querySelector("#foto-crear");
const input_edad = document.querySelector("#edad-crear");
const btn_crear = document.querySelector("#crear");

const contenedor = document.querySelector("#contenedor");

const inp_m_nombre = document.querySelector("#nombre-cambiar");
const inp_m_poder = document.querySelector("#poder-cambiar");
const inp_m_foto = document.querySelector("#foto-cambiar");
const inp_m_edad = document.querySelector("#edad-cambiar");
const btn_modificar = document.querySelector("#cambiar");

function crearUnicornio() {
  const nombre = input_nombre.value;
  const poder = input_poder.value;
  const foto = input_foto.value;
  const edad = input_edad.value;
  const unicornio = {
    name: nombre,
    power: poder,
    image: foto,
    age: edad,
  };
  if (nombre && poder && foto) {
    fetch("https://unicorns-api.herokuapp.com/api/v1/unicorns", {
      method: "POST",
      body: JSON.stringify(unicornio),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resultado) => resultado.json())
      .then(() => {
        obtenerUnicornios();
        limpiarInputs();
        alert("Se ha creado el Unicornio con éxito");
      })
      .catch((err) => console.log(err));
  }
  else{
    alert("Falta algún dato obligatorio");
  }
}

//Obtenemos todos los unicornios y los mostramos

function obtenerUnicornios() {
  fetch("https://unicorns-api.herokuapp.com/api/v1/unicorns")
    .then((resultado) => resultado.json())
    .then((resultado) => mostrarUnicornios(resultado))
    .catch((err) => console.log(err));
}

function mostrarUnicornios(arregloUnicornios) {
  contenedor.innerHTML = "";
  arregloUnicornios = arregloUnicornios.reverse();
  arregloUnicornios.forEach((unicornio) => {
    const container = document.createElement("div");
    const cont_unicorn = document.createElement("div");
    const btn_eliminar = document.createElement("button");
    let div_content =
      "<img src=" +
      unicornio.image +
      ' class="imagen-unicornio">' +
      "<h3 >Nombre: " +
      unicornio.name +
      "</h3> <h3>Poder: " +
      unicornio.power +
      "</h3>";
    if (unicornio.age) {
      div_content = div_content + "<h3>Edad: " + unicornio.age + "</h3>";
    }
    btn_eliminar.innerHTML = "Eliminar";
    btn_eliminar.type = "button";
    btn_eliminar.onclick = function () {
      eliminarUnicornio(cont_unicorn.id);
      obtenerUnicornios();
    };
    cont_unicorn.id = unicornio._id;
    container.classList.add("contenedor-unicornio");
    cont_unicorn.classList.add("contenedor-contenido");
    btn_eliminar.classList.add("boton-eliminar");
    cont_unicorn.onclick = function () {
      capturarUnicornios(cont_unicorn.id);
    };
    cont_unicorn.innerHTML = div_content;
    contenedor.appendChild(container);
    container.appendChild(cont_unicorn);
    container.appendChild(btn_eliminar);
  });
}

function limpiarInputs() {
  input_nombre.value = "";
  input_poder.value = "";
  input_foto.value = "";
  input_edad.value = "";
  inp_m_edad.value = "";
  inp_m_nombre.value = "";
  inp_m_foto.value = "";
  inp_m_poder.value = "";
}

btn_crear.addEventListener("click", crearUnicornio);
obtenerUnicornios();

function capturarUnicornios(id) {
  const url = "https://unicorns-api.herokuapp.com/api/v1/unicorns/" + id;
  fetch(url)
    .then((resultado) => resultado.json())
    .then((data) => {
      unicornioCambia(data);
    })
    .catch((error) => alert(error));
}

function unicornioCambia(objeto) {
  inp_m_nombre.value = objeto.name;
  inp_m_poder.value = objeto.power;
  inp_m_foto.value = objeto.image;
  inp_m_edad.value = objeto.age;
  btn_modificar.onclick = function () {
    modificarUnicornio(objeto._id);
  };
}
function modificarUnicornio(id) {
  const nombre = inp_m_nombre.value;
  const poder = inp_m_poder.value;
  const foto = inp_m_foto.value;
  const edad = inp_m_edad.value;
  const unicornio = {
    name: nombre,
    power: poder,
    image: foto,
    age: edad,
  };
  const modificaciones = {
    method: "PUT",
    body: JSON.stringify(unicornio),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url = "https://unicorns-api.herokuapp.com/api/v1/unicorns/" + id;
  fetch(url, modificaciones)
    .then((resultado) => resultado.json())
    .then(() => {
      obtenerUnicornios();
      limpiarInputs();
      alert("Se modificó los datos del unicornio con éxito");
    })
    .catch((error) => alert(error));
}

function eliminarUnicornio(id) {
  if (confirm("¿Seguro que desea eliminar?")) {
    const options = {
      method: "DELETE",
    };
    const url = "https://unicorns-api.herokuapp.com/api/v1/unicorns/" + id;
    fetch(url, options)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        console.log(result);
        obtenerUnicornios();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return;
  }
}
