import styles from './Alert.module.css';
import SuccessIcon from '../../assets/icons/success.svg?react';
import WarningIcon from '../../assets/icons/warning.svg?react';
import ErrorIcon from '../../assets/icons/error.svg?react';
import InfoIcon from '../../assets/icons/info.svg?react';

interface AlertProps {
  type: 'success' | 'warning' | 'error' | 'info'
  message: string
}

const ALERT_TYPE_CONFIG = {
  success: {
    Icon: SuccessIcon,
    className: styles.success,
  },
  warning: {
    Icon: WarningIcon,
    className: styles.warning,
  },
  error: {
    Icon: ErrorIcon,
    className: styles.error,
  },
  info: {
    Icon: InfoIcon,
    className: styles.info
  }
} as const;

export default function Alert({ type, message }: AlertProps) {
  const { Icon, className } = ALERT_TYPE_CONFIG[type];
  return (
    <div className={`${styles.alert} ${className}`}>
      <Icon className={styles.icon}></Icon>
      <span className={styles.message}>{message}</span>
    </div>
  )
}