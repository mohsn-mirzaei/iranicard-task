import { ChevronDown } from "lucide-react";
import type React from "react";

type AccordionItemProps = {
  title: string;
  description: string;
  defaultOpen?: boolean;
};

export function AccordionItem({
  title,
  description,
  defaultOpen = false,
}: AccordionItemProps) {
  return (
    <details
      className="group border rounded-lg overflow-hidden mb-4 bg-white shadow-sm"
      open={defaultOpen}
    >
      <summary className="flex items-center justify-between p-4 cursor-pointer list-none font-medium text-lg hover:bg-gray-50 transition-colors">
        {title}
        <ChevronDown className="w-5 h-5 transition-transform duration-300 group-open:rotate-180 rtl:group-open:-rotate-180" />
      </summary>
      <div className="p-4 pt-0 border-t">
        <p className="text-gray-700 mt-2">{description}</p>
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
          key={item.title}
          title={item.title}
          description={item.description}
          defaultOpen={index === defaultOpenIndex}
        />
      ))}
    </div>
  );
}
