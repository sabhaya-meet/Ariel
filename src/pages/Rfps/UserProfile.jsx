import { Avatar, Button, image, Input } from "@nextui-org/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userReducer, { userActions } from "../../store/userReducer";
import { userProfileImage } from "../../apis/patch";
import { TiCamera } from "react-icons/ti";
import { toast } from "react-toastify";
function UserProfile() {
  const userProfile = useSelector((state) => state.user?.user);

  const dispatch = useDispatch();

  const [formState, setFromState] = useState(userProfile);

  const [firstName, setFirstName] = useState(userProfile?.first_name);

  const [lastName, setLastName] = useState(userProfile?.last_name);

  // const [updateImage, setUpdateImage] = useState(userProfile?.image);
  const [file, setFile] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromState({
      ...formState,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    if (firstName?.trim() !== "" && lastName?.trim() !== "") {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .put(
            "https://api.trymarvin.com/api/v1/users/",
            {
              first_name: firstName,
              last_name: lastName,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            dispatch(userActions.setProfile(response.data));
            toast.success("User profile update susccessfully");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("one of the field is empty");
      }
    }
  };

  const handleUploadFile = async (e) => {
    const file = e.target?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const addImage = await userProfileImage(formData);
        setFile(addImage);
        dispatch(
          userActions.setProfile({ ...userProfile, image: addImage.image })
        );
      } catch (error) {
        console.log("Failed to upload file:", error);
      }
    } else {
      console.log("No file selected");
    }
  };

  const selectFileRef = useRef(null);

  return (
    <div className="flex flex-col justify-between mt-8 ml-12 mr-12  gap-6 rounded-2xl bg-white p-4">
      <h1 className="text-4xl mt-5 ml-7">Profile</h1>
      <div className="flex justify-center ">
        <div className="w-20 h-20 relative">
          <Avatar
            src={"https://api.trymarvin.com/" + userProfile.image}
            className="w-20 h-20 text-large border-[#6941c6] border-2"
          />
          <TiCamera
            className="w-7 h-7 absolute top-2/3 left-full -translate-x-2/3"
            onClick={() => selectFileRef.current.click()}
          />
        </div>
        <input
          ref={selectFileRef}
          type="file"
          id="fileInput"
          onChange={(e) => handleUploadFile(e)}
          accept="image/*"
          className="cursor-pointer hidden"
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-3">
        <div className="col-span-2 lg:col-span-1">
          <span className="ml-[17px] text-[#232550] font-[Raleway] font-bold">
            First Name
          </span>
          <Input
            // value={formState.first_name}
            value={firstName}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            className="rounded-xl bg-[#f1f1f8]"
          />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <span className="ml-[17px] text-[#232550] font-[Raleway] font-bold">
            Last Name
          </span>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            className="rounded-xl bg-[#f1f1f8]"
          />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <span className="ml-[17px] text-[#232550] font-[Raleway] font-bold">
            Email
          </span>
          <Input
            readOnly={true}
            value={userProfile?.email}
            type="email"
            className="rounded-xl bg-[#f1f1f8]"
          />
        </div>
      </div>
      <div className="self-end justify-self-end">
        <Button
          className="bg-[#5151A6] rounded-md text-white"
          color="primary"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </div>
    </div>
  );
}

export default UserProfile;
