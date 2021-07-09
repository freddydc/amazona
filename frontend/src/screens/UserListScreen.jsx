import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function UserListScreen() {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Seller</th>
              <th>Is Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id.substring(16, 25)}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? "Yes" : "No"}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
