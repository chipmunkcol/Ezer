import useNavigater from "../../utils/hooks/useNavigater";

const Header = () => {
  // const navigate = useNavigate();
  const { goHome, goFamily } = useNavigater();
  const pathname = window.location.pathname;
  console.log("🚀 ~ Header ~ pathname:", pathname);

  const menuItems = [
    { label: "회원", path: "/", onClick: goHome },
    { label: "가족", path: "/family", onClick: goFamily },
  ];

  // const getClasses = (path: string) => {
  //   const base =
  //     "min-w-20 flex justify-center py-3 border-b-2 transition-colors cursor-pointer px-4";
  //   const active =
  //     pathname === path
  //       ? "border-[#0958d9] text-[#0958d9]"
  //       : "border-transparent text-black";
  //   // const hover = "hover:text-[#4096ff] hover:border-[#4096ff]";
  //   return `${base} ${active} `;
  // };

  return (
    // <header className="w-full border-b border-gray-300">
    //   <h1 className="text-2xl font-semibold py-4 px-5">Ezer 영커플</h1>
    //   <div className="px-5 flex ">
    //     <div onClick={goHome} className={getClasses("/")}>
    //       회원
    //     </div>
    //     <div onClick={goFamily} className={getClasses("/family")}>
    //       가족
    //     </div>
    //   </div>
    // </header>
    <header>
      <h1 className="text-2xl font-semibold py-4 px-5">Ezer 영커플</h1>
      <ul className="flex relative border-b border-gray-200">
        {menuItems.map((item, idx) => {
          // pathname이 '/' 이거나 'user' 경로일 경우 item.path === '/' 인 경우 활성화
          // pathname이 'family' 를 포함할 경우 item.path === '/family' 인 경우 활성화
          const isActive =
            (item.path === "/" &&
              (pathname === "/" || pathname.startsWith("/user"))) ||
            (item.path === "/family" && pathname.startsWith("/family"));
          return (
            <div
              key={idx}
              onClick={item.onClick}
              className="relative min-w-20 flex justify-center py-3 cursor-pointer text-black transition-colors"
            >
              {item.label}
              {/* Active underline */}
              <span
                className={`
                absolute bottom-0 left-1/2 h-[1px] bg-[#0958d9]
                transform -translate-x-1/2
                ${
                  isActive
                    ? "w-full transition-[width] duration-500 ease-out"
                    : "w-0 transition-[width] duration-0"
                }
              `}
              ></span>
            </div>
          );
        })}
      </ul>
    </header>
  );
};

export default Header;
