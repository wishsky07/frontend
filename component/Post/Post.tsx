import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
    id: number;
    title: string;
    author: {
        name: string;
        email: string;
    } | null;
    content: string;
    published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
    const authorEmail = post.author ? post.author.email : "Unknown author";

    return (

        <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
            <h2>{post.title}</h2>
            <small>By {authorEmail}</small>
            <br />
            <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
    );
};

export default Post;