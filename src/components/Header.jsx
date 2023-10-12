import { FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Header() {

    const { currentUser } = useSelector((state) => state.user)

  return (
    <header className=" bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                <span className="text-slate-500">Smart</span>
                <span className="text-slate-700">Estate</span>
            </h1>
            <form action="" className="bg-slate-100 p-3 rounded-lg flex justify-between items-center"> 
                <input type="text" placeholder="Search..." className=" bg-transparent focus:outline-none W-24 sm:w-64"/>
                <FaSearch className='text-slate-600' />
            </form>

            <ul className='flex gap-x-4 font-semibold'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>
                    <Link to={"/"}>Home</Link>
                </li>
                <li className='hidden sm:inline text-slate-700 hover:underline'>
                    <Link to={"/about"}>About</Link>
                </li>
                <Link to='/profile'>
                    {
                        currentUser? (
                            <img className='rounded-full w-7 h-7 object-cover' src={currentUser.profilePicture} alt="profile_photo" />
                        ): (
                            <li className='text-slate-900 hover:underline'>Sign In</li>
                        )
                    }
                </Link>
            </ul>
        </div>
    </header>
  )
}
