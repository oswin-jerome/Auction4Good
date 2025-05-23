import { getAuctionByUUID } from "@/actions/auction";
import { getBidsByAuctionId } from "@/actions/bid";
import hero from "@/assets/hero.jpg";
import { formatDate } from "@/lib/utils";
import { Avatar, Badge, Card, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { redirect } from "next/navigation";
import CreateForm from "./createForm";

const getAuction = async (uuid: string) => {
  const auction = await getAuctionByUUID(uuid);
  if (auction == null) {
    return redirect("/404");
  }
  return auction;
};

export default async function AuctionDetailsPage({ params }: any) {
  const auction = await getAuction(params.uuid);
  const bids = await getBidsByAuctionId(auction.id, 3);
  return (
    <div className="container">
      <div className="grid md:grid-cols-[500px,auto] gap-8">
        <Image
          alt="auction image"
          src={hero}
          className="aspect-square object-cover rounded-3xl md:max-w-[500px]"
        />
        <div>
          <Heading size="6"> {auction.title} </Heading>
          <Text>{auction.description}</Text>
          <div className="mt-2">
            <Text>
              Bid starts at{" "}
              <span className="font-bold">
                Rs.{auction.starting_bid_price.toString()}
              </span>
            </Text>
          </div>
          <div className="mt-4 space-x-2 flex items-center">
            <Badge size={"3"} color="grass">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              {formatDate(auction.start_date)}
            </Badge>
            <span>-</span>
            <Badge size={"3"} color="tomato">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              {formatDate(auction.end_date)}
            </Badge>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <Heading size="5">Top Bids</Heading>
              <CreateForm
                minBid={auction.starting_bid_price}
                topBid={Number(bids[0]?.amount) ?? auction.starting_bid_price}
                auctionId={auction.id}
                auction={auction}
              />
            </div>
            <div className="mt-4 grid gap-4">
              {bids.map((bid) => {
                return (
                  <Card
                    key={bid.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar
                        fallback
                        src={
                          "https://ui-avatars.com/api/?background=random&name=" +
                          bid.user.first_name
                        }
                      />
                      <div>
                        <Text weight={"bold"}>
                          {bid.user.first_name} {bid.user.last_name}
                        </Text>
                      </div>
                    </div>
                    <div>
                      <Heading>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "INR",
                        }).format(bid.amount)}
                      </Heading>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
