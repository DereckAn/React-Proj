"use cliente";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

const Library = () => {
    const onClick = () => {
        //handle upload later 
    };

    return ( 
        <div className="flex flex-col ">
            <div className="flex items-center justify-between px-5 pt-4 ">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist size={26}
                    className="text-neutral-400"/>
                    <p className="text-neutral-400 font-medium text-md">Your library</p>
                </div>
                <AiOutlinePlus/>

            </div>
        </div>
     );
}
 
export default Library;


