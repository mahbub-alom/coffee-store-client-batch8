import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import CoffeeCard from "../CoffeeCard/CoffeeCard";

const Coffee = () => {
  const loadingCoffeeData = useLoaderData();
  const [coffees, setCoffees] = useState(loadingCoffeeData);
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {coffees.map((coffee) => (
        <CoffeeCard
          key={coffee._id}
          coffees={coffees}
          setCoffees={setCoffees}
          coffee={coffee}
        ></CoffeeCard>
      ))}
    </div>
  );
};

export default Coffee;
