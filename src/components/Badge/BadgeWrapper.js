import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Badge.module.scss';

const cx = classNames.bind(styles);

function BadgeWrapper({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

BadgeWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BadgeWrapper;
