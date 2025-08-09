import { Trophy } from "lucide-react";

export const Award = ({ value }: { value: string }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="translate-y-1.5">
        <Trophy />
      </div>
      <p className="font-semibold text-xl leading-[140%]">{value}</p>
    </div>
  );
};
