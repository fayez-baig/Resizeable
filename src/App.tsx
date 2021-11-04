import React from "react";
import { TextEditorBlock } from "./index";
const App = () => {
  return (
    <TextEditorBlock
      width={16.5}
      height={7}
      top={3}
      left={5.5}
      unit={"rem"}
      initialText={"Change Me"}
      initialFontColor={"#000"}
      initialFontSize={0.5}
      initialFontName={"Roboto"}
      initialFontStyle={"Roboto"}
    />
  );
};

export default App;
