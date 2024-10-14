import { useEffect, useState } from "react";
import Aflatoxinas from "./components/Aflatoxinas";
import Estadisticos from "./components/Estadisticos";
import Radiacion from "./components/Radiacion";
import Papa from "papaparse";
import Temperatura from "./components/Temperatura";
import Humedad from "./components/Humedad";

export interface DatosCSV {
  temperatura: string;
  radiacion: string;
  humedad: string;
  hora: string;
}

const App = () => {
  const [selectedStat, setSelectedStat] = useState("Aflatoxinas");
  const [data, setData] = useState<DatosCSV[]>([]); // Estado para los datos
  const [defaultData, setDefaultData] = useState<DatosCSV[]>([]); // Guardar datos por defecto

  // Función para cargar los datos predefinidos
  const fetchDefaultData = async () => {
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
    setDefaultData(parsedData); // Guardar datos predefinidos
  };

  useEffect(() => {
    fetchDefaultData(); // Cargar datos predefinidos al montar el componente
  }, []);

  // Función para manejar la carga de archivo CSV
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse<DatosCSV>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setData(results.data); // Actualizar datos con el archivo subido
        },
      });
    }
  };

  // Función para restablecer los datos predefinidos cuando se elimina el archivo
  const handleRemoveFile = () => {
    setData(defaultData); // Restaurar los datos predefinidos
  };

  const renderSelectedStat = () => {
    switch (selectedStat) {
      case "Aflatoxinas":
        return <Aflatoxinas />;
      case "Radiación":
        return <Radiacion datos={data} />;
      case "Temperatura":
        return <Temperatura datos={data} />;
      case "Humedad":
        return <Humedad datos={data} />;
      default:
        return <Aflatoxinas />;
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <Estadisticos
        onSelectStat={setSelectedStat}
        onFileUpload={handleFileUpload}
        onRemoveFile={handleRemoveFile}
      />
      <div className="flex-grow flex justify-center items-center">
        {renderSelectedStat()}
      </div>
    </div>
  );
};

export default App;
