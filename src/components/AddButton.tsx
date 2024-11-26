import { FiBookOpen } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function AddButton() {
    const navigate = useNavigate();
    const goToAdd = () => {
        navigate("/add")
    }
  return (
    <button onClick={goToAdd} className="fixed bottom-10 right-6 text-[32px] text-white p-3 bg-red-950 hover:bg-red-400 rounded-full z-50"><FiBookOpen/></button>
  )
}

export default AddButton;