"use client";
import { Textarea } from "@/src/components/ui/textarea";
import { FC } from "react";

type Prop = {
  additionalRequirementInput: (value: string) => void;
};

const AdditionalReq: FC<Prop> = ({ additionalRequirementInput }) => {
  return (
    <div className="mt-5">
      <label className="text-slate-400 mb-2 block">
        Enter Additional Requirements (Optional)
      </label>
      <Textarea onChange={(e) => additionalRequirementInput(e.target.value)} />
    </div>
  );
};

export default AdditionalReq;
