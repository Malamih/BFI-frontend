import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import SmoothScrolling from "@/providers/SmoothScrolling";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <SmoothScrolling>
        <Header />
        {children}
        <Footer />
      </SmoothScrolling>
    </>
  );
}
