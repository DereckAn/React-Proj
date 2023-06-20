import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const  useLoadImage = (song: Song) => {
    const supaCliente = useSupabaseClient();

    if(!song){
        return;
    } 

    const {data: songImage } =  supaCliente.storage.from('images').getPublicUrl(song.image_path);
    return songImage.publicUrl;
    
};

export default useLoadImage;