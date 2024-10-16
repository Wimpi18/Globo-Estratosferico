import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BarChart, UploadFile, Delete } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useState } from "react";

interface EstadisticosProps {
  onSelectStat: (stat: string) => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void; // Prop para subir archivo
  onRemoveFile: () => void; // Nueva prop para eliminar archivo
  onXlsxUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "before" | "after"
  ) => void; // Nueva prop para eliminar archivos xlsx
}

const drawerWidth = 240;

// Estilo personalizado para ocultar el input real de archivo
const InputFile = styled("input")({
  display: "none",
});

export default function Estadisticos({
  onSelectStat,
  onFileUpload,
  onRemoveFile,
  onXlsxUpload,
}: EstadisticosProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [beforeFlightFile, setBeforeFlightFile] = useState<File | null>(null); // Archivos antes del vuelo
  const [afterFlightFile, setAfterFlightFile] = useState<File | null>(null); // Archivos después del vuelo

  const handleXlsxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "before" | "after"
  ) => {
    const file = event.target.files?.[0] || null;
    if (type === "before") {
      setBeforeFlightFile(file); // Guardar archivo antes del vuelo
    } else {
      setAfterFlightFile(file); // Guardar archivo después del vuelo
    }
    onXlsxUpload(event, type); // Llamar a la función de subida
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file); // Guardar el archivo seleccionado
    if (file) {
      onFileUpload(event); // Llamar a la función de subida de archivo
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null); // Quitar el archivo
    onRemoveFile(); // Restablecer los datos
  };

  const stats = ["Aflatoxinas", "Radiación", "Temperatura", "Humedad"];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar className="bg-indigo-800 text-4xl text-white">
        Estadísticos
      </Toolbar>
      <Divider />
      <List>
        {stats.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => onSelectStat(text)}>
              <ListItemIcon>
                <BarChart />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* Botón estilizado de carga de archivo */}
      <div className="p-4">
        {!selectedFile ? (
          <label htmlFor="csv-upload">
            <InputFile
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<UploadFile />}
              component="span"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                padding: "12px 16px",
                backgroundColor: "#3f51b5",
                "&:hover": {
                  backgroundColor: "#2c387e",
                },
              }}
            >
              Subir archivo CSV
            </Button>
          </label>
        ) : (
          <div className="flex flex-col items-center">
            {/* Mostrar el nombre del archivo subido */}
            <p className="text-sm text-gray-600 mb-2">{selectedFile.name}</p>
            {/* Botón para eliminar el archivo */}
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              startIcon={<Delete />}
              onClick={handleRemoveFile}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                padding: "12px 16px",
                color: "#f50057",
                borderColor: "#f50057",
                "&:hover": {
                  backgroundColor: "#ffebee",
                  borderColor: "#f50057",
                },
              }}
            >
              Quitar archivo
            </Button>
          </div>
        )}
      </div>

      <div className="p-4">
        {!beforeFlightFile ? (
          <label htmlFor="xlsx-before-upload">
            <InputFile
              id="xlsx-before-upload"
              type="file"
              accept=".xlsx"
              onChange={(e) => handleXlsxChange(e, "before")}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<UploadFile />}
              component="span"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                padding: "12px 16px",
                backgroundColor: "#3f51b5",
                "&:hover": {
                  backgroundColor: "#2c387e",
                },
              }}
            >
              Aflatoxinas antes del vuelo
            </Button>
          </label>
        ) : (
          <div className="flex flex-col items-center">
            {/* Mostrar el nombre del archivo subido */}
            <p className="text-sm text-gray-600 mb-2">
              {beforeFlightFile.name}
            </p>
            {/* Botón para eliminar el archivo */}
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              startIcon={<Delete />}
              onClick={handleRemoveFile}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                padding: "12px 16px",
                color: "#f50057",
                borderColor: "#f50057",
                "&:hover": {
                  backgroundColor: "#ffebee",
                  borderColor: "#f50057",
                },
              }}
            >
              Quitar archivo
            </Button>
          </div>
        )}
      </div>

      <div className="p-4">
        {!afterFlightFile ? (
          <label htmlFor="xlsx-after-upload">
            <InputFile
              id="xlsx-after-upload"
              type="file"
              accept=".xlsx"
              onChange={(e) => handleXlsxChange(e, "after")}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<UploadFile />}
              component="span"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                padding: "12px 16px",
                backgroundColor: "#3f51b5",
                "&:hover": {
                  backgroundColor: "#2c387e",
                },
              }}
            >
              Aflatoxinas después del vuelo
            </Button>
          </label>
        ) : (
          <div className="flex flex-col items-center">
            {/* Mostrar el nombre del archivo subido */}
            <p className="text-sm text-gray-600 mb-2">{afterFlightFile.name}</p>
            {/* Botón para eliminar el archivo */}
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              startIcon={<Delete />}
              onClick={handleRemoveFile}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                padding: "12px 16px",
                color: "#f50057",
                borderColor: "#f50057",
                "&:hover": {
                  backgroundColor: "#ffebee",
                  borderColor: "#f50057",
                },
              }}
            >
              Quitar archivo
            </Button>
          </div>
        )}
      </div>
    </Drawer>
  );
}
