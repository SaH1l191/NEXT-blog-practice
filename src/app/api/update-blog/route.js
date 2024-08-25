import connectToDB from "@/app/database"
import Blog from "@/app/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server"

const EditBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});


export async function PUT(req) {
    try {
        await connectToDB()
        const { searchParams } = new URL(req.url);
        const getCurrentBlogID = searchParams.get("id");

        if (!getCurrentBlogID) return NextResponse({
            success: false,
            message: "Blog ID not found "
        })


        const { title, description } = await req.json();

        const { error } = EditBlog.validate({
            title, description
        })
        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            })
        }
        const updatedBlogsByBlogId = await Blog.findByIdAndUpdate({
            _id: getCurrentBlogID
        }, { title, description }, { new: true })

        if (updatedBlogsByBlogId) {
            return NextResponse.json({
                success: true,
                message: 'BLog is updated successfully',
                
            })
        } else {
            return NextResponse.json({
                success: false,
                message: 'BLog is not updated successfully'
            })
        }



    }
    catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: 'Something went wrong'
        })
    }
}