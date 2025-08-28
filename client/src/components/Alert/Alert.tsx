import styles from './Alert.module.css';
import SuccessIcon from '../../assets/icons/success.svg?react';
import WarningIcon from '../../assets/icons/warning.svg?react';
import ErrorIcon from '../../assets/icons/error.svg?react';
import InfoIcon from '../../assets/icons/info.svg?react';
import CancelIcon from '../../assets/icons/cancel.svg?react';
import type { IAlert } from "../../utils/types.ts";
import clsx from 'clsx';

interface AlertActions {
  onDelete: (id: string) => void;
}

type AlertProps = IAlert & AlertActions;

const ALERT_TYPE_CONFIG = {
  success: {
    Icon: SuccessIcon,
    className: styles.success,
    header: 'Успех'
  },
  warning: {
    Icon: WarningIcon,
    className: styles.warning,
    header: 'Предупреждение'
  },
  error: {
    Icon: ErrorIcon,
    className: styles.error,
    header: 'Ошибка'
  },
  info: {
    Icon: InfoIcon,
    className: styles.info,
    header: 'Информация'
  }
} as const;

export default function Alert({ id, type, message, onDelete, faded }: AlertProps) {
  const { Icon, className, header } = ALERT_TYPE_CONFIG[type];
  return (
    <div className={clsx(styles.alert, className, faded && styles.faded)}>
      <button className={styles.close} type="button" onClick={() => onDelete(id)}>
        <CancelIcon className={styles.closeIcon} />
      </button>
      <Icon className={styles.icon}></Icon>
      <div className={styles.text}>
        <h4>{header}</h4>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  )
}