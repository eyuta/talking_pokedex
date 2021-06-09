import { useState, useEffect } from "react";

function getWindowDimensions() {
  const _window =
    typeof window !== "undefined" ? window : { innerWidth: 0, innerHeight: 0 };
  const { innerWidth: width, innerHeight: height } = _window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export const getGridSize = () => {
  const breakpoints = {
    sm: 320,
    md: 768,
    lg: 960,
    xl: 1200,
  };
  const { width } = useWindowDimensions();
  const innerWidth = width - 8 * 2;
  const columnCount = width < breakpoints.md ? 2 : width < breakpoints.lg ? 4 : 5;
  const columnWidth = innerWidth / columnCount;
  const rowHeight = columnWidth + 40
  console.log("width\t",width)
  console.log("innerWidth\t",innerWidth)
  console.log("columnCount\t",columnCount)
  console.log("columnWidth\t",columnWidth)
  console.log("rowHeight\t",rowHeight)
  return { columnCount, columnWidth, rowHeight };
};
