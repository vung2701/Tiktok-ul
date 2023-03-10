import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional

import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import useDebounce from '~/hooks/useDebounce';
import * as searchService from '~/services/searchService';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedInput = useDebounce(searchValue, 800);

    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedInput.trim()) {
            setSearchResult([]);
            return;
        }

        const FetchApi = async () => {
            setLoading(true);
            const result = await searchService.search(debouncedInput);
            setSearchResult(result);
            setShowResult(true);
            setLoading(false);
        };

        FetchApi();
    }, [debouncedInput]);

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
        // Using a wrapper <div> or <span> tag around the reference element solves
        //  this by creating a new parentNode context.
        <div>
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
        </div>
    );
}

export default Search;
