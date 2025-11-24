const API_URL = "/notas";
const notasDiv = document.getElementById("notas");
const form = document.getElementById("notaForm");

async function cargarNotas() {
  const res = await fetch(API_URL);
  const notas = await res.json();

  notasDiv.innerHTML = "";
  notas.forEach((nota) => {
    const div = document.createElement("div");
    div.className = "nota";

    div.innerHTML = `
      <div class="contenido">
        <strong>${nota.titulo}</strong>
        <p>${nota.contenido || ""}</p>
      </div>
      <button onclick="eliminarNota(${nota.id})">Eliminar</button>
    `;

    notasDiv.appendChild(div);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const contenido = document.getElementById("contenido").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, contenido }),
  });

  form.reset();
  cargarNotas();
});

async function eliminarNota(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  cargarNotas();
}

cargarNotas();
