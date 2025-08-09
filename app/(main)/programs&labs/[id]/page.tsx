import { Content } from "./Content";

export default function page({ params }: { params: { id: string } }) {
  return <Content id={params?.id} />;
}
