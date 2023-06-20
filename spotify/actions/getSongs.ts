import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../types";
import { headers, cookies } from "next/headers";

const getSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient(
        {cookies: cookies}
    )
};