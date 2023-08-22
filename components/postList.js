import React from "react";
import PostItem from "./postItem";
// import TagLink from "./tagLink";
import Pagination from "./pagination";
// import TagButton from "./tagButton";

export default function PostList({ posts, tags, pagination }) {
  return (
    <div className={"container blog-home-container"}>
      <div className={"posts"}>
        <ul className={"post-list"}>
          {posts?.map((it, i) => (            
            <li key={i}>
              <PostItem post={it} />
            </li>
          ))}
        </ul>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={{
            href: (page) => (page === 1 ? "/guide" : "/guide/page/[page]"),
            as: (page) => (page === 1 ? null : "/guide/page/" + page),
          }}
        />
      </div>
      <ul className={"categories"}>
      </ul>      
    </div>
  );
}
