// Radiacion.tsx
import { LineChart } from "@mui/x-charts";
import { procesarDatos } from "../utils/ObtenerMedianaRadiacion";
import { DatosCSV } from "../App";

interface RadiacionProps {
  datos: DatosCSV[]; // Definimos el tipo de datos que recibimos
}

const Radiacion = ({ datos }: RadiacionProps) => {
  // Procesar los datos solo una vez
  const resultados = procesarDatos(datos);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-full max-w-4xl h-full max-h-96">
        <LineChart
          xAxis={[{ data: resultados.map((result) => result.hora) }]} // Extraer la mediana de la hora
          series={[
            {
              data: resultados.map((result) => result.radiacion), // Extraer la radiación ajustada
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Radiacion;
