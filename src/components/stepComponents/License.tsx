import { User, componentProps } from "data/types";
import React, { useState } from "react";

function License(props: componentProps) {
  const { userProps, onUpdateUser, onUpdateValidation } = props;
  const [license, setlicense] = useState<string | null>(userProps.license);
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLicense = event.target.value;
    const updatedUser: User = { ...userProps, license: newLicense };
    const updatedValidation: boolean = checkValidation(newLicense);
    onUpdateUser(updatedUser);
    onUpdateValidation(updatedValidation);
    setlicense(newLicense);
    setIsValid(updatedValidation);
  };

  const checkValidation = (l: string | null) => {
    return l && l.length >= 5 ? true : false;
  };

  const LicenseInput = (
    <div>
      <input
        className={"input"}
        type="text"
        placeholder="면허 번호를 입력하세요."
        value={license || ""}
        onChange={handleInputChange}
        style={{
          border: isValid ? "1px solid #ccc" : "1px solid red",
          outline: "none",
        }}
      />
      {!isValid && <p style={{ color: "red" }}>면허 번호를 입력해주세요.</p>}
    </div>
  );

  return (
    <div>
      <h2 className={"title"}>면허 번호를 입력하세요.</h2>
      <div className={"input-wrapper"}>
        <div className={"input-name"}>면허 번호</div>
        {LicenseInput}
      </div>
    </div>
  );
}

export default License;
