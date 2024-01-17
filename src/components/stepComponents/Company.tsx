import React, { useEffect, useRef, useState } from "react";
import { User, componentProps } from "data/types";
import jobList from "data/jobListData";
import "./Organization.css";

function Company(props: componentProps) {
  const ORGANIZATION_API = ""; // add api
  const { userProps, onUpdateUser, onUpdateValidation } = props;
  const isAutocomplete: boolean =
    userProps.jobIdx !== null && jobList[userProps.jobIdx].companyAutocomplete;
  const [company, setCompany] = useState<string | null>(userProps.company);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [organizationList, setOrganizationList] = useState<string[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showOrganizationList, setShowOrganizationList] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchOrganizationList() {
      try {
        const response = await fetch(ORGANIZATION_API);
        const data = await response.text();
        const organizations = data.split("\n");
        setOrganizationList(organizations);
      } catch (error) {
        console.error("Error fetching organization list:", error);
      }
    }
    fetchOrganizationList();

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIdx((prevIdx) =>
          prevIdx === null ? 0 : Math.min(prevIdx + 1, 6)
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIdx((prevIdx) =>
          prevIdx === null ? 0 : Math.max(prevIdx - 1, 0)
        );
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (selectedIdx !== null && company && company.length >= 2) {
          handleOrganizationSelection(
            getMatchingOrganizations(company)[selectedIdx]
          );
          setShowOrganizationList(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedIdx, organizationList]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (inputRef.current) {
        if (!inputRef.current.contains(event.target as Node)) {
          setShowOrganizationList(false);
        }
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const getMatchingOrganizations = (input: string) => {
    const sanitizedInput = input.toLowerCase();
    const matchedOrganizations: string[] = [];

    for (const org of organizationList) {
      if (matchedOrganizations.length >= 7) {
        break;
      }
      if (org.toLowerCase().includes(sanitizedInput)) {
        matchedOrganizations.push(org);
      }
    }

    return matchedOrganizations;
  };

  const highlightText = (text: string, query: string) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) {
      return text;
    }

    const before = text.slice(0, index);
    const highlight = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);

    return (
      <span>
        {before}
        <span style={{ backgroundColor: "yellow" }}>{highlight}</span>
        {after}
      </span>
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCompany = event.target.value;
    const updatedUser: User = { ...userProps, company: newCompany };
    const updatedValidation: boolean = checkValidation(newCompany);
    setShowOrganizationList(true);
    onUpdateUser(updatedUser);
    onUpdateValidation(updatedValidation);
    setCompany(newCompany);
    setIsValid(updatedValidation);
  };

  const handleOrganizationSelection = (org: string) => {
    const updatedUser: User = { ...userProps, company: org };
    const updatedValidation: boolean = checkValidation(org);
    setShowOrganizationList(true);
    onUpdateUser(updatedUser);
    onUpdateValidation(updatedValidation);
    setCompany(org);
    setIsValid(updatedValidation);
    setSelectedIdx(null);
    inputRef.current?.focus();
  };

  const checkValidation = (c: string | null) => {
    return c && c.length > 0 ? true : false;
  };

  const AutocompleteInput = (
    <div>
      <input
        className={"company-input"}
        type="text"
        placeholder="기관명을 입력하세요."
        value={company || ""}
        onChange={handleInputChange}
        style={{
          border: isValid ? "1px solid #ccc" : "1px solid red",
          outline: "none",
        }}
        ref={inputRef}
      />
      {!isValid && <p style={{ color: "red" }}>기관명을 입력해주세요.</p>}
      {showOrganizationList && company && company.length >= 2 && (
        <div className="organization-list">
          {getMatchingOrganizations(company).map((org, index) => (
            <div
              key={index}
              className={`organization-item ${selectedIdx === index ? "selected" : ""
                }`}
              onClick={() => {
                handleOrganizationSelection(org);
                setShowOrganizationList(false); // 클릭 시 리스트 숨김
              }}
            >
              {highlightText(org, company)}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const Input = (
    <div>
      <input
        className={"company-input"}
        type="text"
        placeholder="기관명을 입력하세요."
        value={company || ""}
        onChange={handleInputChange}
        style={{
          border: isValid ? "1px solid #ccc" : "1px solid red",
          outline: "none",
        }}
      />
      {!isValid && <p style={{ color: "red" }}>기관명을 입력해주세요.</p>}
    </div>
  );

  return (
    <div>
      <h2 className={"title"}>소속된 기관을 입력하세요.</h2>
      <div className={"input-wrapper"}>
        <div className={"input-name"}>기관명</div>
        {isAutocomplete ? AutocompleteInput : Input}
      </div>
    </div>
  );
}

export default Company;
