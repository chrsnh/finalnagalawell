import React, { useState, useContext, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { BsFillArrowLeftCircleFill } from "react-icons/bs"
import myContext from '../../../context/data/myContext';
import { Link, useNavigate } from "react-router-dom";
import {
    Button,
    Typography,
} from "@material-tailwind/react";
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { fireDB, storage } from '../../../firebase/FirebaseConfig';
function CreateBlog() {
    const context = useContext(myContext);
    const { mode } = context;

    const [blogs, setBlogs] = useState({
        title: '',
        category: '',
        content: '',
        time: Timestamp.now(),
    });
    const [thumbnail, setthumbnail] = useState();

    const [text, settext] = useState('');
    console.log("Value: ",);
    console.log("text: ", text);

    const navigate = useNavigate();

    const addPost = async () => {
        // Validate required fields
        if (!blogs.title || !blogs.category || !blogs.content || !thumbnail) {
            toast.error('Please fill in all required fields.');
            return;
        }
        uploadImage();
    }

    const uploadImage = () => {
        if (!thumbnail) return;
        const imageRef = ref(storage, `blogimage/${thumbnail.name}`);
        uploadBytes(imageRef, thumbnail).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const productRef = collection(fireDB, "blogPost")
                try {
                    addDoc(productRef, {
                        blogs,
                        thumbnail: url,
                        time: Timestamp.now(),
                        date: new Date().toLocaleString(
                            "en-US",
                            {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                            }
                        )
                    })
                    navigate('/dashboard')
                    toast.success('Post Added Successfully');


                } catch (error) {
                    toast.error(error)
                    console.log(error)
                }
            });
        });
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Create markup function 
    function createMarkup(c) {
        return { __html: c };
    }

    return (
        <div className=' container mx-auto max-w-5xl py-6'>
            <div className="p-5" style={{
                background: mode === 'dark'
                    ? '#ffffff'
                    : 'rgb(255, 255, 255)',
            }}>
                {/* Top Item  */}
                <div className="mb-2 flex justify-between">
                    <div className="flex gap-2 items-center">
                        {/* Dashboard Link  */}
                        <Link to={'/dashboard'}>
                            <BsFillArrowLeftCircleFill size={25} />
                        </Link>

                        {/* Text  */}
                        <Typography
                            variant="h4"
                        >
                            Create blog
                        </Typography>
                    </div>
                </div>

                {/* main Content  */}
                <div className="mb-3">
                    {/* Thumbnail  */}
                    {thumbnail && <img className=" w-full rounded-md mb-3 "
                        src={thumbnail
                            ? URL.createObjectURL(thumbnail)
                            : ""}
                        alt="thumbnail"
                    />}

                    {/* Text  */}
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-semibold"
                    >
                        Upload Thumbnail
                    </Typography>

                    {/* First Thumbnail Input  */}
                    <input
                        type="file"
                        label="Upload thumbnail"
                        className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
                        }}
                        onChange={(e) => setthumbnail(e.target.files[0])}
                    />
                </div>

                {/* Second Title Input */}
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-semibold"
                >
                    Blog Title:
                </Typography>
                <div className="mb-3">
                    <input
                        label="Enter your Title"
                        className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${mode === 'dark'
                                ? 'placeholder-black'
                                : 'placeholder-black'}`}
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
                        }}
                        name="title"
                        value={blogs.title}
                        onChange={(e) => setBlogs({ ...blogs, title: e.target.value })}
                    />
                </div>

                {/* Third Category Input  */}
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-semibold"
                >
                    Blog Creator:
                </Typography>
                <div className="mb-3">
                    <input
                        label="Enter your Category"
                        className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${mode === 'dark'
                                ? 'placeholder-black'
                                : 'placeholder-black'}`}
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
                        }}
                        name="category"
                        value={blogs.content}
                        onChange={(e) => setBlogs({ ...blogs, content: e.target.value })}
                    />
                </div>


                {/* Third Category Input  */}
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-semibold"
                >
                    Blog Body:
                </Typography>
                <div className="mb-3">
                    <textarea
                        label="Enter your Category"
                        rows={15}
                        className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${mode === 'dark'
                                ? 'placeholder-black'
                                : 'placeholder-black'}`}
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
                        }}
                        name="category"
                        value={blogs.category}
                        onChange={(e) => setBlogs({ ...blogs, category: e.target.value })}
                    />
                </div>


                {/* Five Submit Button  */}
                <Button className=" w-full mt-5"
                    onClick={addPost}
                    style={{
                        background: mode === 'dark'
                            ? 'rgb(227, 115, 131)'
                            : 'rgb(227, 115, 131)',
                        color: mode === 'dark'
                            ? 'rgb(30, 41, 59)'
                            : 'rgb(226, 232, 240)'
                    }}
                >
                    Send
                </Button>
            </div >
        </div >
    )
}

export default CreateBlog