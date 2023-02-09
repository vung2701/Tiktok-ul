import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faEllipsisVertical,
    faKeyboard,
    faLanguage,
    faGear,
    faCoins,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion, faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import styles from './Header.module.scss';
import images from '~/assets/images';
import { Menu } from '~/components/Popper';
import Button from '~/components/Button';
import { CreateEffectsIcon, InBoxIcon, MessageIcon } from '~/components/Icons';
import Image from '~/components/Image';
import config from '~/config';
import Search from '../Search';

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
                {
                    type: 'languages',
                    code: 'vn',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'languages',
                    code: 'vn',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'languages',
                    code: 'vn',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'languages',
                    code: 'vn',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'languages',
                    code: 'vn',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'languages',
                    code: 'vn',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'languages',
                    code: 'vn',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'languages',
                    code: 'vn',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'languages',
                    code: 'vn',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'languages',
                    code: 'vn',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'languages',
                    code: 'vn',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'languages',
                    code: 'vn',
                    title: 'Tiếng Việt',
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

const currentUser = false;

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
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="TikTok" />
                </Link>

                {/* Search */}
                <Search />

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
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt…875600&x-signature=QiBV2KcBco7nZw94DZwrk2lWOl0%3D"
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
