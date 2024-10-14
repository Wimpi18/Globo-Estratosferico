import { DatosCSV } from "../App";

// Función para obtener la mediana de un arreglo de números
const obtenerMediana = (valores: number[]) => {
  const ordenados = [...valores].sort((a, b) => a - b); // Ordenar como números
  const mitad = Math.floor(ordenados.length / 2);

  return ordenados[mitad];
};

// Función para convertir "hh:mm:ss" a segundos
const convertirAHorasEnSegundos = (hora: string): number => {
  const [hh, mm, ss] = hora.split(":").map(Number); // Dividir la cadena y convertir a números
  return hh * 3600 + mm * 60 + ss; // Calcular total en segundos
};

// Función para convertir segundos a "hh:mm:ss"
const convertirDeSegundosAHora = (segundos: number): string => {
  const hh = Math.floor(segundos / 3600);
  const mm = Math.floor((segundos % 3600) / 60);
  const ss = segundos % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(
    2,
    "0"
  )}:${String(ss).padStart(2, "0")}`;
};

// Función para corregir tiempos secuenciales
const corregirTiemposSecuenciales = (horas: string[]): string[] => {
  let ultimoTiempoEnSegundos = convertirAHorasEnSegundos(horas[0]); // Iniciar con el primer tiempo en segundos
  const horasCorregidas: string[] = [horas[0]]; // Mantener el primer tiempo

  for (let i = 1; i < horas.length; i++) {
    const tiempoActualEnSegundos = convertirAHorasEnSegundos(horas[i]);

    // Si el tiempo actual es menor o igual al último, corregirlo sumando 2 segundos
    if (tiempoActualEnSegundos <= ultimoTiempoEnSegundos) {
      ultimoTiempoEnSegundos += 2; // Sumar 2 segundos para evitar duplicados
    } else {
      ultimoTiempoEnSegundos = tiempoActualEnSegundos; // Mantener el tiempo si es válido
    }

    horasCorregidas.push(convertirDeSegundosAHora(ultimoTiempoEnSegundos)); // Convertir de segundos a "hh:mm:ss"
  }

  return horasCorregidas;
};

export const procesarDatos = (datos: DatosCSV[]) => {
  const resultados: {
    temperatura: number;
    humedad: number;
    hora: number;
  }[] = []; // Inicializar como un arreglo de objetos

  // Extraer todas las horas del dataset y corregirlas
  const horasOriginales = datos.map((d) => d.hora);
  const horasCorregidas = corregirTiemposSecuenciales(horasOriginales); // Corregir todas las horas

  const cantMuestra = 10;

  // Iterar sobre los datos completos
  for (let i = 0; i < datos.length; i += cantMuestra) {
    const grupo = datos.slice(i, i + cantMuestra);

    // Obtener la mediana de temperatura, humedad, radiación y hora de cada grupo
    const temperaturas = grupo.map((d) => parseFloat(d.temperatura));
    const humedades = grupo.map((d) => parseFloat(d.humedad));

    // Tomar las horas corregidas del grupo
    const horasEnSegundos = horasCorregidas
      .slice(i, i + cantMuestra)
      .map(convertirAHorasEnSegundos); // Convertir horas corregidas a segundos

    const medianaTemperatura = obtenerMediana(temperaturas);
    const medianaHumedad = obtenerMediana(humedades);
    const medianaHora = obtenerMediana(horasEnSegundos); // Mediana en segundos

    // Almacenar el resultado
    resultados.push({
      temperatura: medianaTemperatura,
      humedad: medianaHumedad,
      hora: medianaHora, // La mediana ya está en segundos
    });
  }

  return resultados;
};
