// timeUtils.ts

// Función para convertir "hh:mm:ss" a segundos
export const convertirAHorasEnSegundos = (hora: string): number => {
  const [hh, mm, ss] = hora.split(":").map(Number);
  return hh * 3600 + mm * 60 + ss;
};

// Función para convertir segundos a "hh:mm:ss"
export const convertirDeSegundosAHora = (segundos: number): string => {
  const hh = Math.floor(segundos / 3600);
  const mm = Math.floor((segundos % 3600) / 60);
  const ss = segundos % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(
    2,
    "0"
  )}:${String(ss).padStart(2, "0")}`;
};

// Función para corregir tiempos secuenciales
export const corregirTiemposSecuenciales = (horas: string[]): string[] => {
  let ultimoTiempoEnSegundos = convertirAHorasEnSegundos(horas[0]);
  const horasCorregidas: string[] = [horas[0]];

  for (let i = 1; i < horas.length; i++) {
    const tiempoActualEnSegundos = convertirAHorasEnSegundos(horas[i]);

    // Si el tiempo actual es menor o igual al último, corregirlo sumando 2 segundos
    if (tiempoActualEnSegundos <= ultimoTiempoEnSegundos) {
      ultimoTiempoEnSegundos += 2;
    } else {
      ultimoTiempoEnSegundos = tiempoActualEnSegundos;
    }

    horasCorregidas.push(convertirDeSegundosAHora(ultimoTiempoEnSegundos));
  }

  return horasCorregidas;
};
