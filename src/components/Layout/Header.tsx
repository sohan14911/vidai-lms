import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Breadcrumbs,
  Link,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useLocation, Link as RouterLink } from "react-router-dom";
// import { useSelector } from "react-redux";

import CalendarIcon from "@/assets/icons/calendar.svg";
import NotificationIcon from "@/assets/icons/notification.svg";
import MessageQuestionIcon from "@/assets/icons/message-question.svg";
import UserAvatarIcon from "@/assets/icons/ellipse_12.svg";
// import { RootState } from "@/store";

const Header = () => {
  const location = useLocation();
  //   const clinicName = useSelector((state: RootState) => state.clinic.data?.name);

  /* ================= ICON MENU STATE ================= */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeMenu, setActiveMenu] = useState<
    "calendar" | "notification" | "help" | null
  >(null);

  const handleIconClick = (
    event: React.MouseEvent<HTMLElement>,
    type: "calendar" | "notification" | "help",
  ) => {
    setAnchorEl(event.currentTarget);
    setActiveMenu(type);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
  const handleUserMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setUserAnchorEl(e.currentTarget);
  const handleUserMenuClose = () => setUserAnchorEl(null);

  /* ================= BREADCRUMBS ================= */
  const pathnames = location.pathname.split("/").filter(Boolean);

  const breadcrumbMap: Record<string, string> = {
    dashboard: "Dashboard",
    configuration: "Configuration",
    reports: "Reports",
    clinical: "Clinical",
    lab: "Lab",
    documents: "Documents",
    workflows: "Workflows",
  };

  const rootLabel =
    breadcrumbMap[pathnames[0]] ?? pathnames[0]?.replace("-", " ") ?? "Home";

  const iconMenus = [
    { icon: CalendarIcon, type: "calendar" },
    { icon: NotificationIcon, type: "notification" },
    { icon: MessageQuestionIcon, type: "help" },
  ] as const;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#FAFAFA",
        borderRadius: 2,
        color: "#111827",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3, py: 1.5 }}>
        {/* LEFT: Breadcrumbs */}
        <Breadcrumbs sx={{ display: { xs: "none", sm: "flex" } }}>
          <Typography fontWeight={500} color="#666">
            {rootLabel}
          </Typography>

          {pathnames.slice(1).map((name, idx) => {
            const isLast = idx === pathnames.length - 2;
            const label = breadcrumbMap[name] || name;

            return isLast ? (
              <Typography key={name} fontWeight={700}>
                {label}
              </Typography>
            ) : (
              <Link
                key={name}
                component={RouterLink}
                to={`/${pathnames.slice(0, idx + 2).join("/")}`}
                underline="none"
                color="#666"
              >
                {label}
              </Link>
            );
          })}
        </Breadcrumbs>

        {/* RIGHT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="body2"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            Clinic:
            {activeMenu}
            {/* {clinicName || "—"} */}
          </Typography>

          {iconMenus.map(({ icon, type }) => (
            <IconButton
              key={type}
              onClick={(e) => handleIconClick(e, type)}
              sx={{
                width: 48,
                height: 48,
                backgroundColor: "#fff",
                borderRadius: 2,
              }}
            >
              <Box component="img" src={icon} width={24} />
            </IconButton>
          ))}

          {/* USER */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="img"
              src={UserAvatarIcon}
              sx={{ width: 36, height: 36, borderRadius: "50%" }}
            />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography fontWeight={600}>Kate Russell</Typography>
              <Typography fontSize={12} color="#6b7280">
                Receptionist
              </Typography>
            </Box>
            <IconButton size="small" onClick={handleUserMenuOpen}>
              <ArrowDropDownIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>

      {/* ICON MENU */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem disabled>No data</MenuItem>
      </Menu>

      {/* USER MENU */}
      <Menu
        anchorEl={userAnchorEl}
        open={Boolean(userAnchorEl)}
        onClose={handleUserMenuClose}
      >
        <MenuItem>My Account</MenuItem>
        <MenuItem>Change Password</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem sx={{ color: "red", fontWeight: 600 }}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
