import Container from "@/components/Container";
import { Info } from "./components/Info";
import { Project } from "@/types/projects";
import Link from "next/link";

export const Infos = ({
  data,
  id,
}: {
  data: {
    edition_target?: string;
    timeline?: string;
    eligibility?: string;
    awards?: string;
    selection_process?: string;
    selected_projects?: Project[];
  };
  id: string;
}) => {
  return (
    <section className="my-20">
      <Container className="grid grid-cols-3 max-2xl:grid-cols-2 max-lg:grid-cols-1">
        <Info
          title="Edition Targeters"
          content={data?.edition_target as string}
        />
        <Info title="Timeline" content={data?.timeline as string} />
        <Info title="Eligibility" content={data?.eligibility as string} />
        <Info title="Awards" content={data?.awards as string} />
        <Info
          title="Selection Process"
          content={data?.selection_process as string}
        />
        <div className="info [&_ul]:[list-style:unset] [&_ul]:ms-4 w-full p-8 border-b border-b-[#D7D7D7] border-r border-r[#D7D7D7] max-lg:w-full [&_p]:w-full [&_p]:max-w-xl">
          <h2 className="font-semibold text-2xl pb-2 border-b-4 border-b-primary w-fit mb-10">
            Selected Projects
          </h2>
          <ul className="list-disc">
            {data?.selected_projects?.map((project) => {
              return (
                <li key={project?._id}>
                  <Link
                    className="hover:underline"
                    href={`/programs&labs/${id}/projects/${project?._id}`}
                  >
                    <span>{project?.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
};
