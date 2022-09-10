import { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../features/titleSlice";

const useTitle = (ele: ReactElement | string, title?: string) => {
  const element =
    typeof ele === "string" ? (
      <h1
        style={{
          fontSize: "30px",
          margin: 0,
        }}
        className="self-center"
      >
        {ele}
      </h1>
    ) : (
      ele
    );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setTitle({
        title: element,
      })
    );
    document.title = title || "Sapo Web";
  }, [dispatch, ele, title]);
};

export default useTitle;
