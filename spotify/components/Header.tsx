"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAutModel from "@/hooks/useAutModel";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const autmodel = useAutModel();
  const supaCliente = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supaCliente.auth.signOut();
    router.refresh();
    if (error) {
        toast.error(error.message, { duration: 5000 }); //Este es un pequeno mensaje que aparece en la parte superir 
    } else {
        toast.success("Logged out!!", { duration: 5000 });
    };
  };
  return (
    <div
      className={twMerge(
        `h-fil  bg-gradient-to-b
             from-emerald-800 p-6 `,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center ">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center 
                    justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white " size={35} />
          </button>

          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center 
                    justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white " size={35} />
          </button>
        </div>

        <div className="flex md:hidden gap-x-2 items-center ">
          <button className="rounded-full p-2 bg-white items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black " size={20} />
          </button>

          <button className="rounded-full p-2 bg-white items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black " size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center "> 
                <Button 
                className="bg-white  px-6 py-2"
                onClick={handleLogout}>
                    Logout 
                </Button>
                <Button
                onClick={()=> router.push('/acccount')}
                className="bg-white"><FaUserAlt/>
                </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={autmodel.onOpen}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  onClick={autmodel.onOpen}
                  className="bg-white px-6 py-2 "
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
