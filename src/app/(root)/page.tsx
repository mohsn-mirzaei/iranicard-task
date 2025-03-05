import { CustomAccordion } from "@/components/custom-accordion";
import CustomerList from "@/components/customer-list";
import ImageSlider from "@/components/image-slider";
import getFAQs from "@/services/faqs";

// Sample data for the slider
const sliderImages = [
  {
    src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    alt: "معامله ارزهای دیجیتال",
    title: "مدیریت یکپارچه کیف پول",
    description:
      "تمام کیف پول‌های خود را در یک مکان سازماندهی کنید تا حداکثر کارایی و سهولت استفاده را داشته باشید.",
  },
  {
    src: "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    alt: "فناوری بلاکچین",
    title: "سازگاری با زنجیره‌های مختلف",
    description:
      "مدیریت کیف پول‌ها در شبکه‌های بلاکچین مختلف را بدون دردسر انجام دهید.",
  },
];

export default async function Home() {
  const faqs = await getFAQs();

  return (
    <main className="min-h-screen">
      <ImageSlider images={sliderImages} className="w-full mb-0" />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <section className="py-8">
          <h2 className="text-3xl font-bold text-center mb-8">سوالات متداول</h2>
          <CustomAccordion items={faqs} defaultOpenIndex={0} />
        </section>

        <section className="py-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            ما افتخار می‌کنیم که میزبان جامعه‌ای از کاربران فعال و متخصص هستیم.
          </h2>
          <CustomerList />
        </section>
      </div>
    </main>
  );
}
