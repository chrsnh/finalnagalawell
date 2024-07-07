import React, { useState, useContext, useEffect } from 'react';
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp, deleteDoc } from "firebase/firestore";
import myContext from "../../context/data/myContext";
import { useParams } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import Comment from "../../components/comment/Comment";
import toast from "react-hot-toast";

function BlogInfo() {
    const context = useContext(myContext);
    const { mode, setloading, loading } = context;
    const params = useParams();

    const [getBlogs, setGetBlogs] = useState();
    const [fullName, setFullName] = useState('');
    const [commentText, setCommentText] = useState('');
    const [allComment, setAllComment] = useState([]);

    const getAllBlogs = async () => {
        setloading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "blogPost", params.id));
            if (productTemp.exists()) {
                setGetBlogs(productTemp.data());
            } else {
                console.log("Document does not exist");
            }
            setloading(false);
        } catch (error) {
            console.log(error);
            setloading(false);
        }
    };

    useEffect(() => {
        getAllBlogs();
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        getcomment();
    }, []);

    const createMarkup = (html) => ({ __html: html });

    const addComment = async () => {
        if (!fullName || !commentText) {
            toast.error('Please fill in all required fields.');
            return;
        }

        const commentRef = collection(fireDB, `blogPost/${params.id}/comment`);
        try {
            await addDoc(commentRef, {
                fullName,
                commentText,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }),
            });
            toast.success('Comment Added Successfully');
            setFullName('');
            setCommentText('');
        } catch (error) {
            console.log(error);
            toast.error('Failed to add comment.');
        }
    };

    const getcomment = async () => {
        try {
            const q = query(
                collection(fireDB, `blogPost/${params.id}/comment`),
                orderBy('time')
            );
            onSnapshot(q, (querySnapshot) => {
                let comments = [];
                querySnapshot.forEach((doc) => {
                    comments.push({ ...doc.data(), id: doc.id });
                });
                setAllComment(comments);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const deleteComment = async (id) => {
        try {
            await deleteDoc(doc(fireDB, `blogPost/${params.id}/comment`, id));
            toast.success('Comment deleted successfully');
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete comment.');
        }
    };

    return (
        <Layout>
            <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4">
                <div className="py-4 lg:py-8">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div>
                            {/* Thumbnail */}
                            <img
                                alt="content"
                                className="mb-3 rounded-lg h-full w-full"
                                src={getBlogs?.thumbnail}
                            />
                            {/* Title And Date */}
                            <div className="flex justify-between items-center mb-3">
                                <h1
                                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                                    className='text-xl md:text-2xl lg:text-2xl font-semibold'
                                >
                                    {getBlogs?.blogs?.title}
                                </h1>
                                <p style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                                    {getBlogs?.date}
                                </p>
                            </div>
                            <div className={`border-b mb-5 ${mode === 'dark' ? 'border-gray-600' : 'border-gray-400'}`} />
                            {/* Blog Content */}
                            <div className="category" style={{ color: mode === 'dark' ? 'white' : 'black', textAlign: 'justify' }}>
                                <div dangerouslySetInnerHTML={createMarkup(getBlogs?.blogs?.category)}></div>
                            </div>
                        </div>
                    )}

                    {/* Comment Section */}
                    <Comment
                        addComment={addComment}
                        commentText={commentText}
                        setcommentText={setCommentText}
                        allComment={allComment}
                        setAllComment={setAllComment}
                        deleteComment={deleteComment}
                        fullName={fullName}
                        setFullName={setFullName}
                    />
                </div>
            </section>
        </Layout>
    );
}

export default BlogInfo;
