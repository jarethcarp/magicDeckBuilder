import React from "react";

const DeckHeader = ({ isNotPublic }) => {
  return isNotPublic ? (
    <>
      <thead className="hidden lg:table-header-group whitespace-nowrap bg-primary text-gray font-bold">
        <tr>
          <th className="p-4 text-left">
            Actions
          </th>
          <th className="p-4 text-left">
            Name
          </th>
          <th className="p-4 text-left">
            Colors
          </th>
          <th className="p-4 text-left">
            Format
          </th>
        </tr>
      </thead>

      <thead className="table-header-group lg:hidden whitespace-nowrap bg-primary text-gray font-bold">
        <tr>
          <th className="p-4 text-left">
            Actions
          </th>
          <th className="p-4 text-left">
            Name
          </th>
          <th className="p-4 text-left">
            Format
          </th>
        </tr>
      </thead>
    </>
  ) : (
    <>
      <thead className="hidden lg:table-header-group whitespace-nowrap bg-primary text-gray font-bold">
        <tr>
          <th className="p-4 text-left">
            Name
          </th>
          <th className="p-4 text-left">
            Colors
          </th>
          <th className="p-4 text-left">
            Format
          </th>
        </tr>
      </thead>
      <thead className="table-header-group lg:hidden whitespace-nowrap bg-primary text-gray font-bold">
        <tr>
          <th className="p-4 text-left">
            Name
          </th>
          <th className="p-4 text-left">
            Format
          </th>
        </tr>
      </thead>
    </>
  );
};

export default DeckHeader;
