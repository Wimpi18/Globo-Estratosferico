// obtenerMedianaRadiacion.ts
import { DatosCSV } from "../App";
import { obtenerMediana } from "./calc.util";
import {
  convertirAHorasEnSegundos,
  corregirTiemposSecuenciales,
} from "./time.util";

const mapfloat = (
  x: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
): number => {
  return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

export const procesarDatos = (datos: DatosCSV[]) => {
  const resultados: { radiacion: number; hora: number }[] = [];

  const horasOriginales = datos.map((d) => d.hora);
  const horasCorregidas = corregirTiemposSecuenciales(horasOriginales);

  const cantMuestra = 10;

  for (let i = 0; i < datos.length; i += cantMuestra) {
    const grupo = datos.slice(i, i + cantMuestra);
    // const temperaturas = grupo.map((d) => parseFloat(d.temperatura));
    const radiaciones = grupo.map((d) => parseFloat(d.radiacion));
    const horasEnSegundos = horasCorregidas
      .slice(i, i + cantMuestra)
      .map(convertirAHorasEnSegundos);

    const medianaRadiacion = obtenerMediana(radiaciones);
    const medianaHora = obtenerMediana(horasEnSegundos);

    const radiacionAjustada = mapfloat(medianaRadiacion, 1008, 3474, 0.0, 15.0);
    resultados.push({ radiacion: radiacionAjustada, hora: medianaHora });
  }

  return resultados;
};
