"use client";

import { useContext, useState } from "react";
import { HiCash } from "react-icons/hi";
import { IoExitOutline } from "react-icons/io5";
import { SiDatabricks } from "react-icons/si";
import { FaBars } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import logoUrucui from "/public/logo-urucui.svg";
import { logout } from "@/utils/receiver";
import { UserContext } from "@/contexts/UserContext";

export default function NavBarResponsive() {
  const { handleLogout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <nav className="bg-[#031E3B] w-full p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Image src={logoUrucui} className="h-10 w-auto" alt="Logo" priority={true} />
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white md:hidden">
          <FaBars size={24} />
        </button>
        <ul
          className={`
            flex-col 
            md:flex-row 
            md:flex 
            overflow-hidden 
            transition-all 
            duration-300 
            ease-in-out 
            transform 
            ${menuOpen ? "scale-y-100" : "scale-y-0"} 
            md:scale-y-100 
            origin-top 
            md:gap-6 
            md:items-center 
            w-full 
            md:w-auto 
            absolute 
            md:relative 
            top-16 
            left-0 
            bg-[#031E3B] 
            md:bg-transparent 
            md:p-0 
            p-4 
            shadow-md 
            md:shadow-none
          `}
        >
          <li>
            <Link
              href={"#"}
              className="flex items-center text-white gap-2 hover:text-gray-300"
            >
              <SiDatabricks size={20} />
              Cadastro
            </Link>
          </li>
          <li>
            <Link
              href={"#"}
              className="flex items-center text-white gap-2 hover:text-gray-300"
            >
              <HiCash size={20} />
              Quero bolsa
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center text-white gap-2 hover:text-gray-300"
            >
              <IoExitOutline size={20} />
              Sair
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}