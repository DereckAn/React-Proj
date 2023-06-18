'use client';

import { useEffect, useState } from "react";
import AutModel from "../components/AutModel";
import UploadModel from "@/components/UploadModel";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return ( 
        <>
           <AutModel/>
           <UploadModel/>
        </>
     );
}
 
export default ModalProvider;