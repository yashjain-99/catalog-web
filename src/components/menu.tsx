import React from "react";
import { motion } from "framer-motion";

type Column = {
  columnName: string;
  alias: string;
};

const Menu = ({
  columns,
  selectedTab,
  handleTabChange,
  layoutId,
}: {
  columns: Array<Column>;
  selectedTab: string;
  handleTabChange: (alias: string) => void;
  layoutId: string;
}) => {
  return (
    <nav className="border-b-2 flex items-center ">
      <ul className="flex flex-row gap-3 sm:gap-4">
        {columns.map((column, index) => (
          <li
            key={`${column.columnName}-${index}`}
            className="relative h-full px-3 py-2"
          >
            <button
              onClick={() => handleTabChange(column.alias)}
              className={`cursor-pointer transition-transform duration-200 ${
                column.alias === selectedTab
                  ? "font-bold"
                  : "text-[#858585] hover:font-semibold"
              } `}
            >
              <div className="relative z-10 sm:p-3 flex flex-row gap-1 transform hover:scale-105">
                <span>{column.columnName}</span>
              </div>
              {column.alias === selectedTab && (
                <motion.div
                  layoutId={`${layoutId}_underline`}
                  className="absolute inset-0 border-b-2 border-[#4B40EE]"
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
