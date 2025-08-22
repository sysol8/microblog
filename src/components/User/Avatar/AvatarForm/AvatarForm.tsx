import styles from './AvatarForm.module.css';
import EditIcon from '../../../../assets/icons/edit.svg?react';
import { useRef } from "react";
import { editAvatar } from "../../../../api/users.ts";

function AvatarForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = async () => {
    if (!inputRef.current?.files?.[0]) return;

    const avatar = inputRef.current.files[0];

    try {
      await editAvatar(avatar);
    } catch (error) {
      console.error(error);
    } finally {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }

  return (
    <form className={styles.form}>
      <label className={styles.label} htmlFor="avatar-input">
        <EditIcon className={styles.icon}/>
        <input ref={inputRef} name="avatar" id="avatar-input" className="visually-hidden" type="file" accept="image/png, image/jpeg, image/wepb, image/gif" onChange={handleInputChange}/>
      </label>
    </form>
  )
}

export default AvatarForm;