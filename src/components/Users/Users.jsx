import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import React from "react";
// import React, { useState } from "react";
// import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
  // const loadedUsers = useLoaderData();
  // const [users, setUsers] = useState(loadedUsers);

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      return res.json();
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner text-error"></span>;
  }

  if (isError) {
    console.log(error.message);
  }

  const handleDelete = (id) => {
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
        fetch(`http://localhost:5000/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // const remaining = users.filter((user) => user._id !== id);
            // setUsers(remaining);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your User has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div>
      <h1 className="text-center text-3xl">Site total User: {users.length}</h1>
      <div className="overflow-x-auto w-1/2 mx-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Created Time</th>
              <th>Last log Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.email}</td>
                <td>{user.metaData}</td>
                <td>{user.lastLoginTime}</td>
                <td className="btn" onClick={() => handleDelete(user._id)}>
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
