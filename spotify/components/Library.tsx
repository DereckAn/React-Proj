"use cliente";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAutModel from "@/hooks/useAutModel";
import { useUser } from "@/hooks/useUser";
import useUploadModel from "@/hooks/uploadModel";
import { Song } from "@/types";
import MediaItem from "./MediaItem";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({songs}) => {
  const autModel = useAutModel();
  const autUploadModel = useUploadModel();
  const { user } = useUser();
  const onClick = () => {
    if (!user) {
      autModel.onOpen();
    }
    return autUploadModel.onOpen(); // esto es para abrir cuando clickemos en en boton de mas
    //handle upload later
  };

  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between px-5 pt-4 ">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md">Your library</p>
        </div>
        <AiOutlinePlus //este es el boton de "+"
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3 ">

        {songs.map((item) => (
          // <div>{item.title}</div>
          <MediaItem onClick={()=>{}}
          key={item.id}
          data={item}/>
        ))}
      </div>
    </div>
  );
};

export default Library;
