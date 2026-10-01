import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <Outlet />
    </>
  ),
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "Site oficial do Boi Bumbá Mangangá - Tradição, cultura e festa popular brasileira",
      },
      {
        title: "Mangangá - Site Oficial do Boi Bumbá",
      },
    ],
  }),
});
