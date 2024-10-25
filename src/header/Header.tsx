import { useNavigate } from "react-router-dom"

function Header() {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/loginhome');
    }
  return (
    <div className='w-full h-[46px] bg-[#3A0000] flex'>
        <button onClick={goToLogin} className='text-white ml-auto mr-4'>log in</button>
    </div>
  )
}

export default Header