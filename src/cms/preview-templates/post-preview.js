// @flow strict
import React from "react";
import type { Entry, WidgetFor } from "../../types";

import "./main.css";

type Props = {
  entry: Entry,
  widgetFor: WidgetFor,
};

const PostPreview = ({ entry, widgetFor }: Props) => {
  const body = widgetFor("body");
  const title = entry.getIn(["data", "title"]);

  return (
    <div className="post">
      <div className="post__content">
        <div className="content">
          <h1 className="content__title">{title}</h1>
          <div className="content__body">{body}</div>
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
