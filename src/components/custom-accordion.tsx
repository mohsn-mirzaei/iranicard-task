import FAQ from "@/entities/FAQ";
import { ChevronDown } from "lucide-react";
import type React from "react";

interface AccordionItemProps extends FAQ {
  defaultOpen?: boolean;
}

export function AccordionItem({
  question,
  answer,
  defaultOpen = false,
}: AccordionItemProps) {
  return (
    <details
      className="group border rounded-lg overflow-hidden mb-4 bg-white shadow-sm"
      open={defaultOpen}
    >
      <summary className="flex items-center justify-between p-4 cursor-pointer list-none font-medium text-lg hover:bg-gray-50 transition-colors">
        {question}
        <ChevronDown className="w-5 h-5 transition-transform duration-300 group-open:rotate-180 rtl:group-open:-rotate-180" />
      </summary>
      <div className="p-4 pt-0 border-t">
        <p className="text-gray-700 mt-2">{answer}</p>
      </div>
    </details>
  );
}

export function CustomAccordion({
  items,
  defaultOpenIndex,
}: {
  items: AccordionItemProps[];
  defaultOpenIndex?: number;
}) {
  return (
    <div className="w-full space-y-2">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          question={item.question}
          answer={item.answer}
          defaultOpen={index === defaultOpenIndex}
        />
      ))}
    </div>
  );
}
