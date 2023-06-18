"use client";

import useUploadModel from "@/hooks/uploadModel";
import Modal from "./Modal";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";



const UploadModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const UploadModal = useUploadModel();
  const { user } = useUser();
  const supaCliente = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset(); //Esto es parte de react-hook-form
      //reste the form
      UploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    //upload to supabase
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }

      const uniId = uniqid(); //Esto es para que no se repita el nombre de la cancion

      //upload song to the database
      const {
        //Esto es para que se guarde en la base de datos
        data: songData,
        error: songError,
      } = await supaCliente.storage
        .from("songs")
        .upload(`song-${values.title}-${uniId}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Something went wrong when uploading the song");
      }

      //upload image to the database
      const {
        //Esto es para que se guarde en la base de datos
        data: imageData,
        error: imageError,
      } = await supaCliente.storage
        .from("images")
        .upload(`image-${values.title}-${uniId}`, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Something went wrong when uploading the image");
      }

      const { error: supabaseError } = await supaCliente.from("songs").insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path,
      });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song uploaded successfully");
      reset();
      UploadModal.onClose();


    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      UploadModal.onClose();
    }
  };

  return (
    <Modal
      title="Add a song"
      descritpion="Upload an mp3 file"
      isOpen={UploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song Author"
        />
        <div>
          <div className="pb-1">Select a song</div>
          <Input //no se como pero esto hace que puedas abrir una carpeta y seleccionar un archivo
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            placeholder="test"
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select a Image</div>
          <Input //no se como pero esto hace que puedas abrir una carpeta y seleccionar un archivo
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            placeholder="test"
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModel;
