import { Button } from '@material-tailwind/react'
import React, { useContext } from 'react'
import myContext from '../../context/data/myContext';
import { useNavigate } from 'react-router';

function BlogPostCard() {
  const context = useContext(myContext);
  const { mode, getAllBlog } = context;

  const navigate = useNavigate();

  // Reverse blogs to get the most recent ones first and then slice to get the top 3
  const recentBlogs = [...getAllBlog].reverse().slice(0, 3);

  return (
    <div>
      <div>
        <p
          style={{
            color: mode === 'dark' ? 'white' : 'black',
            fontSize: '2.5rem', // Adjust the font size as needed
            marginLeft: '1in', // 1-inch left margin
            fontWeight: 'bold', // Make the font bold
            textAlign: 'left', // Ensures text alignment to the left
            margin: '0.5in 0 0 1in' // apply top and left margin 1 inch
          }}
          className="sm:text-3xl text-xl"
        >
          Latest Post
        </p>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl ">

          {/* Main Content  */}
          <div className="flex flex-wrap justify-center -m-4 mb-5">
            {/* Card 1  */}
            {recentBlogs.length > 0
              ?
              <>
                {recentBlogs.map((item, index) => {
                  const { thumbnail, id, date } = item;
                  console.log(item);
                  return (
                    <div className="p-4 md:w-1/3" key={index}>
                      <div
                        style={{
                          background: mode === 'dark'
                            ? 'rgb(30, 41, 59)'
                            : 'white',
                          borderBottom: mode === 'dark'
                            ? '4px solid rgb(226, 232, 240)'
                            : '4px solid rgb(30, 41, 59)'
                        }}
                        className={`h-full shadow-lg hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
                          ${mode === 'dark' ? 'shadow-gray-700' : 'shadow-xl'}
                          rounded-xl overflow-hidden`}
                      >
                        {/* Blog Thumbnail  */}
                        <img onClick={() => navigate(`/bloginfo/${id}`)} className="w-full" src={thumbnail} alt="blog" />

                        {/* Top Items  */}
                        <div className="p-6">
                          {/* Blog Date  */}
                          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{
                            color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)'
                          }}>
                            {date}
                          </h2>

                          {/* Blog Title  */}
                          <h1 className="title-font text-lg font-bold text-gray-900 mb-3" style={{
                            color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)'
                          }}>
                            {item.blogs.title}
                          </h1>

                          {/* Blog Category  */}
                          <h4 className="title-font text-lg text-gray-900 mb-3" style={{
                            color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)'
                          }}>
                            {item.blogs.category}
                          </h4>
                          <h6>Created By: {item.blogs.content} </h6>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
              :
              <>
                <h1 className='text-xl font-bold'>Not Found</h1>
              </>
            }
          </div>

          {/* See More Button  */}
          <div className="flex justify-center my-5">
            <Button
              onClick={() => navigate('/allblogs')}
              style={{
                background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)'
              }}>
              See More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPostCard;
