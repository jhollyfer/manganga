import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { API } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { EyeClosedIcon, EyeIcon, LoaderCircle } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/_authentication/sign-in")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Mangangá - Entrar na sua conta",
      },
      {
        name: "description",
        content:
          "Acesse sua conta do Boi Bumbá Mangangá e gerencie sua participação nos eventos",
      },
    ],
  }),
});

function RouteComponent() {
  //  const navigate = useNavigate();
  const router = useRouter();
  const [show, setShow] = React.useState<{
    password: boolean;
  }>({
    password: false,
  });

  // const { logar } = useAuthentication();

  const _logar = useMutation({
    mutationFn: async function (payload: { email: string; password: string }) {
      const route = "/authentication/sign-in";
      const { data } = await API.post(route, payload);
      return data;
    },
    onError(error) {
      console.error("Erro ao fazer login:", error);
      // setIsAuthenticated(false);
    },
    onSuccess(resposta) {
      console.log(resposta);
      toast("Login efetuado com sucesso!", {
        className: "!bg-primary !text-primary-foreground !border-primary",
        description: "Seja bem-vindo, comece a explorar!",
        descriptionClassName: "!text-primary-foreground",
        closeButton: true,
      });
      // logar(resposta);
      // navigate("/dashboard", { replace: true });
      router.navigate({
        to: "/dashboard",
        replace: true,
        search: {
          search: undefined,
        },
      });
    },
  });

  const form = useForm();

  const onSubmit = form.handleSubmit(function (payload) {
    _logar.mutateAsync({
      email: payload.email,
      password: payload.password,
    });
  });

  return (
    <section className="flex flex-1 flex-col w-full h-screen items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="max-w-[32.5rem] w-full flex flex-col gap-4 shadow-2xl p-8 rounded-2xl"
        >
          <div className="flex justify-center pt-4 pb-2">
            <h1 className="text-3xl font-bold text-primary">Entrar</h1>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="example@manganga.com" {...field} />
                </FormControl>
                <FormMessage className="text-right text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative inline-flex">
                    <Input
                      type={show.password ? "text" : "password"}
                      // placeholder="********************"
                      className="text-lg w-full flex-1 rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none"
                      {...field}
                    />
                    <Button
                      type="button"
                      onClick={() =>
                        setShow((state) => ({
                          ...state,
                          password: !state.password,
                        }))
                      }
                      className="rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md"
                    >
                      {!show.password && <EyeIcon className="w-4 h-4" />}
                      {show.password && <EyeClosedIcon className="w-4 h-4" />}
                    </Button>
                  </div>
                </FormControl>

                <FormMessage className="text-right" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full "
            disabled={_logar.status === "pending"}
          >
            {_logar.status === "pending" && (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            )}
            {!(_logar.status === "pending") && <span>Entrar</span>}
          </Button>
        </form>
      </Form>
    </section>
  );
}
