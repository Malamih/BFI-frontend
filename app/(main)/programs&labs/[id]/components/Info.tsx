import React from "react";

interface Props {
  title: string;
  content: string;
}

export const Info = ({ content, title }: Props) => {
  return (
    <div className="info [&_ul]:[list-style:unset] [&_ul]:ms-4 w-full p-8 border-b border-b-[#D7D7D7] border-r border-r[#D7D7D7] max-lg:w-full [&_p]:w-full [&_p]:max-w-xl">
      <h2 className="font-semibold text-2xl pb-2 border-b-4 border-b-primary w-fit mb-10">
        {title}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};
