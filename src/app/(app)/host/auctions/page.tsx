import { getMyAuctions } from "@/actions/auction";
import { HOST_AUCTION_CREATE } from "@/app/routes";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Table } from "@radix-ui/themes";
import moment from "moment";
import Link from "next/link";
export default async function AuctionsPage() {
  const auctions = await getMyAuctions();

  return (
    <div className="">
      <div className="mb-8 flex justify-end">
        <Link href={HOST_AUCTION_CREATE}>
          <Button className="cursor-pointer">
            <PlusIcon /> New Auction
          </Button>
        </Link>
      </div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Start Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>End Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Starting Bid Price</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {auctions?.map((auction, i) => (
            <Table.Row key={i}>
              <Table.RowHeaderCell className="font-bold">{auction.title}</Table.RowHeaderCell>
              <Table.Cell>{moment(auction.start_date).format("Do MMM Y")}</Table.Cell>
              <Table.Cell>{moment(auction.end_date).format("Do MMM Y")}</Table.Cell>
              <Table.Cell>Rs. {auction.starting_bid_price.toString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
