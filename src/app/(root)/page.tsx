import { CustomAccordion } from "@/components/custom-accordion";
import Header from "@/components/header";
import { ImageSlider } from "@/components/image-slider";
import getFAQs from "@/services/faqs";

export default async function Home() {
  const faqs = await getFAQs();

  return (
    <main className="min-h-screen">
      <Header />
      <ImageSlider />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <section className="py-8">
          <h2 className="text-3xl font-bold text-center mb-8">سوالات متداول</h2>
          <CustomAccordion items={faqs} defaultOpenIndex={0} />
        </section>
      </div>
    </main>
  );
}
