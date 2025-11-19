import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-nml-green text-white hover:bg-emerald-600 focus:ring-nml-green shadow-lg hover:shadow-xl",
    secondary: "bg-nml-blue text-white hover:bg-blue-700 focus:ring-nml-blue shadow-md",
    outline: "border-2 border-slate-200 text-slate-600 hover:border-nml-green hover:text-nml-green bg-transparent",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;