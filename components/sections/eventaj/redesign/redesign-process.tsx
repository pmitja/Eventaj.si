import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { processSteps } from "@/content/eventaj/data";
import { ArrowRight, FileCheck2, PartyPopper, Send } from "lucide-react";

const icons = [Send, FileCheck2, PartyPopper] as const;

export function RedesignProcess() {
  return (
    <section aria-labelledby="ev-process-title" className="ev-dark ev-wine-bg py-24 md:py-36">
      <div className="ev-wrap">
        <h2 id="ev-process-title" className="ev-display ev-h2 max-w-[18ch]">
          Trije preprosti koraki do <em>nepozabnega dogodka</em>
        </h2>

        <ol className="mt-16 grid border-t ev-rule md:mt-20 md:grid-cols-3">
          {processSteps.map((step, index) => {
            const Icon = icons[index] ?? Send;
            return (
            <li
              key={step.n}
              className="border-b ev-rule py-10 md:border-b-0 md:py-12 md:pr-10 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-10"
            >
              <span className="ev-icon" aria-hidden="true">
                <Icon strokeWidth={1.5} className="h-5 w-5" />
              </span>
              <h3 className="ev-display mt-10 text-[27px] leading-tight">{step.title}</h3>
              <p className="mt-4 max-w-[38ch] text-[16px] leading-relaxed text-[var(--ev-mist)]">{step.desc}</p>
              {index === 0 && (
                <InquiryTrigger className="ev-btn ev-btn-primary mt-8">
                  Pošlji povpraševanje
                  <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
                </InquiryTrigger>
              )}
            </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
