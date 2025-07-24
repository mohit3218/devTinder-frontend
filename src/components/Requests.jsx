import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.connections);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1>No Request Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl text-white text-bold">Requests</h1>

      {requests.map((request) => {
        const {_id, firstName, lastName, photoUrl, age, gender, skills, about } =
        request.fromUserId;
        return (
          <div key={_id} className="flex justify-between items-center m-4 p-4  rounded-lg bg-base-300 w-2/3 mx-auto">
            <div>
              <img
                alt="photo"
                src={photoUrl}
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="mx-4 text-left">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div><button className="btn btn-primary mx-2">Primary</button>
            <button className="btn btn-secondary mx-2">Secondary</button></div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
