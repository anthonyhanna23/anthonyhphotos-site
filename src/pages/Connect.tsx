import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import portrait from "@/assets/Photos of Me/DSC00052136.webp";

const Connect = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      toast({ title: "Message sent", description: "Thank you! I'll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast({ title: "Something went wrong", description: "Please try emailing me directly.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

      {/* Left — bio + form */}
      <div className="px-6 md:px-12 pt-10 pb-16 md:py-24 flex flex-col md:justify-center">
        <h1 className="font-serif text-5xl md:text-6xl tracking-tight animate-fade-up">
          Connect
        </h1>

        <div className="mt-10 space-y-4 animate-fade-up-delay">
          <h2 className="font-serif text-xl tracking-tight">
            Capturing moments that matter.
          </h2>
          <p className="font-sans text-sm leading-relaxed text-muted-foreground">
            I'm Anthony Hanna, an Ohio State student & photographer based in Columbus, Ohio. My work spans
            concert and event photography, street photography, and portraits. Most recently, I've been working for OSU athletics, capturing the intensity of collegiate sports. I love capturing anything that inspires me.
          </p>
          <p className="font-sans text-sm leading-relaxed text-muted-foreground">
            Currently available for bookings, collaborations, and editorial commissions.
          </p>
        </div>

        <div className="border-t border-border my-8" />

        <div className="animate-fade-up-delay-2">
          <p className="font-sans text-sm text-muted-foreground mb-8">
            Reach out below or email directly at{" "}
            <a href="mailto:anthonyhphotos@gmail.com" className="text-foreground editorial-link">
              anthonyhphotos@gmail.com
            </a>
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground">Name</label>
                <input id="name" name="name" type="text" required maxLength={100} value={form.name} onChange={handleChange}
                  className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground transition-colors duration-300" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground">Email</label>
                <input id="email" name="email" type="email" required maxLength={255} value={form.email} onChange={handleChange}
                  className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground transition-colors duration-300" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground">Subject</label>
              <input id="subject" name="subject" type="text" required maxLength={200} value={form.subject} onChange={handleChange}
                className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground transition-colors duration-300" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground">Message</label>
              <textarea id="message" name="message" required maxLength={1000} rows={2} value={form.message} onChange={handleChange}
                className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground transition-colors duration-300 resize-none" />
            </div>
            <button type="submit"
              className="font-sans text-xs tracking-[0.2em] uppercase py-4 px-10 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-500">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Right — portrait, sticky full-height */}
      <div className="h-80 sm:h-96 lg:sticky lg:top-0 lg:h-screen">
        <img
          src={portrait}
          alt="Anthony Hanna photographer Columbus Ohio"
          className="w-full h-full object-cover object-[50%_60%]"
        />
      </div>

    </div>
  );
};

export default Connect;
