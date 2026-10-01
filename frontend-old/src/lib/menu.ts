import type { LinkProps } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export interface MenuRouteBaseItem {
  title: string;
  badge?: string;
  icon?: LucideIcon;
}

export type LinkItem = MenuRouteBaseItem & {
  url: LinkProps["to"];
  items?: never;
};

export type CollapsibleItem = MenuRouteBaseItem & {
  items: (MenuRouteBaseItem & { url: LinkProps["to"] })[];
  url?: LinkProps["to"];
};

export type MenuItem = CollapsibleItem | LinkItem;

export type MenuGroupItem = {
  title: string;
  items: MenuItem[];
};

export type MenuRoute = MenuGroupItem[];
