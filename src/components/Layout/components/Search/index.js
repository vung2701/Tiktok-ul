import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional

import styles from './Search.module.scss';
import { AccountItem, Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon } from '~/components/Icon';
import { useDebounce } from '~/components/hooks';
import * as searchServices from '~/apiServices/searchServices';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 800);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const FetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debounced);
            setSearchResult(result);
            setShowResult(true);
            setLoading(false);
        };

        FetchApi();
    }, [debounced]);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <form className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    onChange={handleChange}
                />
                {!!searchValue && (
                    <>
                        {loading ? (
                            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        ) : (
                            <button
                                className={cx('clear')}
                                onClick={() => {
                                    setSearchValue('');
                                    setSearchResult([]);
                                    inputRef.current.focus();
                                }}
                            >
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        )}
                    </>
                )}

                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                    <SearchIcon />
                </button>
            </form>
        </HeadlessTippy>
    );
}

export default Search;
