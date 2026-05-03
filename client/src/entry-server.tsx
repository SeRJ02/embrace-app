import { renderToString } from "react-dom/server";
import { LandinPage } from "./pages/LandinPage";

export function render(_url: string): string {
  return renderToString(<LandinPage />);
}
