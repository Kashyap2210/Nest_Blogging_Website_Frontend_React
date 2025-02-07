import axios, { AxiosResponse } from "axios"
import { IBlogEntityArray } from "blog-common-1.0"
import { getJwt } from "../helpers/helper"

export default function AllBlogs() {
    
    let blogIds: number[] = []
    const getAllBlogs = async () => {
        try {
            const allBlogs: AxiosResponse<IBlogEntityArray> = await axios.get(
                `http://localhost:3000/api/blog/`, {
                headers: {
                    Authorization: `Bearer ${getJwt()}`
                }
            }
            )
            console.log("this are all the blogs", allBlogs)
            blogIds = allBlogs.data.map((blog)=>blog.id)

            console.log("this are the all blogs", blogIds)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("this is the error", error.response?.data)
            };
        }
    }


    return <div>
        <button onClick={getAllBlogs}>Get All Blogs</button>
    </div>
}