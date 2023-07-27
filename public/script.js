// Configurar Firebase
// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener referencia a la base de datos
const database = firebase.firestore();

// Obtener referencia al botón de descarga
const downloadButton = document.getElementById("downloadButton");

// Obtener referencia a los elementos donde se mostrarán los datos
const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");
const timestampElement = document.getElementById("timestamp");

// Función para obtener los datos almacenados en la base de datos
function getStoredData() {
  // Obtener referencia a los datos en la base de datos
  const dataRef = database.collection("DatosEsp32").doc("Temp01");

  // Escuchar los cambios en los datos
  dataRef.onSnapshot((doc) => {
    // Obtener los datos
    const data = doc.data();

    // Mostrar los datos en la página
    if (data) {
      temperatureElement.textContent = `Temperature: ${data.value} °C`;
      humidityElement.textContent = `Humidity: ${data.value}%`;
      timestampElement.textContent = `Timestamp: ${data.timestamp}`;
    } else {
      temperatureElement.textContent = "Temperature: --";
      humidityElement.textContent = "Humidity: --";
      timestampElement.textContent = "Timestamp: --";
    }
  });
}

// Función para descargar los datos almacenados en un archivo
function downloadData() {
  // Obtener referencia a los datos en la base de datos
  const dataRef = database.collection("DatosEsp32").doc("Temp01");

  // Obtener los datos
  dataRef.get().then((doc) => {
    const data = doc.data();

    // Crear el contenido del archivo
    const content = `Temperature: ${data.value} °C\nHumidity: ${data.value}%\nTimestamp: ${data.timestamp}`;

    // Crear un objeto Blob
    const blob = new Blob([content], { type: "text/plain" });

    // Crear una URL para el Blob
    const url = URL.createObjectURL(blob);

    // Asignar la URL al botón de descarga
    downloadButton.href = url;
  });
}

// Evento de clic en el botón de descarga
downloadButton.addEventListener("click", () => {
  downloadData();
});

// Obtener la fecha y hora actuales
function getCurrentDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  return `${date} ${time}`;
}

// Mostrar la fecha y hora actuales en la página
document.getElementById("currentDateTime").textContent = `Fecha y Hora: ${getCurrentDateTime()}`;

// Obtener los datos almacenados al cargar la página
getStoredData();
