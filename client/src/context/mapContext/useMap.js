import { useContext } from "react";
import { MapContext } from "./MapContext";

const useMap = () => {
  const context = useContext(MapContext);
  return context;
};

export default useMap;
