import React, { useEffect, useState } from "react";
import "../../styles.css";
import { User, componentProps } from "data/types";
import jobList from "data/jobListData";

type ProcessedJobListItem = {
  idx: number;
  name: string;
};

function Job(props: componentProps) {
  const processedJobList: ProcessedJobListItem[] = jobList.map(
    ({ idx, name }) => ({ idx, name })
  );
  const { userProps, onUpdateUser, onUpdateValidation } = props;
  const [selectedJobIdx, setSelectedJobIdx] = useState<number | null>(
    userProps.jobIdx
  );

  const selectJob = (idx: number) => {
    const updatedUser: User = { ...userProps, jobIdx: idx };
    const updatedValidation: boolean = checkValidation(idx);
    onUpdateUser(updatedUser);
    onUpdateValidation(updatedValidation);
    setSelectedJobIdx(idx);
  };

  const checkValidation = (idx: number) => {
    return idx < jobList.length ? true : false;
  };

  const jobButtons = processedJobList.map(({ idx, name }) => (
    <div key={idx} className={"custom-button-wrapper"}>
      <button
        className={`custom-button ${idx === selectedJobIdx ? "clicked" : ""}`}
        onClick={() => selectJob(idx)}
      >
        {name}
      </button>
    </div>
  ));

  return (
    <div>
      <h2 className={"title"}>해당하는 직무를 선택하세요</h2>
      <div className={"grid-container"}>{jobButtons}</div>
    </div>
  );
}

export default Job;
