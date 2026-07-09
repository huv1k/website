import { createElement } from "react";
import type { ReactElement } from "react";

export type OGTemplateProps = {
  title: string;
  description: string;
  avatarUrl: string;
};

export function OGTemplate({ title, description, avatarUrl }: OGTemplateProps): ReactElement {
  return createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        padding: "80px",
        fontFamily: "'Space Mono', monospace",
      },
    },
    createElement(
      "div",
      {
        style: {
          display: "flex",
          fontSize: 64,
          fontWeight: 700,
          color: "#0a0a0a",
          marginBottom: 24,
          lineHeight: 1.2,
        },
      },
      title,
    ),
    createElement(
      "div",
      {
        style: {
          display: "flex",
          fontSize: 32,
          color: "#525252",
          flex: 1,
          lineHeight: 1.4,
        },
      },
      description,
    ),
    createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 40,
        },
      },
      createElement("img", {
        src: avatarUrl,
        width: 80,
        height: 80,
        style: { width: 80, height: 80, borderRadius: "50%", marginRight: 16 },
      }),
      createElement(
        "div",
        { style: { display: "flex", fontSize: 20, fontWeight: 700, color: "#0a0a0a" } },
        "Lukáš Huvar",
      ),
    ),
  );
}
