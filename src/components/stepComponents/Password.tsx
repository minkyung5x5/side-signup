import React, { useState } from "react";
import { componentProps } from "data/types";

function Password(props: componentProps) {
  const { userProps, onUpdateUser, onUpdateValidation } = props;

  const [password, setPassword] = useState<string | null>(userProps.password);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(
    userProps.password
  );
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] =
    useState<boolean>(true);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    const updatedUser = { ...userProps, password: newPassword };
    const passwordValidation = checkPasswordValidation(newPassword);
    const confirmPasswordValidation = checkConfirmPasswordValidation(
      newPassword,
      confirmPassword ? confirmPassword : ""
    );
    const updatedTotalValidation =
      passwordValidation && confirmPasswordValidation;
    onUpdateUser(updatedUser);
    onUpdateValidation(updatedTotalValidation);
    setPassword(newPassword);
    setPasswordIsValid(passwordValidation);
    setConfirmPasswordIsValid(confirmPasswordValidation);
    if (!confirmPasswordValidation) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError(null);
    }
    if (!passwordValidation) {
      setPasswordError("8~16자 영문, 숫자, 특수문자를 입력하세요.");
    } else {
      setPasswordError(null);
    }
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = event.target.value;
    const passwordValidation = checkPasswordValidation(
      password ? password : ""
    );
    const confirmPasswordValidation = checkConfirmPasswordValidation(
      password,
      newConfirmPassword
    );
    const updatedTotalValidation =
      passwordValidation && confirmPasswordValidation;

    onUpdateValidation(updatedTotalValidation);
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordIsValid(confirmPasswordValidation);
    if (!confirmPasswordValidation) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError(null);
    }
  };

  const checkPasswordValidation = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    return passwordRegex.test(password);
  };

  const checkConfirmPasswordValidation = (
    password: string | null,
    confirmPassword: string | null
  ) => {
    if (!password || !confirmPassword) {
      return false;
    }
    return password === confirmPassword;
  };

  return (
    <div>
      <div>
        <h2 className={"title"}>비밀 번호를 입력하세요.</h2>

        <div className={"input-wrapper"}>
          <div className={"input-name"}>비밀번호</div>
          <input
            className={"input"}
            type="password"
            value={password || ""}
            onChange={handlePasswordChange}
            style={{
              border: passwordIsValid ? "1px solid #ccc" : "1px solid red",
              outline: "none",
            }}
          />
        </div>
        {!passwordIsValid && <p style={{ color: "red" }}>{passwordError}</p>}

        <div className={"input-wrapper"}>
          <div className={"input-name"}>비밀번호 확인</div>
          <input
            className={"input"}
            type="password"
            value={confirmPassword || ""}
            onChange={handleConfirmPasswordChange}
            style={{
              border: confirmPasswordIsValid
                ? "1px solid #ccc"
                : "1px solid red",
              outline: "none",
            }}
          />
        </div>
        {!confirmPasswordIsValid && (
          <p style={{ color: "red" }}>{confirmPasswordError}</p>
        )}
      </div>
    </div>
  );
}

export default Password;
