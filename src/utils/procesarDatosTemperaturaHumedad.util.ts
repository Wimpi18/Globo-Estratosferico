// obtenerMedianaHumedadTemperatura.ts
import { DatosCSV } from "../App";
import { obtenerMediana } from "./calc.util";
import {
  convertirAHorasEnSegundos,
  corregirTiemposSecuenciales,
} from "./time.util";

export const procesarDatos = (datos: DatosCSV[]) => {
  const resultados: { temperatura: number; humedad: number; hora: number }[] =
    [];

  const horasOriginales = datos.map((d) => d.hora);
  const horasCorregidas = corregirTiemposSecuenciales(horasOriginales);

  const cantMuestra = 10;

  for (let i = 0; i < datos.length; i += cantMuestra) {
    const grupo = datos.slice(i, i + cantMuestra);
    const temperaturas = grupo.map((d) => parseFloat(d.temperatura));
    const humedades = grupo.map((d) => parseFloat(d.humedad));
    const horasEnSegundos = horasCorregidas
      .slice(i, i + cantMuestra)
      .map(convertirAHorasEnSegundos);

    const medianaTemperatura = obtenerMediana(temperaturas);
    const medianaHumedad = obtenerMediana(humedades);
    const medianaHora = obtenerMediana(horasEnSegundos);

    resultados.push({
      temperatura: medianaTemperatura,
      humedad: medianaHumedad,
      hora: medianaHora,
    });
  }

  return resultados;
};
