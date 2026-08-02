import { useState } from "react";
import { Loader2 } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbdnegwo";

type FormState = "idle" | "submitting" | "success" | "error";

export interface EnquiryFormProps {
  /** Value sent to Formspree as `enquiry_type` so submissions can be triaged. */
  enquiryType: string;
  /** Label on the button that reveals the form. */
  triggerLabel: string;
  /** Heading shown above the fields once open. */
  heading: string;
  /** Placeholder for the free-text context field. */
  messagePlaceholder?: string;
  /** Visual weight of the trigger button. */
  variant?: "solid" | "outline";
  className?: string;
}

export function EnquiryForm({
  enquiryType,
  triggerLabel,
  heading,
  messagePlaceholder = "Tell me about the team, the timing, and the outcome you need.",
  variant = "solid",
  className = "",
}: EnquiryFormProps) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<FormState>("idle");

  const triggerClass =
    variant === "outline"
      ? "inline-block border border-navy/25 px-8 py-4 text-xs font-bold uppercase tracking-widest text-navy transition-colors duration-200 hover:border-navy"
      : "inline-block bg-navy px-8 py-4 text-xs font-bold uppercase tracking-widest text-paper transition-colors duration-200 hover:bg-gold hover:text-navy";

  if (!open) {
    return (
      <button type="button" className={`${triggerClass} ${className}`} onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>
    );
  }

  if (state === "success") {
    return (
      <div className={`max-w-2xl border border-navy/15 bg-white p-8 ${className}`}>
        <h3 className="font-serif text-2xl text-navy">Enquiry received.</h3>
        <p className="mt-3 text-sm text-navy/70">
          Thank you — I reply personally, usually within 48 hours.
        </p>
      </div>
    );
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setState("submitting");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      setState(response.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`max-w-2xl space-y-5 border border-navy/15 bg-white p-8 ${className}`}
    >
      <h3 className="font-serif text-2xl text-navy">{heading}</h3>
      <input type="hidden" name="enquiry_type" value={enquiryType} />
      <EnquiryField label="Name" name="name" required />
      <EnquiryField label="Organisation" name="org" />
      <EnquiryField label="Email" name="email" type="email" required />
      <div>
        <label
          htmlFor={`enquiry-message-${enquiryType}`}
          className="block text-[10px] font-medium uppercase tracking-widest text-navy/70"
        >
          Context <span className="text-gold">*</span>
        </label>
        <textarea
          id={`enquiry-message-${enquiryType}`}
          name="message"
          required
          rows={4}
          placeholder={messagePlaceholder}
          className="mt-2 w-full border border-navy/20 bg-white px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-gold"
        />
      </div>
      {state === "error" && (
        <p className="text-sm text-destructive">
          That didn&apos;t send. Please try again, or email zeeshan@global-mkts.com directly.
        </p>
      )}
      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 bg-navy py-4 text-xs font-bold uppercase tracking-widest text-paper transition-colors duration-200 hover:bg-gold hover:text-navy disabled:cursor-not-allowed disabled:bg-gold disabled:text-navy"
      >
        {state === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {state === "submitting" ? "Sending" : "Send enquiry"}
      </button>
    </form>
  );
}

function EnquiryField({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = `enquiry-${name}-${label}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-medium uppercase tracking-widest text-navy/70"
      >
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        className="mt-2 w-full border border-navy/20 bg-white px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-gold"
      />
    </div>
  );
}
