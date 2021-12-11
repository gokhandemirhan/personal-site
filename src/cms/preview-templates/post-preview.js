// @flow strict
import React from "react";
import type { Entry, WidgetFor } from "../../types";
import { PostTemplate } from "../../templates/post-template";

type Props = {
  entry: Entry,
  widgetFor: WidgetFor,
};

const PostPreview = ({ entry, widgetFor }: Props) => {
  const body = widgetFor("body");
  const title = entry.getIn(["data", "title"]);
  const tags = entry.getIn(["data", "tags"]);
  const description = entry.getIn(["data", "description"]);
  const data = {
    markdownRemark: {
      frontmatter: {
        description: description,
        tags: tags,
        title: title,
      },
      html: body,
    },
  };

  return <PostTemplate data={data} />;
};

export default PostPreview;
