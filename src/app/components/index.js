'use client'

import { useState, useEffect } from "react";
import AddNewBlog from "./add-new-blog";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function BlogOverview({ blogList }) {


    const [openBlogDialog, setOpenBlogDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [blogFormData, setBlogFormData] = useState({
        title: "",
        description: "",
    })
    const [currentEditedBlogID , setCurrentEditedBlogId] = useState(null)

    // console.log(blogFormData)

    //initial render
    const router = useRouter()

    useEffect(() => {
        router.refresh()
    }, [])



    async function handleSaveBlogData() {

        try {
            setLoading(true)
            const apiResponse = currentEditedBlogID!=null? 
            await fetch(`/api/update-blog?id=${currentEditedBlogID}`,{
                method:'PUT',
                body:JSON.stringify(blogFormData)
            }) : 
            await fetch('/api/add-blog', {
                method: 'POST',
                body: JSON.stringify(blogFormData),
            })
            const result = await apiResponse.json()
            console.log(result)
        }
        catch (error) {
            console.log(error);
            setBlogFormData({ title: "", description: "" })
        }
        setLoading(false)
        //
        setCurrentEditedBlogId(null)
        // to show new blogs added funcitonality
        router.refresh()
    }

    async function handleDeleteBlogById(currentId) {
        try {
            const apiResponse = await fetch(`/api/delete-blog?id=${currentId}`, {
                method: 'DELETE',
            })
            

        }
        catch (error) {
            console.log("Error", error);

        }
        router.refresh()
    }
    async function handleEdit(currentId){
        setCurrentEditedBlogId(currentId._id)
        setBlogFormData({
            title:currentId.title,
            description:currentId.description
        })
        setOpenBlogDialog(true)
        
    }
    console.log(currentEditedBlogID);
    return (
        <div className="flex-col items-center justify-center min-h-screen p-10 bg-gradient-to-r from-violet-600 to-indigo-600">
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {blogList && blogList.length > 0 ? (
                    blogList.map((item, index) => (
                        <Card key={index}>
                            <CardContent>
                                <CardTitle className='p-5 mb-5 '>
                                    {item?.title || "Untitled"}
                                </CardTitle>
                                <CardDescription>
                                    Description: <br></br>
                                    {item?.description || ""}
                                </CardDescription>
                                <div className="flex items-center gap-5 mt-5">
                                    <Button onClick={()=>{
                                        handleEdit(item)
                                    }}>Edit</Button>
                                    <Button onClick={() => {
                                        handleDeleteBlogById(item._id)
                                    }}>Delete</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p>No blogs available.</p>
                )}
            </div>

            <AddNewBlog
                openDialog={openBlogDialog}
                setOpenDialog={setOpenBlogDialog}
                blogFormData={blogFormData}
                handleSaveBlogData={handleSaveBlogData}
                setBlogFormData={setBlogFormData}
                loading={loading}
                setLoading={setLoading} 
                currentEditedBlogID = {currentEditedBlogID}
                setCurrentEditedBlogId={setCurrentEditedBlogId}
                />
                
        </div>
    )
}
export default BlogOverview