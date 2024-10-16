import { BarChart } from "@mui/x-charts";

interface AflatoxinasProps {
  beforeFlightData: number[];
  afterFlightData: number[];
}

const Aflatoxinas = ({
  beforeFlightData,
  afterFlightData,
}: AflatoxinasProps) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-full max-w-4xl h-full max-h-96">
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: ["B1", "B2", "G1", "G2"],
              label: "Tipo de Aflatoxina",
            },
          ]}
          yAxis={[{ label: "μg/Kg" }]}
          series={[
            { label: "Antes del vuelo", data: beforeFlightData },
            { label: "Después del vuelo", data: afterFlightData },
          ]}
          title="Aflatoxinas en pasta de castaña"
        />
      </div>
    </div>
  );
};

export default Aflatoxinas;
