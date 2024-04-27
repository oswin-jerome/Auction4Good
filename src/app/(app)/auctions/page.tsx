import { Button } from "@/components/ui/button";
import { Callout, Card, Checkbox, Flex, Slider, Text, Button as RButton } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import hero from "@/assets/hero.jpg";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
export default function Auctions() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="container relative grid md:grid-cols-[250px,1fr] gap-4 ">
      <aside className="hidden md:block p-4 rounded border h-[80dvh]">
        <h3>Categories</h3>
        <div className="mt-4 grid gap-2">
          <Text as="label" size="2">
            <Flex gap="2">
              <Checkbox defaultChecked />
              Products
            </Flex>
          </Text>
          <Text as="label" size="2">
            <Flex gap="2">
              <Checkbox defaultChecked />
              Experiences
            </Flex>
          </Text>
        </div>
        <h3 className="mt-4 mb-2">Starting Bid </h3>
        <Slider defaultValue={[25, 75]} />
      </aside>

      <div>
        <Callout.Root className="mb-4 flex items-center justify-between">
          <div className="flex  items-center gap-2">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>Host your auction</Callout.Text>
          </div>
          <Link href={"/host/auctions/create"}>
            {" "}
            <RButton variant="soft" className="cursor-pointer">
              Create Auction
            </RButton>
          </Link>
        </Callout.Root>
        <section className="grid md:grid-cols-3 grid-rows-2 gap-4">
          {items.map((item, i) => {
            return (
              <Card key={i}>
                <Image src={hero} alt="" className="rounded mb-2" />
                <div>
                  <h4 className="font-bold">Product Name</h4>
                  <p className="text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab, commodi.</p>
                  <div className="mt-8 flex justify-between items-center">
                    <h5 className="font-bold text-lg">Rs. 500</h5>
                    <Button className="px-4 flex gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-5 h-5">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                        />
                      </svg>
                      <span>Bid</span>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </section>
      </div>
    </div>
  );
}
