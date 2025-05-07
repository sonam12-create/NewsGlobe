import { useState } from "react";
import { Menu, X } from "lucide-react"; // For hamburger and close icons
import { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import { useNavigate } from "react-router-dom";
import { assets } from '../assets/assets'

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setQuery, userData, token, setToken } = useContext(NewsContext)
  console.log("User Data: ", userData)

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    console.log("Searching for:", search);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setQuery(e.target.value);
    console.log("Selected Category:", e.target.value);
  };


  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    navigate('/login')
}



  return (
    <nav className="bg-amber-200 p-4 shadow-md flex justify-between items-center relative">
      {/* Logo */}
      <div onClick={() => navigate('/')} className="text-black font-bold text-2xl">NewsGlobe</div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Search Bar */}
        <form className="flex">
          <input
            type="text"
            placeholder="Search News..."
            className="px-3 py-1 rounded-l-2xl border bg-white outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            type="submit"
            className="bg-red-300 text-black px-4 rounded-r-2xl"
          >
            Search
          </button>
        </form>

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={handleCategoryChange}
          className="px-5 py-1 rounded-2xl border bg-white outline-none"
        >
          <option value="">Categories</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="health">Health</option>
          <option value="entertainment">Entertainment</option>
          <option value="science">Science</option>
          <option value="world">World</option>
          <option value="politics">Politics</option>
        </select>

        {/* Create Account Button */}
        {/* <button onClick={() => navigate('/login')} className="bg-red-300 text-black font-semibold px-4 py-1 rounded-md hover:bg-blue-100">
          Create Account
        </button> */}

        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/notes")}
                  className="hover:text-black cursor-pointer">
                  Notes
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer bg-red-300 text-black border py-1 px-4 rounded-full hidden md:block">
            Create account
          </button>
        )}
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-amber-200 flex flex-col items-center space-y-4 p-4 shadow-md z-10">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex w-full">
            <input
              type="text"
              placeholder="Search News..."
              className="flex-1 px-3 py-1 rounded-l-2xl border bg-white outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="bg-red-300 text-black px-4 rounded-r-2xl"
            >
              Search
            </button>
          </form>

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={handleCategoryChange}
            className="px-5 py-1 rounded-2xl border bg-white outline-none w-full"
          >
            <option value="">Categories</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            <option value="sports">Sports</option>
            <option value="health">Health</option>
            <option value="entertainment">Entertainment</option>
            <option value="science">Science</option>
            <option value="world">World</option>
            <option value="politics">Politics</option>
          </select>

          {/* Create Account Button */}
          {/* <button
            onClick={() => navigate("/login")}
            className="bg-red-300 text-black font-semibold px-4 py-1 rounded-md hover:bg-blue-100 w-full"
          >
            Create Account
          </button> */}

{token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/notes")}
                  className="hover:text-black cursor-pointer">
                  Notes
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-red-300 text-black font-semibold px-4 py-1 rounded-md hover:bg-blue-100 w-full">
            Create account
          </button>
        )}

        </div>
      )}
    </nav>
  );
}

export default Navbar;
