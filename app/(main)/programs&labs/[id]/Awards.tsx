import Container from "@/components/Container";
import { Award } from "./components/Award";

export const Awards = ({ data }: { data?: string[] }) => {
  return (
    <section>
      <Container>
        <h4 className="text-5xl font-semibold leading-[89%] pb-4 border-b-4 border-b-primary w-fit mb-14">
          Awards
        </h4>
        <ul className="flex flex-col gap-8">
          {data?.map((award, i: number) => {
            return (
              <li key={i}>
                <Award value={award}/>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
};
