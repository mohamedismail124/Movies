import React from "react";


function Profile({ userData }) {
  return (
    <>
      <div className="profile w-50 py-5 my-4 m-auto text-center">
        {" "}
        <h2>
          Name : {userData?.first_name} {userData?.last_name}
        </h2>
        <h2 className="my-4">Age : {userData?.age}</h2>
        <h2>Email : {userData?.email} </h2>
      </div>
    </>
  );
}

export default Profile;
