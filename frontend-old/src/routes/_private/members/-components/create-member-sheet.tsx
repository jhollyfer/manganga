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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { API } from "@/lib/api";
import { Formatter } from "@/lib/formatter";
import type { Member, Responsible } from "@/lib/model";
import { cn } from "@/lib/utils";
import { QueryClient } from "@/query-client";
import { useMutation } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { CircleIcon, PlusIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Payload {
  name: string;
  document: string;
  birthDate: string;
  role: string;
  extras: string | null;
  responsible: Pick<Responsible, "mother" | "father">;
}

export function CreateMemberSheet() {
  const { search, page, perPage } = useSearch({
    from: "/_private/members/",
  });

  const [open, setOpen] = React.useState(false);
  const form = useForm();

  const create = useMutation({
    mutationFn: async function (payload: Partial<Payload>) {
      const route = "/administrator/members";
      const { data } = await API.post<Member>(route, payload);
      return data;
    },
    onSuccess() {
      QueryClient.invalidateQueries({
        queryKey: [
          "MEMBERS-LIST-PAGINATED",
          {
            page,
            perPage,
            ...(search && { search }),
          },
        ],
      });

      setOpen(false);
      form.reset();
      toast("Membro cadastrado com sucesso!", {
        className: "!bg-primary !text-primary-foreground !border-primary",
        description: "Os dados do membro foram salvos!",
        descriptionClassName: "!text-primary-foreground",
        closeButton: true,
      });
    },
    onError(error) {
      if (error instanceof AxiosError) {
        const data = error.response?.data as {
          message: string;
          code: number;
          cause: string;
        };

        if (data.code === 409 && data.cause === "MEMBER_ALREADY_EXISTS") {
          form.setError("document", {
            message:
              "Os dados do membro com este Documento já foram cadastrados.",
          });
          // toast("Membro já cadastrado!", {
          //   className: "!bg-primary !text-primary-foreground !border-primary",
          //   description: data.message,
          //   descriptionClassName: "!text-primary-foreground",
          //   closeButton: true,
          // });
          return;
        }

        toast("Houve um erro!", {
          className: "!bg-primary !text-primary-foreground !border-primary",
          description:
            "Houve um erro ao cadastrar o membro. Tente novamente mais tarde.",
          descriptionClassName: "!text-primary-foreground",
          closeButton: true,
        });
      }
    },
  });

  const onSubmit = form.handleSubmit(function (payload) {
    create.mutateAsync({
      ...payload,
      document: Formatter.number(payload.document),
      birthDate: String(payload.birthDate)?.split("/").reverse().join("-"),
      extras: payload.extras || null,
      responsible: {
        ...payload.responsible,
        father: payload.responsible.father || null,
      },
    });
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="cursor-pointer">
          <PlusIcon className="size-5" />
          <span>Novo membro</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col py-4 px-6 gap-5 w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="px-0">
          <SheetTitle className="text-lg font-medium">
            Adicionar membro
          </SheetTitle>
          <SheetDescription>Adicione um novo membro</SheetDescription>
        </SheetHeader>

        {/* {roles?.status === "error" && <Error />} */}

        {/* {roles?.status === "pending" && <Skeleton />} */}

        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="name"
              rules={{
                validate: (value) => {
                  if (!value) return "Nome é obrigatório";
                  return true;
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="data-[error=true]:text-destructive">
                    Nome completo
                    <span className="text-destructive/80">(obrigatório)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Seu nome completo"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage className="text-right text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="document"
              rules={{
                validate: (value) => {
                  if (!value) return "Documento é obrigatório";
                  return true;
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="data-[error=true]:text-destructive">
                    RG/CPF
                    <span className="text-destructive/80">
                      (obrigatório, somente números)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-background h-10"
                      // placeholder="000.000.000-00"
                      onChange={(e) => {
                        field.onChange(Formatter.number(e.target.value));
                      }}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage className="text-right text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              rules={{
                validate: (value) => {
                  if (!value) return "Data de nascimento é obrigatório";

                  // Validação adicional do formato da data
                  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
                  const match = value.match(dateRegex);

                  if (!match) return "Formato de data inválido";

                  const [, day, month, year] = match;
                  const date = new Date(
                    parseInt(year),
                    parseInt(month) - 1,
                    parseInt(day)
                  );

                  // Verifica se a data é válida
                  if (
                    date.getDate() !== parseInt(day) ||
                    date.getMonth() !== parseInt(month) - 1 ||
                    date.getFullYear() !== parseInt(year)
                  ) {
                    return "Data inválida";
                  }

                  // Verifica se não é uma data futura
                  if (date > new Date()) {
                    return "Data de nascimento não pode ser no futuro";
                  }

                  return true;
                },
              }}
              render={({ field }) => {
                const hasError = !!form.formState.errors[field.name];

                return (
                  <FormItem>
                    <FormLabel className="data-[error=true]:text-destructive">
                      Data de Nascimento
                      <span className="text-destructive/80">(obrigatório)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        // onChange={handleChange}
                        onChange={(e) => {
                          field.onChange(Formatter.date(e.target.value));
                        }}
                        placeholder="00/00/0000"
                        maxLength={10}
                        className={cn(hasError && "border-destructive")}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage className="text-right text-destructive" />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="role"
              rules={{
                validate: (value) => {
                  if (!value) return "Categoria é obrigatória";
                  return true;
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="data-[error=true]:text-destructive">
                    Categoria
                    <span className="text-destructive/80">(obrigatório)</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FOUNDER">Fundador</SelectItem>
                      <SelectItem value="SPONSOR">Patrocinador</SelectItem>
                      <SelectItem value="COLLABORATOR">Colaborador</SelectItem>
                      <SelectItem value="PARTICIPANT">Brincante</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-right text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="extras"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="data-[error=true]:text-destructive">
                    Outras informações
                    <span className="text-muted-foreground/80">(opcional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Informações adicionais" {...field} />
                  </FormControl>
                  <FormMessage className="text-right text-destructive" />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <h3 className="text-md font-medium">Filiação</h3>

              <FormField
                control={form.control}
                name="responsible.mother"
                rules={{
                  validate: (value) => {
                    if (!value) return "Nome da mãe é obrigatório";
                    return true;
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="data-[error=true]:text-destructive">
                      Nome da Mãe
                      <span className="text-destructive/80">(obrigatório)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage className="text-right text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="responsible.father"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="data-[error=true]:text-destructive">
                      Nome do Pai
                      <span className="text-muted-foreground/80">
                        (opcional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage className="text-right text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              className="w-full"
              type="submit"
              disabled={create.status === "pending"}
            >
              {create.status === "pending" && (
                <CircleIcon className="mr-2 animate-spin" />
              )}
              <span className="font-semibold">Cadastrar</span>
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
