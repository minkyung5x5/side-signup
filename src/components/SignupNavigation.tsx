import React from "react";
import { User } from "data/types";
import jobList from "data/jobListData";
import { useNavigate } from "react-router-dom";
type SignupNavigationProps = {
  user: User;
  step: number;
  totalStepList: number;
  validation: boolean;
};

function SignupNavigation({
  user,
  step,
  totalStepList,
  validation,
}: SignupNavigationProps) {
  const navigate = useNavigate();

  const shouldSkipStep = (idx: number) => {
    return (
      user.jobIdx !== null &&
      jobList[user.jobIdx].skip.some((item) => item === idx)
    );
  };

  const navigateToNextStep = (nextStepIdx: number) => {
    if (step < totalStepList) {
      if (shouldSkipStep(nextStepIdx)) {
        const secondNextStepIdx = nextStepIdx + 1;
        navigateToNextStep(secondNextStepIdx);
      } else {
        navigate(`/signup/${nextStepIdx}`);
      }
    }
  };

  const navigateToPreviousStep = (nextStepIdx: number) => {
    if (nextStepIdx > 0) {
      if (shouldSkipStep(nextStepIdx)) {
        const secondNextStepIdx = nextStepIdx - 1;
        navigateToPreviousStep(secondNextStepIdx);
      } else {
        navigate(`/signup/${nextStepIdx}`);
      }
    }
  };

  return (
    <div className={"step-button-wrapper"}>
      {!(step === 1 || step === totalStepList) && (
        <button
          className={"step-button disabled"}
          onClick={() => navigateToPreviousStep(step - 1)}
        >
          {"<"} 이전
        </button>
      )}
      {!(step === totalStepList) && (
        <button
          className={`step-button ${!validation ? "disabled" : ""}`}
          onClick={() => navigateToNextStep(step + 1)}
          disabled={!validation}
        >
          다음 {">"}
        </button>
      )}
    </div>
  );
}

export default SignupNavigation;
