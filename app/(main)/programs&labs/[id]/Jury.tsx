import Container from "@/components/Container";
import { Member } from "./components/Member";
import { Juror } from "@/app/(admin)/dashboard/jurors/components/Juror";

export const Jury = ({ jury }: { jury?: Juror[] }) => {
  return (
    <section className="mb-20">
      <Container>
        <h3 className="text-5xl font-semibold leading-[89%] pb-4 border-b-4 border-b-primary w-fit mb-14">
          Jury
        </h3>
        <ul className="grid grid-cols-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-12">
          {jury?.map((juror) => {
            return <Member data={juror} key={juror?._id} />;
          })}
        </ul>
      </Container>
    </section>
  );
};
