import React, { useState } from 'react';
import Eclipse from '../../components/design-utils/Eclipse';
import { arrowLeft, documentIcon, downloadIcon, menu1 } from '../../assets';

const MyDocumentsPage = () => {
  const [documents, setDocuments] = useState([
    {
      name: 'Ibrar Naveed - Resume',
      lastActivity: 'Today at 4:42 AM',
    },
    {
      name: 'Ibrar Naveed - Resume',
      lastActivity: 'Today at 4:42 AM',
    },
    {
      name: 'Ibrar Naveed - Resume',
      lastActivity: 'Today at 4:42 AM',
    },
  ]);
  return (
    <div className="w-full relative flex  min-h-screen overflow-hidden  bg-black">
      <Eclipse
        top="top-[calc(-100vw*.4)] lg:top-[calc(-100vw*1.1)]"
        left="left-[calc(-100vw*0.2)] lg:left-[calc(-100vw*0.25)]"
      />
      <div className="z-10 w-full gap-20 px-40 py-40 flex flex-col items-start justify-start">
        {/* Header */}
        <div className="flex items-start flex-col justify-center gap-10 text-white">
          <button className="flex w-max items-center justify-center gap-3">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              className="w-[24px] h-[24px] object-contain"
            />
            <span className="font-albert text-sm text-black-transparent">
              Back to editor
            </span>
          </button>
          <h1 className="font-albert text-5xl font-semibold">My Documents</h1>
        </div>
        {/* Body/SubHeadings */}
        <div className="w-full flex flex-col gap-20 ">
          <div className="w-full grid grid-cols-3  px-10 py-5 ">
            <span className="font-albert text-sm text-start w-full text-white">
              Name
            </span>
            <span className="font-albert text-sm text-start w-full text-white">
              Last Activity
            </span>
            <span className="font-albert text-sm text-center w-full text-white">
              Actions
            </span>
          </div>
          {/* Documents */}
          {documents?.map((document, key) => (
            <div
              key={key}
              className="w-full grid grid-cols-3 bg-black border border-white-transparent-2 transition-all duration-300 hover:bg-gray-800 rounded-3xl px-10 py-5 cursor-pointer"
            >
              {/* Document Name */}
              <div className="w-full flex justify-start items-center gap-10 text-white ">
                <img src={documentIcon} className="w-50px" alt="Icon" />
                <span className="font-albert text-base">{document?.name}</span>
              </div>
              {/* Last Activity */}
              <div className="w-full flex justify-start items-center gap-10 text-gray-500 font-albert text-sm text-start  ">
                {document.lastActivity}
              </div>
              {/* Actions */}
              <div className="flex justify-end items-center gap-10">
                <button className="hover:bg-gray-600 px-8 py-4 border border-white-transparent-2 rounded-full text-white font-albert text-sm">
                  Open
                </button>
                <button className="hover:bg-gray-600 px-8 py-4  rounded-full text-white font-albert text-sm">
                  <img src={downloadIcon} alt="download" />
                </button>
                <button className="hover:bg-gray-600 h-20 w-20 flex justify-center items-center rounded-full text-white font-albert text-sm">
                  <img src={menu1} alt="menu" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyDocumentsPage;
