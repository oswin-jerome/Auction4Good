"use client";
import { AUCTIONS } from "@/app/routes";
import { Checkbox, Flex, Select, Slider, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function SideBar() {
  const router = useRouter();
  const search = useSearchParams();

  const [isUpcoming, setIsUpcoming] = useState(
    search.get("upcoming") === "true" || !search.has("upcoming")
  );
  const [isActive, setIsActive] = useState(
    search.get("active") === "true" || !search.has("active")
  );
  const [isClosed, setIsClosed] = useState(
    search.get("closed") === "true" || !search.has("closed")
  );
  const [isCompleted, setIsCompleted] = useState(
    search.get("completed") === "true" || !search.has("completed")
  );
  const [price, setPrice] = useState([
    parseInt(search.get("min") ?? "0") / 20,
    parseInt(search.get("max") ?? "2000") / 20,
  ]);

  const buildSearch = () => {
    var search = "?";
    search += `min=${price[0] * 20}&max=${price[1] * 20}`;
    search += `&`;
    search += `active=${isActive}`;
    search += `&`;
    search += `closed=${isClosed}`;
    search += `&`;
    search += `upcoming=${isUpcoming}`;
    search += `&`;
    search += `completed=${isCompleted}`;

    return search;
  };

  useEffect(() => {
    router.push(AUCTIONS + buildSearch());
  }, [isActive, price, isClosed, isUpcoming, isCompleted]);

  return (
    <>
      <aside className="hidden md:block p-4 rounded border h-[80dvh]">
        <h3>Status</h3>
        <div className="mt-4 grid gap-2">
          <Text as="label" size="2">
            <Flex gap="2">
              <Checkbox
                checked={isUpcoming}
                onClick={(e) => {
                  setIsUpcoming((prev) => {
                    return !prev;
                  });
                }}
              />
              Upcoming
            </Flex>
          </Text>
          <Text as="label" size="2">
            <Flex gap="2">
              <Checkbox
                checked={isActive}
                onClick={(e) => {
                  setIsActive((prev) => {
                    return !prev;
                  });
                }}
              />
              Active
            </Flex>
          </Text>
          <Text as="label" size="2">
            <Flex gap="2">
              <Checkbox
                checked={isClosed}
                onClick={(e) => {
                  setIsClosed((prev) => {
                    return !prev;
                  });
                }}
              />
              Closed
            </Flex>
          </Text>
          <Text as="label" size="2">
            <Flex gap="2">
              <Checkbox
                checked={isCompleted}
                onClick={(e) => {
                  setIsCompleted((prev) => {
                    return !prev;
                  });
                }}
              />
              Completed
            </Flex>
          </Text>
        </div>
        <h3 className="mt-4 mb-2">Starting Bid </h3>
        <Slider
          defaultValue={[...price]}
          onValueCommit={(v) => {
            console.log(v);
            setPrice(v);
          }}
        />
        <div className="text-sm flex justify-between mt-2">
          <span>{price[0] * 20}</span>
          <span>{price[1] * 20}</span>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
