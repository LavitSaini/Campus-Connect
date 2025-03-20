import { X } from "lucide-react";
import React from "react";

const SelectChatAdminModal = ({
  setShowSelectChatAdminModal,
  clubName,
  admins,
}) => {
  console.log(admins);
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-10">
      <div className="p-5 bg-primary-500 rounded-md shadow-md mx-6">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-start gap-10">
            <h3 className="text-white text-lg">
              Select One Admin from {clubName} Club to Chat!
            </h3>
            <button
              onClick={() => setShowSelectChatAdminModal((prev) => !prev)}
              className="p-1 bg-primary-50 text-primary-500 rounded-sm border-[1px] border-primary-50 transition-colors hover:bg-transparent hover:text-primary-50"
            >
              <X className="size-4" />
            </button>
          </div>
          <ul className="flex flex-col items-start gap-3.5">
            {admins.map((obj) => (
              <li key={obj.admin._id} className="w-full">
                <button className="flex gap-2 items-center border-[1px] text-primary-50 border-primary-50 p-2 rounded-sm w-full transition-colors hover:bg-primary-50 hover:text-primary-500">
                  <img
                    className="size-8 rounded-full border-[1px] border-primary-50"
                    src={
                      obj.admin.profileImageUrl || "/assets/images/avatar.png"
                    }
                    alt={obj.admin.name}
                  />
                  <h4>{obj.admin.name}</h4>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectChatAdminModal;
