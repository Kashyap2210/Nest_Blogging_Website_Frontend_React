import axios, { AxiosResponse } from "axios"
import { IBlogEntity, IBlogLikesCounterEntity, IBlogResponse, ICommentEntity, LikeStatus } from "blog-common-1.0"
import React, { useState } from "react"
import { Link } from "react-router"
import { getJwt } from "../helpers/helper"

export default function BlogById() {
    const [formData, setFormData] = useState({
        blogId: 0
    })
    const [blog, setBlog] = useState<IBlogEntity | null>(null)
    const [comment, setComments] = useState<ICommentEntity[]>()
    const [likesAndDislikeEntities, setLikesAndDislikeEntities] = useState<IBlogLikesCounterEntity[]>()


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((previousData) => ({
            ...previousData,
            [name]: name === "blogId" ? Number(value) || 0 : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response: AxiosResponse<IBlogResponse> = await axios.get(
                `http://localhost:3000/api/blog/${formData.blogId}`, {
                headers: {
                    Authorization: `Bearer ${getJwt()}`
                }
            }
            )
            console.log("this is the response blog", response)

            setBlog(response.data.blog)

            console.log(response.data.comments)
            setComments(response.data.comments)

            console.log(response.data.likes)
            setLikesAndDislikeEntities(response.data.likes)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // console.log("this is the response", response)
                console.error(error.response?.data); // Log the backend error response
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }

    const totalLikes = likesAndDislikeEntities?.filter((entity) => entity.likedStatus === LikeStatus.LIKED)
    const totalDisLikes = likesAndDislikeEntities?.filter((entity) => entity.likedStatus === LikeStatus.DISLIKED)

    const likeBlog = async () => {
        // e.preventDefault()
        console.log("inside the like function")
        try {
            const likeResponse: AxiosResponse<IBlogLikesCounterEntity> = await axios.post(
                `http://localhost:3000/api/likes-counter-blogs/`, {
                blogId: blog?.id,
                likedStatus: LikeStatus.LIKED
            }, {
                headers: {
                    Authorization: `Bearer ${getJwt()}`
                }
            }
            )
            setLikesAndDislikeEntities((prevLikes) => [...(prevLikes || []), likeResponse.data]);
            handleSubmit({ preventDefault: () => { } } as React.FormEvent<HTMLFormElement>);
            console.log("this is the like response", likeResponse)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error.response?.data)
            } else {
                console.log("this is hte error", error)
            }
        }
    }
    const dislikeBlog = async () => {
        // e.preventDefault()
        console.log("inside the like function")
        try {
            const likeResponse: AxiosResponse<IBlogLikesCounterEntity> = await axios.post(
                `http://localhost:3000/api/likes-counter-blogs/`, {
                blogId: blog?.id,
                likedStatus: LikeStatus.DISLIKED
            }, {
                headers: {
                    Authorization: `Bearer ${getJwt()}`
                }
            }
            )
            setLikesAndDislikeEntities((prevLikes) => [...(prevLikes || []), likeResponse.data]);
            handleSubmit({ preventDefault: () => { } } as React.FormEvent<HTMLFormElement>);
            console.log("this is the like response", likeResponse)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error.response?.data)
            } else {
                console.log("this is hte error", error)
            }
        }
    }



    return <>
        <form onSubmit={handleSubmit}>
            <input type="text"
                placeholder="Blog Id"
                name="blogId"
                value={formData?.blogId}
                onChange={handleChange} />
            <br /><br />
            <button type="submit">Get Blog</button>
        </form>
        <br /><br /><br /><br />
        <button>
            <Link to="/api">Go To HomePage</Link>
        </button>
        <br /><br /><br /><br />
        <hr />
        {blog && (
            <div>
                <h1>{blog.title}</h1>
                <h3>{blog.keywords}</h3>
                <h4>{blog.content}</h4>
                <h5>{blog.author}</h5>
                {/* <h6>{blog.createdBy}</h6> */}
            </div>
        )}
        <br /><br />
        <hr />
        <h2>Comments</h2>
        {comment && comment.map((mapping) => (
            <div key={mapping.id}>
                <h3>{mapping.text}</h3>
                <h4>{mapping.authorId}</h4>
            </div>
        ))}
        <br /><br />
        <hr />
        {likesAndDislikeEntities &&
            <div >

                <h4>Total Likes: {totalLikes?.length}</h4>
                <h4>Total DisLikes: {totalDisLikes?.length}</h4>
            </div>
        }

        <button onClick={likeBlog}>Like</button><br /><br />
        <button onClick={dislikeBlog}>Dislike</button>

    </>
}