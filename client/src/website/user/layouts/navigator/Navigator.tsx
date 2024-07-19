import { NavLink } from 'react-router-dom'
import Logo from '../../../../assets/logos/1.png'
import './css/style.css'
import { BiBullseye, BiLibrary, BiMusic } from 'react-icons/bi'

export default function Navigator() {
  return (
    <div className='p-4'>
        {/* logo */}
        <div>
            <img src={Logo} alt="" />
        </div>
        {/* nav list*/}
        <nav className='nav-list flex flex-col gap-2'>
            <NavLink to={"/"}><BiMusic/>Âm nhạc</NavLink>
            <NavLink to={"/library"}><BiLibrary/>Thư viện</NavLink>
            <NavLink to={"/livestream"}><BiBullseye/>Livestream</NavLink>
        </nav>
    </div>
  )
}
