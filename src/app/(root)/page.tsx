import { CustomAccordion } from "@/components/custom-accordion";
import Header from "@/components/header";
import { ImageSlider } from "@/components/image-slider";

const accordionItems = [
  { title: "First", description: "First description" },
  { title: "Second", description: "Second description" },
  { title: "Third", description: "Third content" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <ImageSlider />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <section className="py-8">
          <h2 className="text-3xl font-bold text-center mb-8">سوالات متداول</h2>
          <CustomAccordion items={accordionItems} defaultOpenIndex={0} />
        </section>
      </div>
    </main>
  );
}
