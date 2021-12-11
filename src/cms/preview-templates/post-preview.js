// @flow strict
import React from "react";
import type { Entry, WidgetFor } from "../../types";
import styles from '../../components/Post/Post.module.scss';

type Props = {
  entry: Entry,
  widgetFor: WidgetFor,
};

const PostPreview = ({ entry, widgetFor }: Props) => {
  const body = widgetFor("body");
  const title = entry.getIn(["data", "title"]);

  return (
    <div className={styles['post']}>
      <Link className={styles['post__home-button']} to="/">All Articles</Link>

      <div className={styles['post__content']}>
        <Content body={body} title={title} />
      </div>

    </div>
  );
};

export default PostPreview;
