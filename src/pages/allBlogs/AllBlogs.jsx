import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

function AllBlogs() {
    const context = useContext(myContext);
    const { mode, getAllBlog } = context;

    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Reverse the blogs to have the latest one first
    const reversedBlogs = [...getAllBlog].reverse();

    const [expandedBlogs, setExpandedBlogs] = useState([]);

    // Function to toggle expanded state for a specific blog
    const toggleExpanded = (id) => {
        if (expandedBlogs.includes(id)) {
            setExpandedBlogs(expandedBlogs.filter(blogId => blogId !== id));
        } else {
            setExpandedBlogs([...expandedBlogs, id]);
        }
    };

    // Maximum number of rows to display for category text
    const MAX_CATEGORY_ROWS = 5;

    return (
        <Layout>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto max-w-7xl">
                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h1
                            className="text-center text-2xl font-bold"
                            style={{ color: mode === 'dark' ? 'white' : 'black' }}
                        >
                            All Blogs
                        </h1>
                    </div>
                    {/* Main Content  */}
                    <div className="flex flex-wrap justify-center -m-4 mb-5">
                        {/* Card 1  */}
                        {reversedBlogs.length > 0 ? (
                            reversedBlogs.map((item, index) => {
                                const { thumbnail, id, date } = item;
                                const { title, category } = item.blogs;
                                const isExpanded = expandedBlogs.includes(id);
                                const categoryRows = category.split('\n');
                                const truncatedCategory = categoryRows
                                    .slice(0, MAX_CATEGORY_ROWS)
                                    .join('\n');

                                return (
                                    <div className="p-4 md:w-1/3" key={index}>
                                        <div
                                            style={{
                                                background:
                                                    mode === 'dark'
                                                        ? 'rgb(30, 41, 59)'
                                                        : 'white',
                                                borderBottom:
                                                    mode === 'dark'
                                                        ? '4px solid rgb(226, 232, 240)'
                                                        : '4px solid rgb(30, 41, 59)',
                                            }}
                                            className={`h-full shadow-lg hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
                                                ${mode === 'dark'
                                                    ? 'shadow-gray-700'
                                                    : 'shadow-xl'
                                                } 
                                                rounded-xl overflow-hidden`}
                                        >
                                            {/* Blog Thumbnail  */}
                                            <img
                                                className="w-full"
                                                src={thumbnail}
                                                alt="blog"
                                            />

                                            {/* Top Items  */}
                                            <div className="p-6">
                                                {/* Blog Date  */}
                                                <h2
                                                    className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                                                    style={{
                                                        color:
                                                            mode === 'dark'
                                                                ? 'rgb(226, 232, 240)'
                                                                : 'rgb(30, 41, 59)',
                                                    }}
                                                >
                                                    {date}
                                                </h2>

                                                {/* Blog Title  */}
                                                <h1
                                                    className="title-font text-lg font-bold text-gray-900 mb-3"
                                                    style={{
                                                        color:
                                                            mode === 'dark'
                                                                ? 'rgb(226, 232, 240)'
                                                                : 'rgb(30, 41, 59)',
                                                    }}
                                                >
                                                    {title}
                                                </h1>

                                                {/* Blog Category  */}
                                                <div
                                                    className="text-lg text-gray-900 mb-3"
                                                    style={{
                                                        color:
                                                            mode === 'dark'
                                                                ? 'rgb(226, 232, 240)'
                                                                : 'rgb(30, 41, 59)',
                                                
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {isExpanded
                                                        ? category
                                                        : truncatedCategory}
                                                    {categoryRows.length >
                                                        MAX_CATEGORY_ROWS && (
                                                            <button
                                                                className="text-blue-500 hover:text-blue-600"
                                                                onClick={() =>
                                                                    toggleExpanded(
                                                                        id
                                                                    )
                                                                }
                                                            >
                                                                Read More
                                                            </button>
                                                        )}
                                                </div>
                                                <h6>
                                                    Created By: {item.blogs.content}
                                                </h6>
                                                <br />
                                                <div>
                                                    <Button
                                                        onClick={() => navigate(`/bloginfo/${id}`)}
                                                        style={{
                                                            background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                                                            color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)'
                                                        }}>
                                                        Read more
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <>
                                <h1 className="text-xl font-bold">Not Found</h1>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default AllBlogs;
