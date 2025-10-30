import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className=" max-w-screen  ">
        <div className="">{children}</div>
      </div>
      <Footer />
    </>
  );
}
