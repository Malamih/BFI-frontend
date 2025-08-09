import { Content } from "./Content";

export default function page({ params }: { params: { id: string } }) {
  return (
    <main>
      <Content id={params.id} />
    </main>
  );
}
