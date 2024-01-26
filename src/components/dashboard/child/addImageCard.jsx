import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { CommonConstant } from "../../common/commonContants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { createGIF } from "gifshot";

const AddImageCard = ({ numberofImage }) => {
  const [numOfPage, setNumOfPage] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [images, setImages] = useState([]);
  const [currImage, setCurrImage] = useState();
  const [createdGif, setCreatedGif] = useState();
  const [interval, setInterval] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tempArr = [];
    for (let i = 1; i <= numberofImage; i++) {
      tempArr.push(i);
    }
    setNumOfPage(tempArr);
  }, [numberofImage]);

  const handleCurrPage = (num) => {
    if (images[num - 1]) {
      setCurrImage(URL.createObjectURL(images[num - 1]));
    } else {
      setCurrImage();
    }
    setCurrPage(num);
  };

  const handleImageAdd = (e) => {
    setCurrImage(URL.createObjectURL(e.target.files[0]));
    setImages([...images, e.target.files[0]]);
    resetFile();
  };

  const resetFile = () => {
    const file = document.querySelector("#image");
    file.value = "";
  };

  const handleCreateGIF = () => {
    const options = {
      images: images.map((item) => URL.createObjectURL(item)),
      gifWidth: 500,
      gifHeight: 300,
      numWorkers: 5,
      frameDuration: interval,
      sampleInterval: 10,
      progressCallback: (e) => setProgress(parseInt(e * 100)),
    };

    createGIF(options, (obj) => {
      if (!obj.error) {
        setCreatedGif(obj.image);
      }
    });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "sample.gif";
    link.href = createdGif;
    link.click();
    setProgress(0);
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Text className="height-70-vh">
            <Row>
              <Col lg={6} md={12} sm={12} xs={12}>
                <Card.Img variant="center" src={currImage} />
                <div className=" pagination-position">
                  <p>
                    {CommonConstant.IMAGE +
                      ": " +
                      (images[currPage - 1]?.name
                        ? images[currPage - 1]?.name
                        : "")}
                  </p>
                  <input
                    type="file"
                    id="image"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleImageAdd}
                  />
                  <div className="mt-1">
                    {numOfPage.map((pageNum) => (
                      <span key={pageNum}>
                        <Button
                          className="btn-rad-50"
                          variant={pageNum === currPage ? "warning" : "primary"}
                          onClick={() => handleCurrPage(pageNum)}
                        >
                          {pageNum}
                        </Button>{" "}
                      </span>
                    ))}
                  </div>
                </div>
              </Col>
              <Col className="brd-left gif-col" lg={6} md={6} sm={12} xs={12}>
                <Card.Img variant="center" src={createdGif} />
                <div>
                  <Form className="mt-2">
                    <Row>
                      <Col>
                        <Form.Control
                          placeholder={CommonConstant.INTRVAL_IN_SEC}
                          onChange={(e) => setInterval(e.target.value * 10)}
                        />
                      </Col>
                      <Col>
                        {progress !== 0 && (
                          <label>Creating GIF... {progress}%</label>
                        )}
                        <Button
                          className="float-end"
                          variant="primary"
                          onClick={handleCreateGIF}
                          disabled={
                            interval < 1 || images.length !== numberofImage
                          }
                        >
                          {CommonConstant.CREATE_GIF}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  <div className="mt-4 download-position">
                    <Button
                      variant="success"
                      onClick={handleDownload}
                      disabled={!createdGif}
                    >
                      {CommonConstant.DOWNLAOD}{" "}
                      <FontAwesomeIcon icon={faDownload} />
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddImageCard;
