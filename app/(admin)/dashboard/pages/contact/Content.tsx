"use client";
import { Accordion } from "@/components/ui/accordion";
import { useGetPages } from "@/services/page-content";
import { ContactPage } from "@/types/pages";
import { Form } from "./Form";

export const Content = () => {
  const { data, isFetching } = useGetPages({ name: "contact" });
  const page = data?.payload[0] as ContactPage;

  return (
    <section>
      <Accordion type="multiple" disabled={isFetching}>
        <Form sectionValue={page?.sections?.form} />
      </Accordion>
    </section>
  );
};
