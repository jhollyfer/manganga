import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { QueryClient } from "./query-client";
import { routeTree } from "./route-tree.gen";

const router = createRouter({
  routeTree,
  context: {
    QueryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <TooltipProvider>
      {/* <AuthenticationProvider> */}
      <QueryClientProvider client={QueryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      {/* </AuthenticationProvider> */}
      <Toaster />
    </TooltipProvider>
  );
}
