import { useEffect, useState } from "react";
import Aflatoxinas from "./components/Aflatoxinas";
import Estadisticos from "./components/Estadisticos";
import Radiacion from "./components/Radiacion";
import Papa from "papaparse";
import Temperatura from "./components/Temperatura";
import Humedad from "./components/Humedad";
import * as XLSX from "xlsx";

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
  const [beforeFlightData, setBeforeFlightData] = useState<number[]>([
    0, 0, 0, 0,
  ]);
  const [afterFlightData, setAfterFlightData] = useState<number[]>([
    0, 0, 0, 0,
  ]);

  const handleXlsxUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "before" | "after"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      // Asume que la primera hoja contiene los datos relevantes
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

      // Lee los valores de las celdas específicas
      const aflatoxinaB1 = firstSheet["B6"] ? firstSheet["B6"].v : 0;
      const aflatoxinaG1 = firstSheet["B7"] ? firstSheet["B7"].v : 0;
      const aflatoxinaB2 = firstSheet["B8"] ? firstSheet["B8"].v : 0;
      const aflatoxinaG2 = firstSheet["B9"] ? firstSheet["B9"].v : 0;

      // Actualiza el estado con los valores de aflatoxinas
      if (type === "before") {
        setBeforeFlightData([
          aflatoxinaB1,
          aflatoxinaB2,
          aflatoxinaG1,
          aflatoxinaG2,
        ]);
      } else {
        setAfterFlightData([
          aflatoxinaB1,
          aflatoxinaB2,
          aflatoxinaG1,
          aflatoxinaG2,
        ]);
      }
    };

    reader.readAsArrayBuffer(file);
  };

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
  const handleRemoveFile = (type: "selected" | "before" | "after") => {
    if (type === "selected") {
      setData(defaultData);
    } else if (type === "before") {
      setBeforeFlightData([0, 0, 0, 0]);
    } else if (type === "after") {
      setAfterFlightData([0, 0, 0, 0]);
    }
  };

  const renderSelectedStat = () => {
    switch (selectedStat) {
      case "Aflatoxinas":
        return (
          <Aflatoxinas
            beforeFlightData={beforeFlightData}
            afterFlightData={afterFlightData}
          />
        );
      case "Radiación":
        return <Radiacion datos={data} />;
      case "Temperatura":
        return <Temperatura datos={data} />;
      case "Humedad":
        return <Humedad datos={data} />;
      default:
        return (
          <Aflatoxinas
            beforeFlightData={beforeFlightData}
            afterFlightData={afterFlightData}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <Estadisticos
        onSelectStat={setSelectedStat}
        onFileUpload={handleFileUpload}
        onRemoveFile={handleRemoveFile} // Pasar la función para manejar la eliminación de archivos
        onXlsxUpload={handleXlsxUpload}
      />
      <div className="flex-grow flex justify-center items-center">
        {renderSelectedStat()}
      </div>
    </div>
  );
};

export default App;
