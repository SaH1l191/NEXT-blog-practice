import connectToDB from "@/app/database";
import Blog from "@/app/models/blog";
import { NextResponse } from "next/server";


export async function DELETE(req){
    try{
        await connectToDB()
        const {searchParams} = new URL(req.url)
        const getCurrentBLogId = searchParams.get("id")

    if(!getCurrentBLogId){
        return NextResponse.json({
            success:false,
            message : 'BLog ID is required'
        })
    }
    const deleteCurrentBlogById = await Blog.findByIdAndDelete(getCurrentBLogId)
    if(deleteCurrentBlogById){
        return NextResponse.json({
            success:false,
            message : 'BLog is deleted successfully '
        })
    }else {
        return NextResponse.json({
            success: false,
            message: 'Blog not found'
        }, { status: 404 });
    }
    }
    catch(error){
        console.log("Error in delete blog route: " + error);    
        return NextResponse.json({
            success:false,
            message:"something went wrong pls ease try again later"
        })
    }
}