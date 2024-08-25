"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



export default function AddNewBlog(
    {currentEditedBlogID, handleSaveBlogData, openDialog, setOpenDialog, blogFormData, setBlogFormData,setCurrentEditedBlogId, loading, setLoading }) {





    return (
        <div className='flex items-center justify-center space-y-3'>
          
            <div className='m-4'>
                <Dialog open={openDialog} onOpenChange={() => {
                    setOpenDialog(false);
                    setBlogFormData({
                        title: "",
                        description: "",
                    });
                    setCurrentEditedBlogId(null)
                }} >

                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{currentEditedBlogID  ? 'Edit Blog ' :'Add Blog'} </DialogTitle>
                            <DialogDescription>
                                Enter title and description to create new Blog
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid items-center grid-cols-4 gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Feeling Excited"
                                    className="col-span-3"
                                    value={blogFormData.title}
                                    onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                                />
                            </div>
                            <div className="grid items-center grid-cols-4 gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    placeholder="Watermelon"
                                    className="col-span-3"
                                    value={blogFormData.description}
                                    onChange={(e) => setBlogFormData({ ...blogFormData, description: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleSaveBlogData}>Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div>
                <Button onClick={() => { setOpenDialog(true) }}>Add New Blog</Button>
            </div>
            
        </div >

    )
}

