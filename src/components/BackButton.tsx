interface BackButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const BackButton: React.FC<BackButtonProps> = ({ type, onClick, children }) => {

  return (
    <button type={type} onClick={onClick} className="w-[50%] bg-black text-white p-[6px] rounded-sm">
      {children}
    </button>
  );
}

export default BackButton;
