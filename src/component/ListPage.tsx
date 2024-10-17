import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../store/userSlice";
import { RootState } from "../store/store";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export default function ListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user: any = useSelector((state: RootState) => state.users);

  const { data, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://crudcrud.com/api/f4225333d42348c684523c40650df1d2/users"
      );
      await dispatch(addData({ users: data }));
      //   console.log(data);
      return data;
    },
  });

  const handleDelete  = async (id : any) => {
    const response = await axios.delete(`https://crudcrud.com/api/f4225333d42348c684523c40650df1d2/users${id}`,);
    return response.data;
}

  const { mutate: delteMutation } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      alert("User Deleted Successfully");
    },
    onError: () => {
      alert("Something Went Wrong");
    },
  });

  return (
    <>
      <div className="container-lg" style={{ margin: "10%" }}>
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-8">
                  <h2>
                    User <b>Details</b>
                  </h2>
                </div>
                <div className="col-sm-4" style={{ marginLeft: "auto" }}>
                  <button
                    onClick={() => navigate("/add")}
                    type="button"
                    className="btn btn-info add-new"
                  >
                    <FaPlus /> Add New
                  </button>
                </div>
              </div>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {user.users
                  ? user.users.map((ele: any) => {
                      return (
                        <tr key={`${ele._id}-user`}>
                          <td>{ele.name}</td>
                          <td>{ele.deparment}</td>
                          <td>{ele.contact}</td>
                          <td>
                            <Link
                              to={{ pathname: `/edit/${ele._id}` }}
                              className="edit"
                              title="Edit"
                              data-toggle="tooltip"
                            >
                              <FaEdit />
                            </Link>
                            <a
                              className="delete"
                              title="Delete"
                              data-toggle="tooltip"
                              onClick={() => delteMutation(ele._id)}
                            >
                              <MdDelete />
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
