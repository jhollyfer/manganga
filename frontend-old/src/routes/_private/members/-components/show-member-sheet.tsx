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
import type { Member } from "@/lib/model";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { EyeIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

export function ShowMemberSheet({ memberId }: { memberId: string }) {
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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <EyeIcon className="size-4" />
          <span>Visualizar</span>
        </DropdownMenuItem>
      </SheetTrigger>
      <SheetContent className="flex flex-col py-4 px-6 gap-5 w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="px-0">
          <SheetTitle className="text-lg font-medium">
            Visualizar detalhes membro
          </SheetTitle>
          <SheetDescription>Veja os detalhes do membro</SheetDescription>
        </SheetHeader>

        {/* {roles?.status === "error" && <Error />} */}

        {/* {roles?.status === "pending" && <Skeleton />} */}

        {response.status === "success" && (
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                defaultValue={response.data?.user?.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="data-[error=true]:text-destructive">
                      Nome completo
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="Seu nome completo"
                        {...field}
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="data-[error=true]:text-destructive">
                      RG/CPF
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        className="bg-background h-10"
                        // placeholder="000.000.000-00"
                        onChange={(e) => {
                          field.onChange(Formatter.number(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-right text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthDate"
                disabled
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="data-[error=true]:text-destructive">
                      Categoria
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger disabled className="w-full">
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
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled
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
                  defaultValue={response.data?.user?.responsible?.mother}
                  control={form.control}
                  name="responsible.mother"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="data-[error=true]:text-destructive">
                        Nome da Mãe
                      </FormLabel>
                      <FormControl>
                        <Input disabled placeholder="" {...field} />
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
                      </FormLabel>
                      <FormControl>
                        <Input disabled placeholder="" {...field} />
                      </FormControl>
                      <FormMessage className="text-right text-destructive" />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        )}
      </SheetContent>
    </Sheet>
  );
}
