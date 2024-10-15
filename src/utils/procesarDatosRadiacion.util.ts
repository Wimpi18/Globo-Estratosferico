// obtenerMedianaRadiacion.ts
import { DatosCSV } from "../App";
import { obtenerMediana } from "./calc.util";
import {
  convertirAHorasEnSegundos,
  corregirTiemposSecuenciales,
} from "./time.util";

export const procesarDatos = (datos: DatosCSV[]) => {
  const resultados: { radiacion: number; hora: number }[] = [];

  const horasOriginales = datos.map((d) => d.hora);
  const horasCorregidas = corregirTiemposSecuenciales(horasOriginales);

  const cantMuestra = 10;

  for (let i = 0; i < datos.length; i += cantMuestra) {
    const grupo = datos.slice(i, i + cantMuestra);
    const temperaturas = grupo.map((d) => parseFloat(d.temperatura));
    const radiaciones = grupo.map((d) => parseFloat(d.radiacion));
    const horasEnSegundos = horasCorregidas
      .slice(i, i + cantMuestra)
      .map(convertirAHorasEnSegundos);

    const medianaTemperatura = obtenerMediana(temperaturas);
    const medianaRadiacion = obtenerMediana(radiaciones);
    const medianaHora = obtenerMediana(horasEnSegundos);

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

    resultados.push({ radiacion: radiacionAjustada, hora: medianaHora });
  }

  return resultados;
};
