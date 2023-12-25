
import SideNar from "@/components/SideBar";
import UrunList from "@/components/UrunList";
import { useBackend } from "@/context/Api";
import { useEffect } from "react";

export default function Urunler() {


  return (
    <>

      <SideNar/>
      <UrunList/>
      
    </>


  );
}
