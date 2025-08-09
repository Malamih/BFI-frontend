import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Form = ({
  data,
}: {
  data: { headline: string; subheadline: string };
}) => {
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
      <form action="" method="post">
        <div className="group flex gap-4 justify-between max-lg:flex-col">
          <div className="input w-full grid gap-2">
            <Label>Full name</Label>
            <Input
              placeholder="Full Name"
              type="text"
              className="min-w-[240px] max-md:min-w-full"
            />
          </div>
          <div className="input w-full grid gap-2">
            <Label>Email</Label>
            <Input
              placeholder="hello@gmail.com"
              type="email"
              className="min-w-[240px] max-md:min-w-full"
            />
          </div>
        </div>
        <div className="input w-full grid gap-2 mt-5">
          <Label>How can we help you?</Label>
          <textarea
            placeholder="Describe your problem in at least 250 characters"
            className="py-3 px-4 bg-white border w-full rounded-xl resize-y h-[120px] min-h-[100px] max-h-[200px] focus-visible:border-primary/90 focus-visible:ring-primary/20 focus-visible:ring-[2px] placeholder:text-[#495057]/50  shadow-xs transition-[color,box-shadow] outline-none "
          ></textarea>
        </div>
        <div className="flex justify-center mt-6">
          <Button
            style={{
              background: "linear-gradient(135deg, #09C791 0%, #005E44 100%)",
            }}
            className="min-w-[100px] opacity-90 transition duration-150 hover:opacity-100"
          >
            Send
          </Button>
        </div>
      </form>
    </section>
  );
};
