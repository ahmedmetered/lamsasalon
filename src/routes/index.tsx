import { createFileRoute } from "@tanstack/react-router";
import { LangProvider } from "@/lib/i18n";
import { Footer, Header, Hero, Offer, Services, Team, Visit } from "@/components/salon/Sections";
import { Booking } from "@/components/salon/Booking";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "صالون لمسة | Lamsa Salon — لمسة تفرق" },
      { name: "description", content: "صالون لمسة للسيدات: شعر، مكياج، أظافر وعناية بالبشرة. اطلبي موعدك أونلاين." },
      { property: "og:title", content: "صالون لمسة | Lamsa Salon" },
      { property: "og:description", content: "شعر، مكياج، أظافر وعناية بالبشرة — لمسة تفرق." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <div className="mx-auto max-w-5xl overflow-x-hidden">
        <Header />
        <main>
          <Hero />
          <Services />
          <Team />
          <Offer />
          <Booking />
          <Visit />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
