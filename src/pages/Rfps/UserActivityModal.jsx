import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Avatar,
} from "@nextui-org/react";
import { IoClose } from "react-icons/io5";
import moment from "moment"; // Import Moment.js

export default function UserActivityModal({
  activitIsOpen,
  activityOnOpenChange,
  userActivityData,
}) {
  return (
    <Modal
      isOpen={activitIsOpen}
      onOpenChange={activityOnOpenChange}
      classNames={{
        base: "flex flex-col relative z-50 w-full box-border outline-none sm:mx-6 sm:my-16 shadow-small max-h-[calc(100%_-_7.5rem)] bg-white max-w-[90vw] rounded-xl m-0 lg:max-w-[1000px] 2xl:max-h-screen",
        body: "p-0",
      }}
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex-initial text-large font-semibold items-start justify-between p-6 pb-[22px]">
              <div className="flex w-full ">
                <div className="flex flex-col flex-grow gap-1">
                  <div className="flex justify-between w-full">
                    <p className="text-lg font-semibold font-[Raleway] text-ebony leading-[22px]">
                      Activities
                    </p>
                    <IoClose
                      onClick={onClose}
                      className="w-7 h-7 cursor-pointer text-[#8d9095]"
                    />
                  </div>
                </div>
              </div>
            </ModalHeader>
            <div className="w-full border"></div>
            <ModalBody>
              <div className="flex-1 overflow-y-auto p-0 flex flex-col gap-1 px-2 py-3">
                {userActivityData.map((item, index) => {
                  const words = item?.description.split(" ");

                  const formattedDate = moment(item?.creation_date).format(
                    "MMMM D, YYYY [at] h:mm:ss a"
                  );

                  return (
                    <div className="flex gap-2 p-3 items-center" key={index}>
                      <div>
                        <Avatar
                          src={"https://api.trymarvin.com/" + item?.user?.image}
                        />
                      </div>

                      <div>
                        <p>
                          <span className="font-bold">
                            {words[0]} {words[1]}
                          </span>{" "}
                          {words.slice(2).join(" ")}
                        </p>
                        <p>{formattedDate}</p>{" "}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
