import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSidebar } from "../context/useSidebar";
import { useAuth } from "../context/useAuth";
import {
  GridIcon,
  UserCircleIcon,
  CalenderIcon,
  ListIcon,
  DollarIcon,
  FileIcon,
  ChevronDownIcon,
  HorizontaLDots,
} from "../components/icons/Icons";

const AppSidebar = () => {
  const { isExpanded, isHovered, isMobileOpen, setIsHovered } = useSidebar();
  const { user } = useAuth();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  // HR/Admin Menu Items
  const hrMenuItems = [
    {
      icon: <GridIcon />,
      name: "Dashboard",
      path: "/hr/dashboard",
    },
    {
      icon: <UserCircleIcon />,
      name: "Staff Onboarding",
      path: "/hr/onboard",
    },
    {
      icon: <CalenderIcon />,
      name: "Attendance Reports",
      path: "/hr/attendance",
    },
    {
      icon: <DollarIcon />,
      name: "Payroll",
      path: "/hr/payroll",
    },
  ];

  // Employee Menu Items
  const employeeMenuItems = [
    {
      icon: <GridIcon />,
      name: "Dashboard",
      path: "/employee/dashboard",
    },
    {
      icon: <CalenderIcon />,
      name: "Mark Attendance",
      path: "/attendance/mark",
    },
    {
      icon: <ListIcon />,
      name: "Attendance History",
      path: "/attendance/history",
    },
    {
      icon: <FileIcon />,
      name: "Payslips",
      path: "/payroll/list",
    },
  ];

  const menuItems =
    user?.role === "HR" || user?.role === "Admin"
      ? hrMenuItems
      : employeeMenuItems;

  useEffect(() => {
    menuItems.forEach((nav, index) => {
      if (nav.path && isActive(nav.path)) {
        setOpenSubmenu(null);
      }
    });
  }, [location, isActive, menuItems]);

  const renderMenuItems = () => (
    <ul className="flex flex-col gap-4">
      {menuItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.path ? (
            <NavLink
              to={nav.path}
              className={({ isActive: active }) =>
                `menu-item group ${
                  active ? "menu-item-active" : "menu-item-inactive"
                }`
              }
            >
              <span
                className={`menu-item-icon-size ${
                  isActive(nav.path)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
            </NavLink>
          ) : null}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <NavLink
          to={
            user?.role === "HR" || user?.role === "Admin"
              ? "/hr/dashboard"
              : "/employee/dashboard"
          }
        >
          {isExpanded || isHovered || isMobileOpen ? (
            <span className="text-xl font-bold text-brand-500">HRMS</span>
          ) : (
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
          )}
        </NavLink>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems()}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
