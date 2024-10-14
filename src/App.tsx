import { useEffect, useState } from "react";
import Aflatoxinas from "./components/Aflatoxinas";
import Estadisticos from "./components/Estadisticos";
import Radiacion from "./components/Radiacion";
import Papa from "papaparse";

export interface DatosCSV {
  temperatura: string;
  radiacion: string;
  humedad: string
  hora: string;
}

const App = () => {
  const [selectedStat, setSelectedStat] = useState("Aflatoxinas");
  const [data, setData] = useState<DatosCSV[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/datalog.csv");
      const reader = response.body?.getReader();
      const result = await reader?.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result?.value);
      const parsedData = Papa.parse<DatosCSV>(csvData, {
        header: true,
        skipEmptyLines: true,
      }).data;
      setData(parsedData);
    };

    fetchData();
  }, []);

  const renderSelectedStat = () => {
    switch (selectedStat) {
      case "Aflatoxinas":
        return <Aflatoxinas />;
      case "Radiación":
        return <Radiacion datos={data}/>;
      case "Temperatura":
        return <div>Componente de Temperatura</div>;
      case "Humedad":
        return <div>Componente de Humedad</div>;
      default:
        return <Aflatoxinas />;
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <Estadisticos onSelectStat={setSelectedStat} />
      <div className="flex-grow flex justify-center items-center">
        {renderSelectedStat()}
      </div>
    </div>
  );
};

export default App;
