// POST api route 
import connectToDB from "@/app/database";
import Joi from "joi";
import { NextResponse } from "next/server"
import Blog from "@/app/models/blog";


const AddNewBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  });

export async function POST(req){
    try{
        await connectToDB()
        const extractBlogData = await req.json()
        const {title , description} = extractBlogData;

        const {error} = AddNewBlog.validate({title , description});
        if(error){
            return NextResponse({
                success:false,
                message: error.details[0].message
                // message: error
            })
        }
        const newCreatedBlog = await Blog.create(extractBlogData)
        if(newCreatedBlog){
            return NextResponse.json({
                    success:true,
                     data:{title , description},
                     message : "Blog created successfully ..."
                })
        }

    }
    catch(error){
        console.log("Error: " + error)
        return NextResponse.json({success:false, message :"Something went wrong ..."},500); 
    }
}