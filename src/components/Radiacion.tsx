// Radiacion.tsx
import { LineChart } from "@mui/x-charts";
import { procesarDatos } from "../utils/procesarDatosRadiacion.util";
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
          xAxis={[
            {
              data: resultados.map((result) => result.hora),
              label: "Tiempo en segundos",
            },
          ]} // Extraer la mediana de la hora
          yAxis={[{ label: "mW/cm^2" }]}
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
