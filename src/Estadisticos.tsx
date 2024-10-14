import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BarChart } from "@mui/icons-material";

interface EstadisticosProps {
  onSelectStat: (stat: string) => void;
}
const drawerWidth = 240;

export default function Estadisticos({ onSelectStat }: EstadisticosProps) {
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
    </Drawer>
  );
}
