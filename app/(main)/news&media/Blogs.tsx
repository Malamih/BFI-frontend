import Container from "@/components/Container";
import { Blog } from "./components/Blog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetBlogs } from "@/services/blogs";

export const Blogs = () => {
  const { data } = useGetBlogs({ query: { limit: 3 } });
  return (
    <section className="my-8">
      <Container className="flex flex-col items-center">
        <div
          className="mb-12 grid justify-between gap-8 max-xl:!grid-cols-2 max-lg:!grid-cols-1"
          style={{ gridTemplateColumns: "2fr 1fr 1fr" }}
        >
          {data?.payload.map((blog, i: number) => {
            return <Blog key={i} blogData={blog} showBody={i == 0} />;
          })}
        </div>
        <Link href={"/news&media/blogs"}>
          <Button size={"lg"}>View All Blogs</Button>
        </Link>
      </Container>
    </section>
  );
};
