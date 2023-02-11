import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Badge.module.scss';

const cx = classNames.bind(styles);

function Badge({ title }) {
    return <sup className={cx('badge')}>{title}</sup>;
}

Badge.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Badge;
