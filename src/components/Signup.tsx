import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Job from "./stepComponents/Job";
import Account from "./stepComponents/Account";
import Password from "./stepComponents/Password";
import Company from "./stepComponents/Company";
import Confirm from "./stepComponents/Confirm";
import License from "./stepComponents/License";
import SignupNavigation from "./SignupNavigation";
import { User } from "data/types";
import "../styles.css";

function Signup() {
  const [user, setUser] = useState<User>({
    jobIdx: null,
    company: null,
    license: null,
    account: null,
    password: null,
  });
  const [validation, setValidation] = useState(false);

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };
  const checkValidation = (id: number) => {
    const fields = Object.keys(user) as Array<keyof User>;
    setValidation(user[fields[id - 1]] !== null);
  };

  const updateValidation = (validation: boolean) => {
    setValidation(validation);
  };

  const stepList = [
    { idx: 0, component: null },
    {
      idx: 1,
      component: (
        <Job
          userProps={user}
          onUpdateUser={updateUser}
          onUpdateValidation={updateValidation}
        />
      ),
    },
    {
      idx: 2,
      component: (
        <Company
          userProps={user}
          onUpdateUser={updateUser}
          onUpdateValidation={updateValidation}
        />
      ),
    },
    {
      idx: 3,
      component: (
        <License
          userProps={user}
          onUpdateUser={updateUser}
          onUpdateValidation={updateValidation}
        />
      ),
    },
    {
      idx: 4,
      component: (
        <Account
          userProps={user}
          onUpdateUser={updateUser}
          onUpdateValidation={updateValidation}
        />
      ),
    },
    {
      idx: 5,
      component: (
        <Password
          userProps={user}
          onUpdateUser={updateUser}
          onUpdateValidation={updateValidation}
        />
      ),
    },
    { idx: 6, component: <Confirm /> },
  ];

  const totalStepList = stepList.length - 1;

  const { id } = useParams();
  const [step, setStep] = useState(id ? parseInt(id) : 0);
  const [currentStepComponent, setCurrentStepComponent] =
    useState<JSX.Element | null>(null);

  useEffect(() => {
    setStep(id ? parseInt(id) : 0);
    checkValidation(id ? parseInt(id) : 0);
  }, [id]);

  useEffect(() => {
    const idx = step;
    if (idx >= 0 && idx < stepList.length) {
      setCurrentStepComponent(stepList[idx].component);
    } else {
      setCurrentStepComponent(null);
    }
  }, [step]);

  return (
    <div>
      <div className={"signup-bar"}>
        <h2 className={"signup-text"}>회원 가입</h2>
      </div>
      <div className={"wrapper"}>
        {currentStepComponent}
        <SignupNavigation
          user={user}
          step={step}
          totalStepList={totalStepList}
          validation={validation}
        />
      </div>
    </div>
  );
}

export default Signup;
