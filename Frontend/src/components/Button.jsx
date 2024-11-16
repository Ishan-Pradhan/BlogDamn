function Button({ children, onClick, disabled,icon,color, view, rounded="xl" }) {
    return (
      <button
        className={view==="small" ? `flex md:hidden bg-${color} w-full text-background  py-2 px-4 font-normal tracking-widest uppercase text-md rounded-${rounded} transition delay-50 hover:bg-${color}Tint hover:ease-in-out md:w-auto  gap-3 justify-center items-center `: `bg-${color} w-full text-background  py-2 px-4 font-normal tracking-widest uppercase text-md rounded-${rounded} transition delay-50 hover:bg-${color}Tint hover:ease-in-out md:w-auto flex gap-3 justify-center items-center `}
        onClick={onClick}
      >
        {icon ? <i className={`fa-solid ${icon} border border-white p-[3px] rounded-md text-secondary bg-white`}></i> : ""}
        {disabled ? <Loading /> : null}
        {children}
      </button>
    );
  }
  
  export default Button;