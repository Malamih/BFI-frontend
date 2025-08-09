"use client";
import Container from "@/components/Container";
import { useGetProgram } from "@/services/programs";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export const Projects = ({
  id,
  projectId,
}: {
  id: string;
  projectId: string;
}) => {
  const { data } = useGetProgram(id);
  return (
    <section className="py-16">
      <Container>
        <h1 className="font-semibold text-3xl mb-8">Selected Projects</h1>
        <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {data?.payload?.projects?.map((project) => {
            return (
              <li key={project._id}>
                <Link
                  href={`/programs&labs/${id}/projects/${project?._id}`}
                  className={clsx(
                    "inline-block px-3 py-4 rounded-sm transition w-full border-gray-500/40 border",
                    {
                      "bg-gray-500/20": project._id == projectId,
                    }
                  )}
                >
                  <Image
                    width={1000}
                    height={1000}
                    src={project?.cover_image?.secure_url}
                    alt="image"
                    className="w-full h-[300px] mb-3 border border-gray-500/50 rounded-2xl object-cover"
                  />
                  <h2 className="font-semibold text-lg">{project?.title}</h2>
                  <p className="font-medium text-sm mb-2">
                    {project?.type} / {project?.location}
                  </p>
                  <p className="text-sm font-medium mb-3">{project?.credits}</p>
                  <p
                    className="font-medium text-sm"
                    dangerouslySetInnerHTML={{ __html: project?.description }}
                  ></p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
};
