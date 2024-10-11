import { Button, Input } from "@nextui-org/react";
import React from "react";
import searchBarIcon from "../../assets/SearchBarIcon.svg";
import DatePickerIcon from "../../assets/DatePickerIcon.svg";
import FilterIcon from "../../assets/Filter.svg";

export default function RfpFilter() {
  return (
    <div className="flex flex-wrap gap-4 w-full py-3 px-4 scroll-py-3 scroll-px-4 justify-between items-start bg-[#CCCCD1] rounded-xl">
      <Input
        type="text"
        placeholder="Search for RFP"
        labelPlacement="outside"
        startContent={<img src={searchBarIcon} className="text-2xl " />}
        classNames={{
          input: "h-11",
          base: "max-w-80 rounded-lg border border-[#D0D5DD] bg-white",
        }}
      />
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-[8px] self-stretch rounded-lg border py-2.5 px-4 border-[#D0D5DD] bg-white">
          <img src={DatePickerIcon} />
          <p className="text-[14px] font-bold font-[Raleway]">
            Jan 6, 2022 – Jan 13, 2022
          </p>
        </div>
        <Button
          className="text-[#344054] font-[Raleway] text-base font-bold bg-white rounded-lg"
          startContent={
            <img className="w-[11.667px] h-[11.667px]" src={FilterIcon} />
          }
        >
          Filters
        </Button>
      </div>
    </div>
  );
}
