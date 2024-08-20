export default function Search() {

    return (
        <div className="container">
            <form
                onSubmit={(e) => e.preventDefault()}
                className="search-field position-relative mt-4 mb-3"
            >
                <div className="position-relative">
                    <input
                        className="search-field__input w-100 border rounded-1"
                        type="text"
                        name="search-keyword"
                        placeholder="Search products"
                    />
                    <button
                        className="btn-icon search-popup__submit pb-0 me-2"
                        type="submit"
                    >
                        <svg
                            className="d-block"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <use href="#icon_search" />
                        </svg>
                    </button>
                    <button
                        className="btn-icon btn-close-lg search-popup__reset pb-0 me-2"
                        type="reset"
                    ></button>
                </div>

                <div className="position-absolute start-0 top-100 m-0 w-100">
                    <div className="search-result"></div>
                </div>
            </form>
        </div>
    );
}
