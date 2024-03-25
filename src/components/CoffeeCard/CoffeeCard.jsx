import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
  const { _id, name, quantity, supplier, taste, photo } =
    coffee;

  const handleDelete = (id) => [
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://coffee-store-server-hc857uldy-md-mahbub-aloms-projects.vercel.app/coffees/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Coffee has been deleted.",
                icon: "success",
              });
            }
            const remaining = coffees.filter((cof) => cof._id !== id);
            setCoffees(remaining);
          });
      }
    }),
  ];

  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <img src={photo} alt="Movie" />
      </figure>
      <div className="flex justify-between w-full items-center pr-4">
        <div>
          <h2 className="card-title">Name: {name}</h2>
          <p>Quantity: {quantity}</p>
          <p>supplier: {supplier}</p>
          <p>taste: {taste}</p>
        </div>
        <div className="card-actions justify-end">
          <div className="join join-vertical space-y-4">
            <button className="btn">View</button>
            <Link to={`/updateCoffee/${_id}`}>
              <button className="btn">Edit</button>
            </Link>
            <button
              onClick={() => handleDelete(_id)}
              className="btn bg-blue-500 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
