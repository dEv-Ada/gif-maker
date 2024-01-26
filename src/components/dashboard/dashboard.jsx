import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { CommonConstant } from "../common/commonContants";
import AddImageCard from "./child/addImageCard";

const Dashboard = () => {
  const [numberofImage, setNumberOfImage] = useState(3);
  const loginFlag = sessionStorage.getItem("loginFlag");
  const navigate = useNavigate();
  useEffect(() => {
    if (loginFlag === null || loginFlag === undefined) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="m-3">
      <div className="text-white bg-dark ps-2">
        <p className="d-flex">
          <span>
            {CommonConstant.THE_NUMBER_OF_IMAGE_YOU_WANT_TO_ADD + ":  "}
          </span>
          {"  "}
          <button
            disabled={numberofImage <= 1}
            className="btn-rad-50"
            onClick={() => setNumberOfImage(numberofImage - 1)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>{" "}
          <Button>{numberofImage}</Button>{" "}
          <button
            disabled={numberofImage > 4}
            className="btn-rad-50"
            onClick={() => setNumberOfImage(numberofImage + 1)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </p>
      </div>
      <AddImageCard numberofImage={numberofImage} />
    </div>
  );
};

export default Dashboard;
