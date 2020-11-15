export const Content = ({ content }) => (
  <main>
    {content}
    <style jsx global>{`
      .remark-code-title {
        width: 100%;
        background: #edf2f6;
        padding: 6px 8px;
        border: 1px solid;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        border-bottom: 0;
        border-color: rgb(225, 228, 232);
        font-size: 12px;
        color: rgb(36, 41, 46);
        font-weight: 700;
      }
      .remark-code-title + pre {
        border-top-left-radius: 0px !important;
        border-top-right-radius: 0px !important;
        margin-top: 0px !important;
      }

      pre[class*='language-'] {
        box-sizing: border-box;
        padding: 14px;
        border: 1px solid;
        border-radius: 8px;
        border-color: rgb(225, 228, 232);
        width: 100%;
        background: #f8fafc;
        margin-bottom: 2rem;
      }
      code[class*='language-'] {
        font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
          monospace;
      }
      .mdx-marker {
        background: #f0fff4;
        margin-left: -14px;
        margin-right: -14px;
        padding: 0 14px;
        border-left: 3px solid #47bc78;
      }

      pre[class*='language-'],
      code[class*='language-'] {
        font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
          monospace;
        color: #393a34;
        direction: ltr;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        font-size: 12px;
        line-height: 20px;

        tab-size: 4;
        hyphens: none;
      }

      /* Inline code */
      :not(pre) > code[class*='language-'] {
        background-color: rgba(27, 31, 35, 0.05);
        padding: 0.2em 0.4em;
        border-radius: 3px;
        font-size: 85%;
      }

      .token.keyword,
      .token.operator,
      .token.script > .token.script-punctuation {
        color: #d73a49;
      }

      .token.function,
      .token.script > .token.keyword,
      .token.constant,
      .token.number,
      .token.boolean {
        color: #005cc5;
      }

      .token.string,
      .token.attr-value {
        color: #032f62;
      }

      .token.punctuation + .token.function:not(.function-variable),
      .token.attr-name {
        color: #6f42c1;
      }

      .token.comment {
        color: #6a737d;
      }

      .token.tag {
        color: #22863a;
      }

      .token.script,
      .token.punctuation {
        color: #24292e;
      }

      .token.important,
      .token.bold {
        font-weight: bold;
      }

      .token.italic {
        font-style: italic;
      }
    `}</style>
  </main>
)
