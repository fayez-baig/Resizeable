import { Dispatcher } from "./ui";

export interface ClickState {
  isClicked: boolean;
  onClicked: Dispatcher<boolean>;
}
