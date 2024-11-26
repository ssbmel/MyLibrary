interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ children, type = 'button' }) => {
  return (
    <button
      type={type}
      className="w-[50%] bg-red-950 text-white p-[6px] rounded-sm"
    >
      {children}
    </button>
  );
}

export default Button;
