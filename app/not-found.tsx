import Container from "@/components/Container";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Notfound() {
  return (
    <>
      <Header />
      <Container>
        <div className="not-found w-full h-[calc(100vh-var(--header-height))] flex justify-start items-center gap-4 flex-col pt-44">
          <div className="title text-center">
            <h1 className="text-9xl mb-4">404</h1>
            <p className="text-xl">
              Sorry, the page you are looking for was not found.
            </p>
          </div>
          <Link href={"/"}>
            <Button>Back To Home</Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
