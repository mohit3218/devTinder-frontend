import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/connection", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections === undefined || connections?.length === 0)
    return (
      <h1 className="font-bold text-2xl text-center my-10">
        No Connections Found
      </h1>
    );
  return (
    <div className="text-center my-10">
      <h1 className="text-3xl text-white text-bold">Connections</h1>

      {connections.map((connection) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          skills,
          about,
        } = connection;
        return (
          <div
            key={_id}
            className="flex m-4 p-4  rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                src={photoUrl}
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <div className="mx-4 text-left">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
