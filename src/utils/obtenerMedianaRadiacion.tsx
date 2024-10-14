import { DatosCSV } from "../App";

// Función para obtener la mediana de un arreglo de números
const obtenerMediana = (valores: string[]) => {
  const ordenados = [...valores].sort((a, b) => parseFloat(a) - parseFloat(b)); // Asegúrate de que se comparan como números
  const mitad = Math.floor(ordenados.length / 2);
  
  return parseFloat(ordenados[mitad]);
};

// Función para convertir "hh:mm:ss" a segundos
const convertirAHorasEnSegundos = (hora: string): number => {
  const [hh, mm, ss] = hora.split(":").map(Number); // Dividir la cadena y convertir a números
  return hh * 3600 + mm * 60 + ss; // Calcular total en segundos
};

export const procesarDatos = (datos: DatosCSV[]) => {
  const resultados: { radiacion: number; hora: number }[] = []; // Inicializar como un arreglo de objetos

  // Iterar cada 10 datos
  for (let i = 0; i < datos.length; i += 10) {
    const grupo = datos.slice(i, i + 10);

    // Obtener la mediana de temperatura, radiación y hora de cada grupo
    const temperaturas = grupo.map((d) => d.temperatura);
    const radiaciones = grupo.map((d) => d.radiacion);
    const horas = grupo.map((d) => convertirAHorasEnSegundos(d.hora)); // Convertir horas a segundos

    const medianaTemperatura = obtenerMediana(temperaturas);
    const medianaRadiacion = obtenerMediana(radiaciones);
    const medianaHora = obtenerMediana(horas.map(String)); // Convertir a string para usar la función de mediana

    // Aplicar la división condicional a la radiación
    let radiacionAjustada = medianaRadiacion;
    if (medianaTemperatura >= -25 && medianaTemperatura <= -4) {
      radiacionAjustada /= 1021;
    } else if (medianaTemperatura >= -5 && medianaTemperatura <= 24) {
      radiacionAjustada /= 1022;
    } else if (medianaTemperatura >= 25 && medianaTemperatura <= 74) {
      radiacionAjustada /= 1023;
    } else if (medianaTemperatura >= 75) {
      radiacionAjustada /= 1024;
    }

    // Almacenar el resultado
    resultados.push({
      radiacion: radiacionAjustada,
      hora: medianaHora,
    });
  }

  return resultados;
};
