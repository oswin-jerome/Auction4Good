import Image from "next/image";
import hero from "@/assets/hero.jpg";
import { Button } from "@radix-ui/themes";
import { registerUser } from "@/actions/user";
export default function Home() {
  return (
    <div className="container relative py-4 pt-28">
      <h1 className="font-bold font-serif text-6xl text-center">Auctions for a cause</h1>
      <p className="text-center mt-4 text-zinc-500 max-w-[700px] mx-auto">
        Experience the thrill of giving while making a lasting impact on the causes you care about. Join us on our mission to transform generosity into tangible change, one bid at a time. Together, let's amplify compassion, empower communities, and create a brighter future for all."
      </p>

      <div className="flex justify-center mt-8">
        <Button size="4" variant="outline" className="cursor-pointer">
          Get Started
        </Button>
      </div>

      <Image alt="Hero Image" src={hero} quality={100} className="w-[90vw] lg:w-[70vw] mx-auto rounded-xl mt-16 lg:mt-24 border-4 shadow-2xl border-white aspect-[4/3] lg:aspect-[4/2] object-cover" />
    </div>
  );
}
