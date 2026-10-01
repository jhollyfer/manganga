import { createFileRoute } from "@tanstack/react-router";
import { About } from "./-components/about";
import { Festival } from "./-components/festival";
import { Footer } from "./-components/footer";
import { Hero } from "./-components/hero";
import { Join } from "./-components/join";
import { Navbar } from "./-components/navbar";

export const Route = createFileRoute("/_landing-page/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Festival />
        <About />
        <Join />
        <Footer />
      </main>
    </>
  );
}
