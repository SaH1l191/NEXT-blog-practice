import  Link  from "next/link";

export default function Home() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-violet-600 to-indigo-600">
        <div className='container flex flex-col items-center justify-center mx-auto'>
        <h2 className="mb-4 text-4xl font-bold text-white">Browse Our Blog Collections</h2>
        <Link
          className="px-6 py-2 text-sm font-semibold text-blue-700 bg-white rounded"
          href={"/blogs"}
        >
          Explore Blogs
        </Link>
          
        </div>
        
    </div>
  );
}