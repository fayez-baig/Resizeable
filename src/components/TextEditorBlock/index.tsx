import React, { useState } from "react";

import { ComponentStyle, EditorProps } from "../../types/ui";
import { DIRECTIIONS } from "../../constants/location";
import EditorBlockWrapper from "../shared/EditorBlockWrapper";

import { generateHtml } from "../../utils/ui";
import ResizeHandlersWrapper from "../shared/ResizeHandlerWrapper";
import { INITIAL_TEXT } from "../../constants/ui";
import useMouseEvent from "../../hooks/useMouseEvent";
import useResize from "../../hooks/useResize";
import useText from "../../hooks/useText";
import TextEditor from "../TextEditor";

interface TextEditorBlockProps extends EditorProps {
  initialFontSize?: number;
  initialFontColor?: string;
  initialFontStyle?: string;
  initialText?: string;
  initialFontName?: string;
}

const TextEditorBlock: React.FC<TextEditorBlockProps> = ({
  left,
  top,
  width,
  height,
  parentStyle,
  unit,
  initialFontStyle,
  initialText,
  initialFontName,
}): React.ReactElement => {
  const innerHtml = initialText && generateHtml(initialText);
  const [html, setHtml] = useState(innerHtml || INITIAL_TEXT);
  const [componentStyle, setComponentStyle] = useState<ComponentStyle>({
    top,
    left,
    width,
    height,
  });

  const { handleMouseDown } = useResize({
    ...componentStyle,
    unit,
    onResize: setComponentStyle,
    resizeBoardOption: parentStyle,
  });

  const { isMouseOver, handleMouseLeave, handleMouseOver } = useMouseEvent();

  const {
    textRef,
    handleInputChange,
    innerHTML,
    isEditing,
    fontStyle,
    fontName,
  } = useText({
    html,
    onChange: setHtml,
    initialFontName,
    initialFontStyle,
    initialText,
  });

  return (
    <EditorBlockWrapper
      top={componentStyle.top}
      left={componentStyle.left}
      width={componentStyle.width}
      height={componentStyle.height}
      unit={unit}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {isMouseOver && (
        <>
          <ResizeHandlersWrapper>
            {DIRECTIIONS.map((item) => (
              <div
                key={item}
                className={item}
                onClick={handleMouseDown}
                onMouseDown={handleMouseDown}
              />
            ))}
          </ResizeHandlersWrapper>
        </>
      )}
      <TextEditor
        html={innerHTML}
        fontStyle={fontStyle}
        onChange={handleInputChange}
        componentRef={textRef}
        isEditing={isEditing}
        sliderValue={1}
        fontName={fontName}
        color={"#000"}
      />
    </EditorBlockWrapper>
  );
};

export default TextEditorBlock;
