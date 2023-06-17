"use client";

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAutModel from "@/hooks/useAutModel";
import { useEffect } from "react";

const AutModel = () => {
  const supaCliente = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAutModel();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <Modal
      title="Welcom back"
      descritpion="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth //Este elemento esta predefinido y ayuda a la autenticacion
        theme="dark"
        magicLink
        providers={["google", "github", "facebook"]}
        supabaseClient={supaCliente}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040", //color del boton
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
      Auth Modal Content
    </Modal>
  );
};

export default AutModel;
