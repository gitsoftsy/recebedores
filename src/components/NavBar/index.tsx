"use client";

import { useContext, useState } from "react";
import { HiCash } from "react-icons/hi";
import { IoExitOutline } from "react-icons/io5";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { SiDatabricks } from "react-icons/si";
import {
  Menu,
  menuClasses,
  MenuItem,
  Sidebar,
  sidebarClasses,
} from "react-pro-sidebar";
import Image from "next/image";
import Link from "next/link";
import logoSoftsy from "/public/logo-softsy.png"
import { UserContext } from "@/contexts/UserContext";

interface NavBarProps {
  receiverName: string;
}

export default function NavBar({ receiverName }: NavBarProps) {
  const { handleLogout } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sidebar
      backgroundColor="#031E3B"
      style={{ border: "none !important" }}
      collapsed={collapsed}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: "12px",
          border: "none !important",
          height: "100% !important",
          minHeight: "100vh",
        },
        [`.${sidebarClasses.root}`]: {
          border: "none !important",
        },
      }}
    >
      <header>
        <div
          className={`flex w-full ${
            collapsed ? "justify-center mb-6" : "justify-end pe-4"
          } items-center pt-3`}
        >
          {collapsed ? (
            <MdKeyboardDoubleArrowRight
              className="cursor-pointer"
              color="white"
              size={32}
              onClick={() => setCollapsed(false)}
            />
          ) : (
            <MdKeyboardDoubleArrowLeft
              className="cursor-pointer"
              color="white"
              size={32}
              onClick={() => setCollapsed(true)}
            />
          )}
        </div>
        <div className="flex justify-center w-full px-4">
          <Image
            src={logoSoftsy}
            // width={500}
            // height={500}
            className="w-full h-auto bg-white rounded-lg"
            alt="Logo"
            priority={true}
          />
        </div>
        <Menu
          menuItemStyles={{
            button: ({ level, active }) => {
              if (level === 0)
                return {
                  backgroundColor: active ? "#0061d9" : undefined,
                  borderRadius: "6px",
                };
            },
          }}
          rootStyles={{
            [`.${menuClasses.menuItemRoot}`]: {
              color: "#fff !important",
              margin: "8px 0px",
              padding: "0px 20px",

              "&:first-of-type": {
                // marginTop: "32px !important",
              },
            },
            [`.${menuClasses.button}`]: {
              transition: "all 0.3s",
              paddingLeft: "0px !important",
              paddingRight: "0px !important",
              "& > span": {
                zIndex: 100,
              },
              "&:hover": {
                backgroundColor: "#0061d9",
              },
            },
          }}
        >
          <MenuItem icon={<SiDatabricks size={20} />}> Cadastro</MenuItem>
        </Menu>
      </header>
      <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            if (level === 0)
              return {
                backgroundColor: active ? "#0061d9" : undefined,
                borderRadius: "6px",
              };
          },
        }}
        rootStyles={{
          [`.${menuClasses.menuItemRoot}`]: {
            color: "#fff !important",
            margin: "8px 0px",
            padding: "0px 20px",

            "&:first-of-type": {
              marginTop: "32px !important",
            },
          },
          [`.${menuClasses.button}`]: {
            transition: "all 0.3s",
            paddingLeft: "0px !important",
            paddingRight: "0px !important",
            "& > span": {
              zIndex: 100,
            },
            "&:hover": {
              backgroundColor: "#0061d9",
            },
          },
        }}
      >
        <MenuItem icon={<HiCash size={20} />} component={<Link href={""} />}>
          {receiverName}
        </MenuItem>

        <MenuItem icon={<IoExitOutline size={20} />} onClick={handleLogout}>
          Sair
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
