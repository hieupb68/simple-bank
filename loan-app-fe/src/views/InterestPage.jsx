import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import InterestDecreaseTable from "./InterestDecreaseTable";

const InterestPage = () => {
  const { id } = useParams();
  const [decrease, setDecrease] = useState();
  const [based, setBased] = useState();

  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState("auto");

  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      const contentHeight = element.scrollHeight; // Get total content height
      console.log(contentHeight, window.innerHeight);
      if (contentHeight < window.innerHeight) {
        // Compare to viewport height
        setContainerHeight("calc(100vh - 70px)"); // Switch to auto if larger
      }
    }
  }, [decrease]);

  useEffect(() => {
    const fetchInterestDecrease = async (userId) => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://localhost:8080/api/loanApplications/interest/decrease/" +
            userId,
          requestOptions
        );
        const result = await response.json();
        setDecrease(result);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchInterestBased = async (userId) => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://localhost:8080/api/loanApplications/interest/based/" + userId,
          requestOptions
        );
        const result = await response.json();
        setBased(result);
      } catch (error) {
        console.error(error);
      }
    };

    async function fetchData() {
      // Async function inside useEffect
      try {
        await fetchInterestDecrease(id);
        await fetchInterestBased(id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]);
  return (
    <div
      style={{
        height: containerHeight,
        background:
          "linear-gradient(90deg, rgba(55,59,68,1) 0%, rgba(66,134,244,1) 100%)",
      }}
      ref={containerRef}
    >
      <div className="p-3 d-flex justify-content-center">
        {decrease && <InterestDecreaseTable data={decrease} />}
      </div>
    </div>
  );
};

export default InterestPage;
