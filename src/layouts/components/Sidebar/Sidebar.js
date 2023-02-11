import classNames from 'classnames/bind';

import config from '~/config';
import styles from './Sidebar.module.scss';
import Navigation from './Navigation';
import NavItem from './Navigation/NavItem';
import { HomeIcon, LIVEIcon, UserGroupIcon, HomeIconActive, UserGroupIconActive } from '~/components/Icons';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Navigation>
                <NavItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeIconActive />} />
                <NavItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupIconActive />}
                />
                <NavItem
                    title="LIVE"
                    to={config.routes.live}
                    icon={<LIVEIcon />}
                    activeIcon={<LIVEIcon />}
                />
            </Navigation>
        </aside>
    );
}

export default Sidebar;
