"use client";
import { Button } from "@/components/ui/button";
import { Layer } from "@/components/ui/Layer";
import { useDeleteJuror } from "@/services/jurors";
import { useGetProgram } from "@/services/programs";
import { Project } from "@/types/projects";
import { TrashIcon, Trophy } from "lucide-react";
import Image from "next/image";

export const Content = ({ id }: { id: string }) => {
  const { data, isFetching } = useGetProgram(id);

  return (
    data && (
      <section>
        <div className="image relative mb-4">
          <Layer
            variant={"dark"}
            className="opacity-70"
            style={{
              background: "linear-gradient(45deg, black, transparent)",
            }}
          />
          <Image
            src={data?.payload?.background?.secure_url}
            width={100000}
            height={100000}
            alt={data?.payload?.name}
            className="w-full max-h-[400px] rounded-lg object-cover"
          />
          <div className="content absolute bottom-4 left-4">
            <h1 className="text-3xl font-bold">{data?.payload?.name}</h1>
            <p className="mt-1 text-base">{data?.payload?.sub_headline}</p>
          </div>
        </div>
        <div className="links flex gap-4 mt-4 mb-4">
          {data?.payload?.applying_link && (
            <div>
              <span>
                Applying Link:{" "}
                <span className="px-3 py-1 bg-gray-500/20 rounded-sm">
                  {data?.payload?.applying_link}
                </span>
              </span>
            </div>
          )}
          {data?.payload?.contact_link && (
            <div>
              <span>
                Contact Link:{" "}
                <span className="px-3 py-1 bg-gray-500/20 rounded-sm">
                  {data?.payload?.contact_link}
                </span>
              </span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-4">
          {data?.payload?.edition_target && (
            <div className="[&_ul]:[list-style:unset] [&_ul]:ms-4 p-3 border border-gray-500/50 rounded-sm:ms-5 rounded-sm">
              <h1 className="text-lg font-semibold mb-2">Edition:</h1>
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: data?.payload?.edition_target,
                }}
              ></div>
            </div>
          )}
          {data?.payload?.timeline && (
            <div className="[&_ul]:[list-style:unset] [&_ul]:ms-4 p-3 border border-gray-500/50 rounded-sm:ms-5 rounded-sm">
              <h1 className="text-lg font-semibold mb-2">Timeline:</h1>
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: data?.payload?.timeline,
                }}
              ></div>
            </div>
          )}
          {data?.payload?.eligibility && (
            <div className="[&_ul]:[list-style:unset] [&_ul]:ms-4 p-3 border border-gray-500/50 rounded-sm:ms-5 rounded-sm">
              <h1 className="text-lg font-semibold mb-2">Eligibility:</h1>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: data?.payload?.eligibility }}
              ></div>
            </div>
          )}
          {data?.payload?.main_awards && (
            <div className="[&_ul]:[list-style:unset] [&_ul]:ms-4 p-3 border border-gray-500/50 rounded-sm:ms-5 rounded-sm">
              <h1 className="font-bold mb-2 text-lg">Awards:</h1>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: data?.payload?.main_awards }}
              ></div>
            </div>
          )}
          {data?.payload?.selection_process && (
            <div className="[&_ul]:[list-style:unset] [&_ul]:ms-4 p-3 border border-gray-500/50 rounded-sm:ms-5 rounded-sm">
              <h1 className="text-lg font-semibold mb-2">Selection Process:</h1>
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: data?.payload?.selection_process,
                }}
              ></div>
            </div>
          )}
          {data?.payload?.selected_projects && (
            <div className="[&_ul]:[list-style:unset] [&_ul]:ms-4 p-3 border border-gray-500/50 rounded-sm:ms-5 rounded-sm">
              <h1 className="text-lg font-semibold mb-2">Selected Projects:</h1>
              <ul>
                {data?.payload?.selected_projects?.map(
                  (project: Project, i) => {
                    return <li key={i}>{project?.title}</li>;
                  }
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="projects-and-jurors flex flex-wrap gap-12 w-full mt-12">
          <ul className="projects h-fit custom-scroll-area max-h-[400px] flex flex-col gap-4 flex-[1] w-full min-w-xl">
            <h1 className="text-lg font-semibold">Projects List: </h1>
            {data?.payload?.projects?.map((project, i: number) => {
              return (
                <li
                  key={i}
                  className="flex gap-2 justify-between border-b border-b-gray-500/50 pb-2"
                >
                  <div className="image flex gap-2">
                    <Image
                      src={project?.cover_image?.secure_url}
                      width={10000}
                      height={10000}
                      alt={project?.title}
                      className="w-[60px] h-[60px] object-cover rounded-sm"
                    />
                    <h1 className="font-medium">{project.title}</h1>
                  </div>
                  {/* <div className="actions">
                    <Button variant={"ghost"} size={"sm"}>
                      <TrashIcon />
                    </Button>
                  </div> */}
                </li>
              );
            })}
            {data?.payload?.projects.length < 1 && (
              <li className="flex items-center pb-2 justify-center w-full gap-4 border-b border-b-gray-500/50">
                <h1>No Projects Found</h1>
              </li>
            )}
          </ul>
          <ul className="jurors custom-scroll-area max-h-[400px] flex flex-col gap-4 flex-[1] w-full min-w-xl">
            <h1 className="text-lg font-semibold">Jurors List: </h1>
            {data?.payload?.jury?.map((juror, i: number) => {
              return (
                <li
                  key={i}
                  className="flex gap-2 justify-between border-b border-b-gray-500/50 pb-2"
                >
                  <div className="image flex gap-2">
                    <Image
                      src={juror?.image?.secure_url}
                      width={1000}
                      height={1000}
                      alt={juror?.name}
                      className="w-[60px] h-[60px] object-cover rounded-sm"
                    />
                    <div>
                      <h1 className="font-medium">{juror.name}</h1>
                      <p className="font-normal text-sm">{juror.company}</p>
                    </div>
                  </div>
                  {/* <div className="actions">
                    <Button variant={"ghost"} size={"sm"}>
                      <TrashIcon />
                    </Button>
                  </div> */}
                </li>
              );
            })}
            {data?.payload?.jury.length < 1 && (
              <li className="flex items-center pb-2 justify-center w-full gap-4 border-b border-b-gray-500/50">
                <h1>No Jurors Found</h1>
              </li>
            )}
          </ul>
        </div>
        <div className="flex flex-wrap gap-12 w-full mt-12">
          <div className="partners w-full flex-[1] min-w-2xl custom-scroll-area max-h-[400px]">
            <h1 className="text-lg font-semibold mb-2">Partners List:</h1>
            <ul className="flex flex-wrap gap-4">
              {data?.payload?.partners?.map((partner, i: number) => {
                return (
                  <li key={i}>
                    <Image
                      src={partner?.logo?.secure_url}
                      alt={partner.name}
                      width={1000}
                      height={1000}
                      className="w-[140px] h-auto bg-white rounded-sm px-2 py-1"
                    />
                  </li>
                );
              })}
              {data?.payload?.partners.length < 1 && (
                <li className="flex items-center pb-2 justify-center w-full gap-4 border-b border-b-gray-500/50">
                  <h1>No Partners Found</h1>
                </li>
              )}
            </ul>
          </div>
          <div className="awards w-full flex-[1] min-w-2xl custom-scroll-area max-h-[400px]">
            <h1 className="text-lg font-semibold mb-2">Awards List:</h1>
            <ul className="flex flex-col gap-2">
              {data?.payload?.awards_list?.map((award, i: number) => {
                return (
                  <li
                    key={i}
                    className="flex items-center pb-2 justify-between w-full gap-4 border-b border-b-gray-500/50"
                  >
                    <div className="flex items-center gap-2">
                      <Trophy width={18} className="text-gray-300 min-w-5" />
                      <span>{award}</span>
                    </div>
                    {/* <div className="opts">
                      <Button variant={"ghost"}>
                        <TrashIcon />
                      </Button>
                    </div> */}
                  </li>
                );
              })}
              {data?.payload?.awards_list.length < 1 && (
                <li className="flex items-center pb-2 justify-center w-full gap-4 border-b border-b-gray-500/50">
                  <h1>No Awards Found</h1>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>
    )
  );
};
