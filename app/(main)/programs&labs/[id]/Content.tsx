"use client";
import { Partners } from "@/components/Partners";
import { Awards } from "./Awards";
import { Hero } from "./Hero";
import { Infos } from "./Infos";
import { Jury } from "./Jury";
import { useGetProgram } from "@/services/programs";
import Container from "@/components/Container";
import Image from "next/image";

export const Content = ({ id }: { id: string }) => {
  const { data } = useGetProgram(id);
  const page = data && data?.payload;
  return (
    <main>
      <Hero
        data={{
          headline: page?.headline,
          subheadline: page?.sub_headline,
          applying_link: page?.applying_link,
          contact_link: page?.contact_link,
          image: page?.background?.secure_url,
        }}
      />
      <Container className="p-0">
        <div
          className="mt-4 mb-6 font-medium text-lg"
          dangerouslySetInnerHTML={{ __html: page?.description as string }}
        ></div>
      </Container>
      <Infos
        data={{
          edition_target: page?.edition_target,
          awards: page?.main_awards,
          eligibility: page?.eligibility,
          selected_projects: page?.selected_projects,
          selection_process: page?.selection_process,
          timeline: page?.timeline,
        }}
        id={page?._id as string}
      />
      <Jury jury={page?.jury} />
      <Awards data={page?.awards_list} />
      <div className="mt-24 mb-12">
        <section>
          <Container>
            <ul className="grid-cols-6 gap-12 grid my-12 max-md:grid-cols-4 max-sm:grid-cols-2">
              {page?.partners.map((p, i: number) => {
                return (
                  <li key={i}>
                    <Image
                      src={p.logo?.secure_url}
                      width={130}
                      height={100}
                      alt="Partner"
                    />
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      </div>
    </main>
  );
};
