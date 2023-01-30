import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faPlus,
    faEllipsisVertical,
    faKeyboard,
    faLanguage,
    faGear,
    faCoins,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion, faUser } from '@fortawesome/free-regular-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import styles from './Header.module.scss';
import images from '~/assets/images';
import { useEffect, useState } from 'react';
import { AccountItem, Menu, Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import { CreateEffectsIcon, InBoxIcon, MessageIcon, SearchIcon } from '~/components/Icon';
import Image from '~/components/Image';
const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'languages',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'languages',
                    code: 'vn',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard Shotcuts',
    },
];

const currentUser = true;

const USER_MENU = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View Profile',
        to: '/@vungg',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get Coins',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Settings',
        to: '/settings',
    },

    ...MENU_ITEMS,

    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/logout',
        separate: true,
    },
];

function Header() {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setSearchResults([1, 2, 3]);
        }, 0);

        return () => clearTimeout(timerId);
    }, []);

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'languages':
                console.log('change languages');
                break;
            default:
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="TikTok" />
                </div>

                <HeadlessTippy
                    interactive
                    visible={searchResults.length < 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <form className={cx('search')}>
                        <input placeholder="Search accounts and videos" spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            <SearchIcon />
                        </button>
                    </form>
                </HeadlessTippy>

                <div className={cx('actions')}>
                    <Button leftIcon={<FontAwesomeIcon icon={faPlus} />}>Upload</Button>

                    {currentUser ? (
                        <>
                            <Tippy trigger="click" content="Create effects" placement="bottom">
                                <button className={cx('actions-btn')}>
                                    <CreateEffectsIcon />
                                </button>
                            </Tippy>
                            <Tippy trigger="click" content="Message" placement="bottom">
                                <button className={cx('actions-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy trigger="click" content="Inbox" placement="bottom">
                                <button className={cx('actions-btn')}>
                                    <InBoxIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button primary>Login</Button>
                        </>
                    )}
                    <Menu items={currentUser ? USER_MENU : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/0ce6400e4cd9c83d1ed72365a05e7f6f~c5_100x100.jpeg?x-expires=1674900000&x-signature=6fPDgZ14k20z7Sv4JdYuCXhV2OQ%3D"
                                alt="user-avatar"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
