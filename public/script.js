// Configurar Firebase

  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Obtener referencia a la base de datos
  const database = firebase.database();
  
  // Obtener referencia al botón de descarga
  const downloadButton = document.getElementById("downloadButton");
  
  // Obtener referencia al elemento donde se mostrarán los datos
  const temperatureElement = document.getElementById("temperature");
  const humidityElement = document.getElementById("humidity");

  // Obtener referencia al formulario de inicio de sesión
const loginForm = document.getElementById("loginForm");

// Evento de envío del formulario de inicio de sesión
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtener los valores ingresados por el usuario
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  // Iniciar sesión con correo electrónico y contraseña
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Inicio de sesión exitoso, obtener el usuario autenticado
      const user = userCredential.user;
      console.log("Usuario autenticado:", user);
      
      // Mostrar los datos almacenados en la base de datos
      getStoredData();

      // Mostrar mensaje de bienvenida en la página
      document.getElementById("welcomeMessage").textContent = `Bienvenido a Ersgop, ${user.email}!`;
    })
    .catch((error) => {
      // Error en el inicio de sesión
      console.error("Error en el inicio de sesión:", error);
      alert("Usuario o contraseña incorrectos. Por favor, intenta nuevamente.");
    });
});

  
  // Función para obtener los datos almacenados en la base de datos
  function getStoredData() {
    // Obtener referencia a los datos en la base de datos
    const dataRef = database.ref("data");
  
    // Escuchar los cambios en los datos
    dataRef.on("value", (snapshot) => {
      // Obtener los datos
      const data = snapshot.val();
  
      // Mostrar los datos en la página
      if (data) {
        temperatureElement.textContent = data.temperatura;
        humidityElement.textContent = data.humedad;
      } else {
        temperatureElement.textContent = "--";
        humidityElement.textContent = "--";
      }
    });
  }
  
  // Función para descargar los datos almacenados en un archivo
  function downloadData() {
    // Obtener referencia a los datos en la base de datos
    const dataRef = database.ref("data");
  
    // Obtener los datos
    dataRef.once("value", (snapshot) => {
      const data = snapshot.val();
  
      // Crear el contenido del archivo
      const content = `Temperatura: ${data.temperatura} °C\nHumedad: ${data.humedad}%`;
  
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
  