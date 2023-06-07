import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./Card";
import "./slider-styles/card-slider.css";
import "../../index.css";
import SkeletonLoader from "../netflix/skeleton/SkeletonLoader";

const CardSlider = ({ title, data }) => {
  const listRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSVGClicked, setIsSVGClicked] = useState("");

  const handleCarousselDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    const totalItems = data.length - 3;

    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }

    if (direction === "right" && sliderPosition < totalItems - 1) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    } else if (direction === "right" && sliderPosition === totalItems - 1) {
      listRef.current.style.transform = "translateX(0)";
      setSliderPosition(0);
    }
  };
  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <div
      className="card__slider__container flex column"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        <div
          className={`slider-action left ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineLeft onClick={() => handleCarousselDirection("left")} />
        </div>

        <div className="flex slider-cont" ref={listRef}>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            data.map((movie, index) => (
              <Card
                movieData={movie}
                index={index}
                key={index}
                onSVGClick={() => {
                  setIsSVGClicked("");
                }}
              />
            ))
          )}
        </div>
        <div
          className={`slider-action right ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineRight onClick={() => handleCarousselDirection("right")} />
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
