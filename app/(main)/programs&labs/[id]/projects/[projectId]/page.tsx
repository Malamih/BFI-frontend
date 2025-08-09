import { Content } from "./Content";

export default function Page({
  params,
}: {
  params: { id: string; projectId: string };
}) {
  return (
    <main>
      <Content projectId={params?.projectId} />
    </main>
  );
}
