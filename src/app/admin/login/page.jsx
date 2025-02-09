"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          router.push("/admin");
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Фонове зображення */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/9.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" /> {/* Затемнення */}
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl mx-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Вхід в адмін-панель
        </h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#1a1a1a",
                  brandAccent: "#333333",
                },
              },
            },
            className: {
              container: "auth-container",
              button: "auth-button",
              input: "auth-input",
            },
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: "Email адреса",
                password_label: "Пароль",
                button_label: "Увійти",
                loading_button_label: "Вхід...",
                email_input_placeholder: "Ваш email",
                password_input_placeholder: "Ваш пароль",
              },
            },
          }}
          providers={[]}
          view="sign_in"
          showLinks={false}
        />
      </div>
    </div>
  );
}
