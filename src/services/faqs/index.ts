import FAQ from "@/entities/FAQ";
import { notFound } from "next/navigation";
import { FetchResponse } from "../api-client";

async function getFAQs(): Promise<FAQ[]> {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not defined.");
  }

  const res = await fetch(
    `${BASE_URL}/api/faqs?populate=*&filters[faqType][slug][$eq]=support`,
    {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    }
  );

  if (!res.ok) {
    return notFound();
  }

  const data: FetchResponse<FAQ> = await res.json();

  return data.data.map((item) => ({
    id: item.id,
    question: item.question,
    answer: item.answer,
  }));
}

export default getFAQs;
