import {
  Sidebar as Root,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogOutIcon, Rotate3dIcon } from "lucide-react";

// import Logo from "@/assets/laca-logo.webp";
import { Badge } from "@/components/ui/badge";
import { API } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppMenuRoute } from "./menu";

export function Sidebar() {
  const router = useRouter();
  const { state, setOpenMobile } = useSidebar();
  const location = useLocation({
    select: (location) => location.pathname,
  });

  const menu = AppMenuRoute;

  const signOut = useMutation({
    mutationFn: async function () {
      const route = "/authentication/sign-out";
      await API.post(route);
    },
    onSuccess() {
      toast("Operação efetuada com sucesso!", {
        className: "!bg-primary !text-primary-foreground !border-primary",
        description: "Para continuar, efetue o login!",
        descriptionClassName: "!text-primary-foreground",
        closeButton: true,
      });

      router.navigate({
        to: "/sign-in",
        replace: true,
      });
    },
  });

  return (
    <Root collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link
                to="/dashboard"
                search={{
                  search: undefined,
                }}
              >
                <Rotate3dIcon className="size-5" />
                <span className="text-base font-semibold">MANGANGÁ</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {menu?.map((props) => (
          <SidebarGroup>
            <SidebarGroupLabel>{props.title}</SidebarGroupLabel>
            <SidebarMenu>
              {props.items.map((item) => {
                const to = String(item?.url?.toString() ?? "/").replace(
                  /\/$/,
                  ""
                );

                return (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="group data-[active=true]:bg-primary data-[active=true]:text-primary-foreground "
                      isActive={location.includes(to)}
                      tooltip={item.title}
                    >
                      <Link to={to} onClick={() => setOpenMobile(false)}>
                        {item.icon && (
                          <item.icon
                            className="text-primary group-data-[active=true]:text-primary-foreground"
                            width={32}
                          />
                        )}
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge className="rounded-full px-1  text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
        <SidebarGroup>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => signOut.mutateAsync()}
                    // onClick={() => deslogarMutation.mutateAsync()}
                    // onClick={logout}
                    className="w-full rounded-none cursor-pointer"
                  >
                    <LogOutIcon className="text-primary" />
                    <span>Sair</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </TooltipTrigger>
            {state === "collapsed" && (
              <TooltipContent side="right">Sair</TooltipContent>
            )}
          </Tooltip>
        </SidebarGroup>
      </SidebarContent>
    </Root>
  );
}
