import React from "react";

export interface ComponentLocation {
  left: number;
  top: number;
}

export interface ComponentStyle extends ComponentLocation {
  width: number;
  height: number;
}

export interface InnerHTML {
  __html: string;
}

export interface ResizeProps extends ComponentStyle {
  children?: React.ReactElement;
}

export interface ComponentSize {
  width: number;
  height: number;
}

export interface EditorProps extends ComponentStyle {
  parentStyle?: ComponentSize;
  unit: string;
}

export type Dispatcher<S> = React.Dispatch<React.SetStateAction<S>>;
