import { BarChart } from "@mui/x-charts";

const Aflatoxinas = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-full max-w-4xl h-full max-h-96">
        <BarChart
          xAxis={[{ scaleType: "band", data: ["B1", "B2", "G1", "G2"], label:"Tipo de Aflatoxina" }]}
          yAxis={[{label:"μg/Kg"}]}
          series={[
            {
              label: "Antes del vuelo",
              data: [100, 80, 43, 30],
            },
            {
              label: "Después del vuelo",
              data: [10, 12, 20, 11],
            },
          ]}
          title="Aflatoxinas en pasta de castaña"
        />
      </div>
    </div>
  );
};

export default Aflatoxinas;
