import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  IconButton,
} from "@mui/material";

import { SIDEBAR_TABS } from "../../config/sidebar.tabs";
import ClinicLogo from "../../assets/icons/Clinic-Logo.svg";
import VidaiLogo from "../../assets/icons/Vidai-logo.svg";
import DashboardCardBg from "../../assets/icons/dashboard_card_bg.svg";

import styles from "../../styles/sidebar.module.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(0);
  const tab = SIDEBAR_TABS[activeTab];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 270,
        "& .MuiDrawer-paper": {
          width: 270,
          backgroundColor: "#FAFAFA",
          borderRight: "none",
        },
      }}
    >
      {/* LOGO */}
      <Box className={styles.logo}>
        <img src={ClinicLogo} width={134} alt="Clinic Logo" />
      </Box>

      {/* TOP ICON ROW */}
      <Box className={styles.iconRow}>
        {SIDEBAR_TABS.map((t, idx) => {
          const isActive = activeTab === idx;

          return (
            <IconButton
              key={t.key}
              className={isActive ? styles.iconBtnActive : styles.iconBtn}
              onClick={() => {
                setActiveTab(idx);
                navigate(t.defaultPath);
              }}
            >
              <img
                src={t.icon.src}
                alt={t.label}
                className={isActive ? styles.iconImgActive : styles.iconImg}
              />
            </IconButton>
          );
        })}
      </Box>

      {/* MAIN CARD */}
      <Box className={styles.cardWrapper}>
        <Box className={styles.card}>
          {/* CARD HEADER */}
          <Typography className={styles.cardTitle}>{tab.label}</Typography>

          {/* MENU */}
          <List className={styles.menu}>
            {tab.menu.map((item) => {
              const active = location.pathname === item.path;

              return (
                <ListItemButton
                  key={item.key}
                  onClick={() => navigate(item.path)}
                >
                  <Typography
                    className={active ? styles.menuTextActive : styles.menuText}
                  >
                    {item.label}
                  </Typography>
                </ListItemButton>
              );
            })}
          </List>

          {/* BACKGROUND DECOR */}
          <img src={DashboardCardBg} className={styles.cardBg} alt="" />

          {/* FOOTER */}
          <Box className={styles.footer}>
            <img src={VidaiLogo} width="70%" alt="Vidai Logo" />
            <Typography className={styles.version}>
              Updated Version 2.0
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
