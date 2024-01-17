import React, { useState } from "react";
import { User, componentProps } from "data/types";

function Account(props: componentProps) {
  const { userProps, onUpdateUser, onUpdateValidation } = props;
  const [email, setEmail] = useState<string | null>(userProps.account);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isCheckedEmail, setIsCheckedEmail] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
    setEmailError(null);
    onUpdateValidation(false);
  };

  const handleCheckDuplicate = async () => {
    if (isEmailValid && !isCheckedEmail) {
      const requestBody = {
        email: email,
      };

      try {
        const response = await fetch(
          "https://kkwy2n35ug.execute-api.ap-northeast-2.amazonaws.com/dev/auth/check-duplication",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (response.status === 200) {
          const updatedUser: User = { ...userProps, account: email };
          setIsEmailValid(true);
          onUpdateUser(updatedUser);
          onUpdateValidation(true);
          setEmailError(null);
          setIsCheckedEmail(true);
        } else if (response.status === 409) {
          setIsEmailValid(false);
          onUpdateValidation(false);
          setEmailError("이미 사용 중인 계정 입니다.");
          setIsCheckedEmail(false);
        }
      } catch (error) {
        console.error("Error checking email duplication:", error);
      }
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const AccountInput = (
    <input
      className={"input"}
      type="email"
      value={email || ""}
      onChange={handleEmailChange}
      disabled={isCheckedEmail}
      style={{
        border:
          (email != null && validateEmail(email)) || email === null
            ? "1px solid #ccc"
            : "1px solid red",
        outline: "none",
      }}
    />
  );
  const AccountButton = (
    <button
      onClick={handleCheckDuplicate}
      disabled={!(email != null && validateEmail(email)) || isCheckedEmail}
    >
      {isCheckedEmail ? "확인 완료" : "중복 확인"}
    </button>
  );

  return (
    <div>
      <h2 className={"title"}>계정을 입력하세요.</h2>
      <div className={"input-wrapper"}>
        <div className={"input-name"}>이메일 계정</div>
        {AccountInput}
        {AccountButton}
      </div>
      {!((email != null && validateEmail(email)) || email === null) && (
        <p style={{ color: "red" }}>이메일 주소를 입력하세요.</p>
      )}
      {emailError && <p style={{ color: "red" }}>{emailError}</p>}
    </div>
  );
}

export default Account;
