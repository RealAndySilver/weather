import { ReactNode, useState } from "react";
import SearchBar from "./SearchBar";

interface Items {
  title: string;
  url: string;
  onClickHandler: (title: string) => void;
}
interface NavBarProps {
  items: Items[];
  children: ReactNode;
  searchOnClickHandler: (search: string) => void;
  searchOnChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NavBar = ({
  items,
  children,
  searchOnClickHandler,
  searchOnChangeHandler
}: NavBarProps) => {
  const [activeItem, setActiveItem] = useState<string>("");
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          {children}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {items.map((item, index) => (
              <a
                key={index}
                className={
                  activeItem === item.title
                    ? "nav-item nav-link active"
                    : "nav-item nav-link"
                }
                href={item.url}
                onClick={() => {
                  item.onClickHandler(item.title);
                  setActiveItem(item.title);
                }}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
        <SearchBar
          placeholder="Search"
          onChangeHandler={searchOnChangeHandler}
          onClickHandler={searchOnClickHandler}
          buttonTitle="Search"
        />
      </nav>
    </>
  );
};
