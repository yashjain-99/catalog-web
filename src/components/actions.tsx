import { intervals } from "@/_lib/constants";
import { MdOpenInFull } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import React from "react";
import type { IconType } from "react-icons";
import IntervalIetm from "./interval-item";

const ActionItem = ({
  label,
  icon: Icon,
}: {
  label: string;
  icon?: IconType;
}) => {
  return (
    <button className="flex items-center gap-1 font-inter font-medium text-base hover:text-[#4893FF]">
      {Icon && <Icon />}
      {label}
    </button>
  );
};

const Actions = () => {
  return (
    <div className="flex w-full items-center py-4 justify-between">
      <div className="flex items-center gap-4">
        <ActionItem label="Fullscreen" icon={MdOpenInFull} />
        <ActionItem label="Compare" icon={IoIosAddCircleOutline} />
      </div>
      <div className="flex items-center gap-2">
        {intervals.map((interval, index) => (
          <IntervalIetm interval={interval} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Actions;
