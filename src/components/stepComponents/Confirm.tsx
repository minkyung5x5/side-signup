import React from "react";

function Confirm() {
  return (
    <div>
      <h2 className={"title"}>조금만 기다려주세요.</h2>
      <h2 className={"title"}>
        마지막으로 내부 승인 절차를 진행하고 있습니다.
      </h2>
      <h5 className={"subtitle"}>
        1일(영업일)이내에 승인 여부에 관한 메일이 발송됩니다.
      </h5>
      <h5 className={"subtitle"}>
        승인이 완료되면 포털에 로그인 할 수 있습니다.
      </h5>
    </div>
  );
}

export default Confirm;
