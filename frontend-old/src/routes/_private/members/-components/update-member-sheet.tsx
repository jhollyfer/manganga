import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { CircleIcon, PencilIcon } from "lucide-react";
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

export function UpdateMemberSheet({ memberId }: { memberId: string }) {
  const { search, page, perPage } = useSearch({
    from: "/_private/members/",
  });

  const [open, setOpen] = React.useState(false);
  const form = useForm();

  const response = useQuery({
    queryKey: ["MEMBER-GET-BY-ID", memberId],
    queryFn: async function () {
      const route = `/administrator/members/${memberId}`;
      const { data } = await API.get<Member>(route);
      return data;
    },
  });

  const update = useMutation({
    mutationFn: async function (payload: Partial<Payload>) {
      const route = "/administrator/members/".concat(memberId);
      const { data } = await API.patch<Member>(route, payload);
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
      //

      QueryClient.invalidateQueries({
        queryKey: ["MEMBER-GET-BY-ID", memberId],
      });

      setOpen(false);
      form.reset();
      toast("Membro atualizado com sucesso!", {
        className: "!bg-primary !text-primary-foreground !border-primary",
        description: "Os dados do membro foram atualizados!",
        descriptionClassName: "!text-primary-foreground",
        closeButton: true,
      });
    },
  });

  const onSubmit = form.handleSubmit(function (payload) {
    update.mutateAsync({
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
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <PencilIcon className="size-4" />
          <span>Editar</span>
        </DropdownMenuItem>
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

        {response?.status === "success" && (
          <Form {...form}>
            <form className="space-y-4" onSubmit={onSubmit}>
              <FormField
                control={form.control}
                name="name"
                defaultValue={response.data?.user?.name}
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
                defaultValue={response.data?.document}
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
                        (obrigatório, somente números)
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
                defaultValue={response.data?.birthDate
                  ?.split("T")[0]
                  ?.split("-")
                  .reverse()
                  .join("/")}
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
                        <span className="text-destructive/80">
                          (obrigatório)
                        </span>
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
                          autoComplete="off"
                          className={cn(hasError && "border-destructive")}
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
                defaultValue={response.data?.user?.role}
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
                        <SelectItem value="COLLABORATOR">
                          Colaborador
                        </SelectItem>
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
                defaultValue={response.data?.extras}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="data-[error=true]:text-destructive">
                      Outras informações
                      <span className="text-muted-foreground/80">
                        (opcional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Informações adicionais"
                        {...field}
                      />
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
                  defaultValue={response.data?.user?.responsible?.mother}
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
                        <span className="text-destructive/80">
                          (obrigatório)
                        </span>
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
                  defaultValue={response.data?.user?.responsible?.father}
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
                disabled={update.status === "pending"}
              >
                {update.status === "pending" && (
                  <CircleIcon className="mr-2 animate-spin" />
                )}
                <span className="font-semibold">Atualizar</span>
              </Button>
            </form>
          </Form>
        )}
      </SheetContent>
    </Sheet>
  );
}
