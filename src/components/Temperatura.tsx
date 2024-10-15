// Humedad.tsx
import { LineChart } from "@mui/x-charts";
import { procesarDatos } from "../utils/procesarDatosTemperaturaHumedad.util";
import { DatosCSV } from "../App";

interface TemperaturaHumedadProps {
  datos: DatosCSV[]; // Definimos el tipo de datos que recibimos
}

const Temperatura = ({ datos }: TemperaturaHumedadProps) => {
  // Procesar los datos solo una vez
  const resultados = procesarDatos(datos);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-full max-w-4xl h-full max-h-96">
        <LineChart
          xAxis={[{ data: resultados.map((result) => result.hora), label: "Tiempo en segundos" }]}
          yAxis={[{label: "°C"}]}
          series={[
            {
              data: resultados.map((result) => result.temperatura),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Temperatura;
