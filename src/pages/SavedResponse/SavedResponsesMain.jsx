import React, { useCallback, useEffect, useState } from "react";
import HeaderSaved from "./HeaderSaved";
import SavedAnswer from "./SavedAnswer";
import { likedSessionAIAnswerGetApi } from "./savedAPIData";
import { addDays, format } from "date-fns";
import { IoClose } from "react-icons/io5";
import { getSessionTag } from "../document/DocumentApi";
import { debounce } from "lodash";

function SavedResponsesMain() {
  const [likedQuestionData, setLikedQuestionData] = useState([]);
  const [peopleSelectedKeys, setPeopleSelectedKeys] = useState([]);
  const [peopleName, setPeopleName] = useState([]);
  const [contractTypeListData, setContractTypeListData] = useState([]);
  const [totalTags, setTotalTags] = useState([]);
  const [tagSelectedKeys, setTagSelectedKeys] = useState([]);
  const [dateSet, setDateSet] = useState({
    startDate: format(
      new Date(new Date().setDate(new Date().getDate() - 30)),
      "yyyy-MM-dd hh:mm:ss"
    ),
    endDate: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
    key: "selection",
  });
  const combineFilterData = [
    ...peopleName,
    ...contractTypeListData,
    ...tagSelectedKeys,
  ];
  const StaticStartdate = format(
    new Date(new Date().setDate(new Date().getDate() - 365)),
    "yyyy-MM-dd hh:mm:ss"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const Staticenddate = format(new Date(), "yyyy-MM-dd hh:mm:ss");

  useEffect(() => {
    getSessionTag().then((res) => {
      setTotalTags(res?.data);
    });
    allFilterData({
      query: searchQuery,
      startDate: dateSet?.startDate,
      endate: dateSet?.endDate,
    });
  }, []);

  const allFilterData = useCallback(
    ({
      query = searchQuery,
      startDate = dateSet?.startDate,
      endate = dateSet?.endDate,
    }) => {
      const listOfTeamMember = peopleSelectedKeys?.reduce(
        (acc, curr) => (acc ? `${acc},${curr}` : curr),
        ""
      );
      const listOfTags = tagSelectedKeys?.reduce(
        (acc, curr) => (acc ? `${acc},${curr}` : curr),
        ""
      );

      const listOfContractType = contractTypeListData?.reduce(
        (acc, curr) => (acc ? `${acc},${curr}` : curr),
        ""
      );
      likedSessionAIAnswerGetApi(
        query,
        format(startDate, "yyyy-MM-dd 00:00:00.000"),
        format(endate, "yyyy-MM-dd 23:59:59.999"),
        // dateSet?.startDate,
        // dateSet?.endDate,

        !!listOfTeamMember ? listOfTeamMember : undefined,
        !!listOfTags ? listOfTags : undefined,
        !!listOfContractType ? listOfContractType : undefined
      )?.then((res) => {
        setLikedQuestionData(res?.data);
      });
    },
    [
      peopleSelectedKeys,
      tagSelectedKeys,
      contractTypeListData,
      searchQuery,
      dateSet,
    ]
  );

  const debouncedSearch = useCallback(
    debounce((query) => {
      allFilterData({
        query,
        startDate: dateSet?.startDate,
        endate: dateSet?.endDate,
      });
    }, 800),
    []
  );

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleFilterRemove = (item, type) => {
    setPeopleSelectedKeys((prev) => prev?.filter((el) => el != item?.id));
    setPeopleName((prev) => prev?.filter((el) => el?.id !== item?.id));
    let updatedPeopleSelectedKeys = [
      ...peopleSelectedKeys?.filter((el) => el != item?.id),
    ];
    let updatedTagSelectedKeys = [...tagSelectedKeys];
    let updatedContractTypeListData = [...contractTypeListData];

    switch (type) {
      case "people":
        updatedPeopleSelectedKeys = peopleSelectedKeys.filter(
          (p) => p !== item
        );
        setPeopleSelectedKeys(updatedPeopleSelectedKeys);
        break;
      case "tags":
        updatedTagSelectedKeys = tagSelectedKeys.filter((t) => t !== item);
        setTagSelectedKeys(updatedTagSelectedKeys);
        break;
      case "contractTypes":
        updatedContractTypeListData = contractTypeListData.filter(
          (c) => c !== item
        );
        setContractTypeListData(updatedContractTypeListData);
        break;
      default:
        return;
    }

    likedSessionAIAnswerGetApi(
      searchQuery,
      dateSet?.startDate,
      dateSet?.endDate,
      updatedPeopleSelectedKeys.length > 0
        ? updatedPeopleSelectedKeys.join(",")
        : undefined,
      updatedTagSelectedKeys.length > 0
        ? updatedTagSelectedKeys.join(",")
        : undefined,
      updatedContractTypeListData.length > 0
        ? updatedContractTypeListData.join(",")
        : undefined
    ).then((res) => {
      setLikedQuestionData(res?.data);
    });
  };

  return (
    <>
      <div className="px-6">
        <div className="flex flex-col gap-4 max-w-[1232px] mx-auto">
          <p className="text-white text-[2.5rem] mb-1.5 leading-10 font-bold mt-8 font-[Neutrafacetext-Bold]">
            Saved Responses
          </p>
          <HeaderSaved
            peopleSelectedKeys={peopleSelectedKeys}
            setPeopleSelectedKeys={setPeopleSelectedKeys}
            tagSelectedKeys={tagSelectedKeys}
            setTagSelectedKeys={setTagSelectedKeys}
            setLikedQuestionData={setLikedQuestionData}
            // StaticStartdate={
            //   new Date(new Date().setDate(new Date().getDate() - 365))
            // }
            // Staticenddate={new Date()}
            allFilterData={allFilterData}
            contractTypeListData={contractTypeListData}
            setContractTypeListData={setContractTypeListData}
            totalTags={totalTags}
            searchQuery={searchQuery}
            // setSearchQuery={setSearchQuery}
            handleSearchInputChange={handleSearchInputChange}
            // peopleName={peopleName}
            setPeopleName={setPeopleName}
            dateSet={dateSet}
            setDateSet={setDateSet}
          />
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          <div className="flex flex-wrap gap-1">
            {combineFilterData.map((elData) => {
              const type = peopleSelectedKeys.includes(elData)
                ? "people"
                : tagSelectedKeys.includes(elData)
                ? "tags"
                : "contractTypes";
              return (
                <div className="flex flex-row flex-nowrap gap-1 text-sm items-center text-[#0d121c] font-dmSans w-fit rounded-[20px] px-2 py-1 bg-[#c3c3ef]">
                  <p>{elData?.email || elData}</p>
                  <IoClose
                    onClick={() => handleFilterRemove(elData, type)}
                    className="w-4 h-4 cursor-pointer text-[#4a4b4d]"
                  />
                </div>
              );
            })}
          </div>
          {combineFilterData.length > 0 && (
            <p
              className="px-2 py-1 text-sm text-white underline cursor-pointer font-dmSans"
              onClick={() => {
                setPeopleSelectedKeys([]);
                setPeopleName([]);
                setContractTypeListData([]);
                setTagSelectedKeys([]);
                setSearchQuery("");
                likedSessionAIAnswerGetApi(
                  "",
                  dateSet?.startDate,
                  dateSet?.endDate
                );
              }}
            >
              Clear all filters
            </p>
          )}
        </div>

        <div className="h-full gap-4 columns-1 sm:columns-2 md:columns-3">
          {likedQuestionData?.map((questionData) => {
            return (
              <SavedAnswer
                questionData={questionData}
                likedQuestionData={likedQuestionData}
                setLikedQuestionData={setLikedQuestionData}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SavedResponsesMain;
