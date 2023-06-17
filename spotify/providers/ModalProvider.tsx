'use client';

import { useEffect, useState } from "react";
import AutModel from "../components/AutModel";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return ( 
        <>
           <AutModel/>
        </>
     );
}
 
export default ModalProvider;