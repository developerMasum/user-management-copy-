import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Users = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://user-management-server-alpha.vercel.app/users"
        );
        const users = setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

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
        fetch(`https://user-management-server-alpha.vercel.app/user/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your order has been deleted.", "success");

              const remaining = users.filter((order) => order._id !== id);
              setUser(remaining);
            }
          });
      }
    });
  };

  return (
    <div className="w-full">
      <div className="text-center mt-5 mb-5 mx-auto">
        <Link to={"/add-user"}>
          {" "}
          <button className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Add user +++{" "}
          </button>{" "}
        </Link>
      </div>

      <h3 className="text-2xl font-semibold my-4">
        {/* Total users: {users.length} */}
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="bg-red-500 text-white">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>View</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="bg-green-100">
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{user.id}</td>

                <td> {user.name}</td>
                <Link to={`view-user/${user._id}`}>
                  {" "}
                  <td>
                    <button className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      view
                    </button>
                  </td>
                </Link>
                <td>
                  <Link to={`/add-user/${user._id}`}>
                    {" "}
                    <button className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Delete
                  </button>
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
