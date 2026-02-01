// src/config/sidebar.tabs.ts
import QualityIcon from "../assets/icons/Quality_control.svg";
import DocumentIcon from "../assets/icons/Documentation_control.svg";
import RiskIcon from "../assets/icons/Riskmanagement.svg";
import ComplianceIcon from "../assets/icons/Compliance.svg";

import {
  LEADS_MENU,
  DOCUMENTS_MENU,
  RISK_MENU,
  COMPLIANCE_MENU,
} from "./sidebar.menu";

export type SidebarTabKey = "leads" | "documents" | "risk" | "compliance";

export type SidebarTabConfig = {
  key: SidebarTabKey;
  label: string;
  icon: {
    src: string;
    baseScale: number;
  };
  defaultPath: string;
  menu: typeof LEADS_MENU;
};

export const SIDEBAR_TABS: SidebarTabConfig[] = [
  {
    key: "leads",
    label: "VIDAI Leads",
    icon: { src: QualityIcon, baseScale: 1.2 },
    defaultPath: "/dashboard",
    menu: LEADS_MENU,
  },
  {
    key: "documents",
    label: "Documents",
    icon: { src: DocumentIcon, baseScale: 1 },
    defaultPath: "/documents",
    menu: DOCUMENTS_MENU,
  },
  {
    key: "risk",
    label: "Risk",
    icon: { src: RiskIcon, baseScale: 1 },
    defaultPath: "/risk",
    menu: RISK_MENU,
  },
  {
    key: "compliance",
    label: "Compliance",
    icon: { src: ComplianceIcon, baseScale: 1.2 },
    defaultPath: "/compliance",
    menu: COMPLIANCE_MENU,
  },
];
