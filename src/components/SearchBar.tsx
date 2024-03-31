import { useState } from 'react';
interface SearchBarProps {
    onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    onClickHandler: (search: string) => void;
    buttonTitle?: string;
}
const SearchBar = ({
    placeholder,
    onChangeHandler,
    onClickHandler,
    buttonTitle
}: SearchBarProps) => {
    const [search, setSearch] = useState<string>('');
    return (
        <>
            <form className="d-flex" role="search">
                <input
                    className="form-control me-2"
                    id="searchInput"
                    type="search"
                    placeholder={placeholder}
                    aria-label="Search"
					value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        onChangeHandler(e);
                    }}
                />
                <button
                    className="btn btn-outline-success"
                    type="submit"
                    onClick={(e) => {
						e.preventDefault();
						if (search !== '') onClickHandler(search);
                        setSearch('');
                    }}
                >
                    {buttonTitle}
                </button>
            </form>
        </>
    );
};

export default SearchBar;
