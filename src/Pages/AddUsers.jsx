import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AddUsers = () => {
  const { id } = useParams();
  const paramsId = id;

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const name = data.name;
    const id = data.id;
    const email = data.email;
    const number = data.phoneNumber;
    console.log(data);
    const addNew = {
      name,
      id,
      email,
      number,
    };

    fetch("https://user-management-server-alpha.vercel.app/newUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addNew),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User has been added successfully",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/");
        }
      });
  };

  const OnUpdateSubmit = (data) => {
    const name = data.name;
    const id = parseInt(data.id);
    const email = data.email;
    const number = data.phoneNumber;
    console.log(data);

    const editedData = {
      name,
      id,
      email,
      number,
    };

    fetch(`https://user-management-server-alpha.vercel.app/user/${paramsId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "User Updated  Successfully ",
            icon: "success",
            confirmButtonText: "okay",
          });
        }
      });
  };
  return (
    <>
      {id ? (
        <form
          onSubmit={handleSubmit(OnUpdateSubmit)}
          className="max-w-sm mx-auto"
        >
          <h2 className="text-center text-xl text-emerald-600 font-semibold mt-5 mb-3">
            Update User Form{" "}
          </h2>
          <div className="mb-4">
            <label htmlFor="id" className="text-sm font-medium text-gray-700">
              ID
            </label>
            <input
              type="text"
              id="id"
              // defaultValue={idTwo.id}
              {...register("id", { required: true })}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.id && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              // defaultValue={idTwo.name}
              {...register("name", {
                required: true,
                pattern: /^[A-Za-z]/i,
              })}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && errors.name.type === "required" && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
            {errors.name && errors.name.type === "pattern" && (
              <span className="text-red-500 text-sm">
                Name should not contain numbers
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              // defaultValue={idTwo.email}
              {...register("email", {
                required: true,
                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
              })}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && errors.email.type === "required" && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <span className="text-red-500 text-sm">
                Invalid email address
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              // defaultValue={idTwo.number}
              {...register("phoneNumber", {
                required: true,
                pattern: /^[0-9]{10}$/i,
              })}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.phoneNumber && errors.phoneNumber.type === "required" && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
            {errors.phoneNumber && errors.phoneNumber.type === "pattern" && (
              <span className="text-red-500 text-sm">
                Phone number should be 10 characters
              </span>
            )}
          </div>

          <button
            type="submit"
            className="py-2 w-full px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
          <h2 className="text-center text-xl text-emerald-600 font-semibold mt-5 mb-3">
            Add User Form{" "}
          </h2>
          <div className="mb-4">
            <label htmlFor="id" className="text-sm font-medium text-gray-700">
              ID
            </label>
            <input
              type="text"
              id="id"
              {...register("id", { required: true })}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.id && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: true,
                pattern: /^[A-Za-z]/i,
              })}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && errors.name.type === "required" && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
            {errors.name && errors.name.type === "pattern" && (
              <span className="text-red-500 text-sm">
                Name should not contain numbers
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: true,
                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
              })}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && errors.email.type === "required" && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <span className="text-red-500 text-sm">
                Invalid email address
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              {...register("phoneNumber", {
                required: true,
                pattern: /^[0-9]{10}$/i,
              })}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.phoneNumber && errors.phoneNumber.type === "required" && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
            {errors.phoneNumber && errors.phoneNumber.type === "pattern" && (
              <span className="text-red-500 text-sm">
                Phone number should be 10 characters
              </span>
            )}
          </div>

          <button
            type="submit"
            className="py-2 w-full px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default AddUsers;
