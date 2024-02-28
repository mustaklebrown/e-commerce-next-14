import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Hero />
      <Products />
    </div>
  );
}
