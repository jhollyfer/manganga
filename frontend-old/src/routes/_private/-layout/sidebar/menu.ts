import type { MenuRoute } from "@/lib/menu";
import { ChartLineIcon, UserIcon } from "lucide-react";

export const AppMenuRoute: MenuRoute = [
  {
    title: "Menu",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: ChartLineIcon,
      },
      {
        title: "Membros",
        url: "/members",
        icon: UserIcon,
      },
    ],
  },
];
