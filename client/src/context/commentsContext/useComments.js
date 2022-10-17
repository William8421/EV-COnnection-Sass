import { useContext } from "react";
import { CommentsContext } from "./CommentsContext";

const useComments = () => {
  const context = useContext(CommentsContext);
  return context;
};

export default useComments;
