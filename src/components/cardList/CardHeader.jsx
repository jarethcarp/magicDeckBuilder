import React from "react";

const cardHeader = ({ isNotPublic }) => {
  return isNotPublic ? (
    <>
      <thead className="hidden lg:table-header-group whitespace-nowrap text-gray font-bold">
        <tr>
          <th
            className="p-4 text-left"
          >
            Actions
          </th>
          <th className="p-4 text-left">
            
          </th>
          <th className="p-4 text-left">
            Name
          </th>
          <th
            className="p-4 text-left"
          >
            Card Type
          </th>
          <th className="p-4 text-left">
            Mana Cost
          </th>
          <th className="p-4 text-left">
            Price
          </th>
        </tr>
      </thead>

      <thead className="table-header-group lg:hidden whitespace-nowrap text-gray font-bold">
        <tr>
          <th
            className="p-4 text-left"
          >
            Actions
          </th>
          <th className="p-4 text-left">
            #
          </th>
          <th className="p-4 text-left">
            Name
          </th>
          <th className="p-2 text-left">
            Price
          </th>
        </tr>
      </thead>
      
    </>
    
  ) : (
    <>
      <thead className="hidden lg:table-header-group whitespace-nowrap text-gray font-bold">
        <tr>
          <th className="p-4 text-left text-xs font-semibold text-gray-800">
            # of cards
          </th>
          <th className="p-4 text-left text-xs font-semibold text-gray-800">
            large
          </th>
          <th className="p-4 text-left text-xs font-semibold text-gray-800">
            Card Type
          </th>
          <th className="p-4 text-left text-xs font-semibold text-gray-800">
            Mana Cost
          </th>
          <th className="p-4 text-left text-xs font-semibold text-gray-800">
            Price
          </th>
        </tr>
      </thead>

      <thead className="table-header-group lg:hidden whitespace-nowrap text-gray font-bold">
        <tr>
          <th className="p-4 text-left text-xs font-semibold text-gray-800">
            # of cards
          </th>
          <th className="p-4 text-left text-xs font-semibold text-gray-800">
            Small
          </th>
          <th className="p-4 text-left text-xs font-semibold text-gray-800">
            Price
          </th>
        </tr>
      </thead>
    </>
    
  );
};

export default cardHeader;
