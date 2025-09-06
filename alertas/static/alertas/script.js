const form = document.getElementById('alertForm');
const animation = document.getElementById('animation');
const timerEl = document.getElementById('timer');
const desc = document.getElementById('descripcion');
const descCount = document.getElementById('descCount');

const btnHistorial = document.getElementById('btnHistorial');
const modal = document.getElementById('modalHistorial');
const closeModal = document.getElementById('closeHistorial');
const historialList = document.getElementById('historialList');

// contador de caracteres
desc.addEventListener('input', () => {
  descCount.textContent = `${desc.value.length}/300`;
});

// submit
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const accidente = document.getElementById('accidente').value;
  const lugar = document.getElementById('lugar').value;
  const descripcion = desc.value;

  // guardar en localStorage
  const nuevaAlerta = { nombre, accidente, lugar, descripcion, fecha: new Date().toLocaleString() };
  let historial = JSON.parse(localStorage.getItem('alertas')) || [];
  historial.push(nuevaAlerta);
  localStorage.setItem('alertas', JSON.stringify(historial));

  // animación
  form.style.display = 'none';
  animation.style.display = 'block';

  // cuenta regresiva de 10s
  let timeLeft = 10;
  timerEl.textContent = `⏱️ Tiempo estimado: ${timeLeft} s`;

  const interval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏱️ Tiempo estimado: ${timeLeft} s`;
    if(timeLeft <= 0){
      clearInterval(interval);
      timerEl.textContent = '✅ La ambulancia ha llegado';
    }
  },1000);
});

// abrir modal historial
btnHistorial.addEventListener('click', () => {
  historialList.innerHTML = "";
  const historial = JSON.parse(localStorage.getItem('alertas')) || [];
  if(historial.length === 0){
    historialList.innerHTML = "<li>No hay alertas registradas</li>";
  } else {
    historial.forEach((a) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${a.nombre}</strong> reportó <em>${a.accidente}</em><br>
        📍 ${a.lugar}<br>
        📝 ${a.descripcion || "Sin descripción"}<br>
        ⏰ ${a.fecha}
      `;
      historialList.appendChild(li);
    });
  }
  modal.style.display = 'flex';
});

// cerrar modal
closeModal.addEventListener('click', () => { modal.style.display = 'none'; });
window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = 'none'; });
