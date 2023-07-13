// import axios from "axios";
// import {  useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

import { useLoaderData } from "react-router-dom";

const ViewUsers = () => {
  const user = useLoaderData();
  console.log(user);
  // const [users,setUser] = useState([])
  // const { id } = useParams();
  // console.log(id);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("https://user-management-server-alpha.vercel.app/users");
  //       const users = setUser(response.data);
  //       console.log(users);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const user = users.find((e) => e.id === id);
  // console.log(user);

  return (
    <div className="pt-12">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="bg-red-500 text-white">
            <tr>
              <th>ID</th>

              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody className="bg-green-100">
            <tr>
              <th>{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.number}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUsers;
