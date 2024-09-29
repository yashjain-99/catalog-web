import { INTERVALS } from "@/lib/constants";
import type { IconType } from "react-icons";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOpenInFull } from "react-icons/md";
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
        {INTERVALS.map((interval, index) => (
          <IntervalIetm interval={interval} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Actions;
