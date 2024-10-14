import { useState } from "react";
import Aflatoxinas from "./Aflatoxinas";
import Estadisticos from "./Estadisticos";

const App = () => {
  const [selectedStat, setSelectedStat] = useState("Aflatoxinas");

  const renderSelectedStat = () => {
    switch (selectedStat) {
      case "Aflatoxinas":
        return <Aflatoxinas />;
      case "Radiación":
        return <div>Componente de Radiación</div>;
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
