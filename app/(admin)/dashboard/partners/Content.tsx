"use client";

import { Input } from "@/components/ui/dashboard/Input";
import { CreateButton } from "./components/CreateButton";
import { useGetPartners } from "@/services/partners";
import { useEffect, useState } from "react";
import { Partner } from "./components/Partner";

export const Content = () => {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [page, setPage] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setName(search);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);
  const { data, isFetching } = useGetPartners({
    query: { search: name, page },
  });
  return (
    <section>
      <div className="flex justify-between gap-12">
        <div className="w-full max-w-xl">
          <Input
            placeholder="Search by partner name."
            type="text"
            className="h-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="options">
          <CreateButton />
        </div>
      </div>

      <ul className="partners mt-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {(!isFetching || (data?.payload?.length ?? 0) > 0) &&
          data?.payload?.map((partner, i: number) => {
            return <Partner data={partner} key={i} />;
          })}
      </ul>
      {!isFetching && (data?.payload?.length === 0) && (
        <h1 className="text-center text-3xl text-white/40">
          No Partners Found
        </h1>
      )}
    </section>
  );
};
