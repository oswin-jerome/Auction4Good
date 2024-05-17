import { Heading, Text } from "@radix-ui/themes";
import logo from "@/assets/logo.svg";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="container space-y-10">
      <section>
        <Image height={80} className="mx-auto mt-8" alt="logo" src={logo} />
      </section>
      <section>
        <Heading>Welcome to Auction 4 Good</Heading>
        <Text className="mt-2 block">
          At Auction 4 Good, we believe in the power of giving back while indulging in the thrill of bidding. Our online auction platform provides a unique space where generosity meets excitement, offering a wide array of items and experiences for auction, all while supporting charitable causes
          close to our hearts.
        </Text>
      </section>
      <section>
        <Heading>Our Mission</Heading>
        <Text className="mt-2 block">
          Auction 4 Good is not just about acquiring items; it's about making a difference. Our mission is to facilitate meaningful connections between donors, bidders, and the causes they care about. Through our platform, we aim to empower individuals and organizations to contribute to positive
          change in the world, one bid at a time.
        </Text>
      </section>
      <section>
        <Heading>Get Involved</Heading>
        <Text className="mt-2 block">Whether you're a donor, a bidder, or simply someone who believes in the power of doing good, there's a place for you at Auction 4 Good. Explore our auctions, place your bids, and together, let's make a positive impact on the world.</Text>
        <div>
          <Text className="mt-4 block">Join us at Auction 4 Good – where every bid counts, and every action makes a difference.</Text>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
