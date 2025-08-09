import React from "react";
import { Projects } from "./Projects";

export default function ProjectsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string; projectId: string };
}) {
  return (
    <main className="bg-black text-white">
      {children}
      <Projects id={params.id} projectId={params?.projectId} />
    </main>
  );
}
