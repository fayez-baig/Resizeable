import { DIRECTION } from "../constants/location";
import { ComponentLocation, ComponentSize, ComponentStyle } from "../types/ui";

interface NewComponentStyle {
  newLeft: number;
  newTop: number;
  newWidth: number;
  newHeight: number;
}

interface ClientLocation {
  clientX: number;
  clientY: number;
}

interface ComponentPosition extends ComponentLocation {
  bottom: number;
  right: number;
}

const getBoundingZone = ({
  left = 0,
  top = 0,
  width = 0,
  height = 0,
}: ComponentStyle): ComponentPosition => {
  const right = left + width;
  const bottom = top + height;

  return { left, top, right, bottom };
};

export const getBoundPosition = (
  clientX: number,
  clientY: number,
  x: number,
  y: number,
  width?: number,
  height?: number,
  parentLocation?: ComponentSize
): ComponentLocation => {
  let currentX: number = clientX - x;
  let currentY: number = clientY - y;

  if (!parentLocation || !width || !height) {
    return { left: currentX, top: currentY };
  }

  const { width: parentWidth, height: parentHeight } = parentLocation;

  const { right: currentRight, bottom: currentBottom } = getBoundingZone({
    left: currentX,
    top: currentY,
    width,
    height,
  });

  if (currentX < 0.1) {
    currentX = 0.1;
  }

  if (currentY < 0.1) {
    currentY = 0.1;
  }

  if (currentRight > parentWidth) {
    currentX = parentWidth - width;
  }

  if (currentBottom > parentHeight) {
    currentY = parentHeight - height;
  }

  return { left: currentX, top: currentY };
};

export const changeComponentLocationByHandler = (
  handlerType: string,
  left: number,
  top: number,
  width: number,
  height: number,
  differenceX: number,
  differenceY: number,
  parentLocation?: ComponentSize
): NewComponentStyle => {
  let newLeft: number = left;
  let newTop: number = top;
  let newWidth: number = width;
  let newHeight: number = height;

  switch (handlerType) {
    case DIRECTION.TOP_LEFT:
      newLeft += differenceX;
      newTop += differenceY;
      newWidth -= differenceX;
      newHeight -= differenceY;

      break;
    case DIRECTION.TOP_RIGHT:
      newTop += differenceY;
      newWidth += differenceX;
      newHeight -= differenceY;

      break;
    case DIRECTION.BOTTOM_LEFT:
      newLeft += differenceX;
      newWidth -= differenceX;
      newHeight += differenceY;

      break;
    case DIRECTION.BOTTOM_RIGHT:
      newWidth += differenceX;
      newHeight += differenceY;

      break;
    default:
      break;
  }

  if (!parentLocation) {
    return {
      newLeft,
      newTop,
      newWidth,
      newHeight,
    };
  }

  const { width: parentWidth, height: parentHeight } = parentLocation;

  if (newLeft < 0.1) {
    newLeft = 0.1;
  }

  if (newTop < 0.1) {
    newTop = 0.1;
  }

  if (newLeft + newWidth > parentWidth) {
    newWidth = parentWidth - newLeft;
  }

  if (newTop + newHeight > parentHeight) {
    newHeight = parentHeight - newTop;
  }

  return {
    newLeft,
    newTop,
    newWidth,
    newHeight,
  };
};

export const convertPointsByUnit = (
  unit: string,
  x: number,
  y: number
): ClientLocation => {
  let clientX: number = x;
  let clientY: number = y;

  switch (unit) {
    case "rem":
      clientX = clientX * 0.0625;
      clientY = clientY * 0.0625;

      break;
    default:
      break;
  }

  return { clientX, clientY };
};

export const generateHtml = (text: string): string => {
  return `<p>${text}<p>`;
};
