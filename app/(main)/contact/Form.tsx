"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSendEmail } from "@/services/mail";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export const Form = ({
  data,
}: {
  data: { headline: string; subheadline: string };
}) => {
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isPending, setIsPending] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    // يتحقق من أن الرقم يحتوي فقط أرقام، ويمكن أن يبدأ بعلامة + (اختياري)
    return /^\+?\d+$/.test(phone);
  };

  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const form = new FormData(e.target as HTMLFormElement);
    const fullname = (form.get("fullname") ?? "").toString().trim();
    const email = (form.get("email") ?? "").toString().trim();
    const phone = (form.get("phone") ?? "").toString().trim();
    const message = (form.get("message") ?? "").toString().trim();

    const newErrors: { [key: string]: boolean } = {};
    if (!fullname) newErrors.fullname = true;
    if (!email || !validateEmail(email)) newErrors.email = true;
    if (!phone || !validatePhone(phone)) newErrors.phone = true;
    if (!message) newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsPending(true);

    await useSendEmail(fullname, email, message, phone)
      .then((res) => {
        if (res.success) {
          toast.success(
            res.message || "The message have been sent successfully."
          );
          router.push("/");
        } else {
          console.error(res);
          toast.error(res.message);
        }
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  const errorClasses = "border-red-500/50 focus:ring-red-500/20";

  return (
    <section className="bg-white/80 text-black shadow backdrop-blur-xs p-8 max-lg:p-4 h-fit rounded-2xl self-center">
      <div className="mb-8 max-lg:text-center">
        <h1 className="font-bold text-primary text-3xl mb-2">
          {data?.headline}
        </h1>
        <p className="font-normal text-sm text-[#67748E]">
          {data?.subheadline}
        </p>
      </div>
      <form onSubmit={submit} noValidate>
        <div className="group flex gap-4 justify-between max-lg:flex-col">
          <div className="input w-full grid gap-2">
            <Label>Full name</Label>
            <Input
              placeholder="Full Name"
              type="text"
              name="fullname"
              className={`min-w-[240px] max-md:min-w-full ${
                errors.fullname ? errorClasses : ""
              }`}
            />
          </div>

          <div className="input w-full grid gap-2">
            <Label>Email</Label>
            <Input
              placeholder="hello@gmail.com"
              type="email"
              name="email"
              className={`min-w-[240px] max-md:min-w-full ${
                errors.email ? errorClasses : ""
              }`}
            />
          </div>
        </div>

        {/* رقم الهاتف */}
        <div className="input w-full grid gap-2 mt-5">
          <Label>Phone Number</Label>
          <Input
            placeholder="+964 770 000 0000" // مثال لرقم عراقي مع رمز الدولة
            type="tel"
            name="phone"
            className={`${errors.phone ? errorClasses : ""}`}
            inputMode="numeric"
            pattern="[0-9+]*"
          />
        </div>

        <div className="input w-full grid gap-2 mt-5">
          <Label>How can we help you?</Label>
          <textarea
            name="message"
            placeholder="Describe your problem in at least 250 characters"
            className={`py-3 px-4 bg-white border w-full rounded-xl resize-y h-[120px] min-h-[100px] max-h-[200px] focus-visible:border-primary/90 focus-visible:ring-primary/20 focus-visible:ring-[2px] placeholder:text-[#495057]/50 shadow-xs transition-[color,box-shadow] outline-none ${
              errors.message ? errorClasses : ""
            }`}
          />
        </div>

        <div className="flex justify-center mt-6">
          <Button
            style={{
              background: "linear-gradient(135deg, #09C791 0%, #005E44 100%)",
            }}
            disabled={isPending}
            className="min-w-[100px] opacity-90 transition duration-150 hover:opacity-100"
          >
            {isPending ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </section>
  );
};
