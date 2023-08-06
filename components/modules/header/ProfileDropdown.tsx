import { logoutFx } from "@/app/api/auth";
import LogoutSvg from "@/components/elements/LogoutSvg/LogoutSvg";
import ProfileSvg from "@/components/elements/ProfileSvg/ProfileSvg";
import { $mode } from "@/context/mode";
import { $user } from "@/context/user";
import styles from '@/styles/profileDropDown/index.module.scss';
import { IWrappedComponentProps } from "@/types/common";
import { withClickOutside } from "@/utils/withClickOutside";
import { useStore } from "effector-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { forwardRef } from "react";

const ProfileDropdown = forwardRef<HTMLDivElement, IWrappedComponentProps>(({ open, setOpen }, ref) => {
    const router = useRouter()
    const user = useStore($user)
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const toggleProfileDropDown = () => {
        setOpen(!open)
    }

    const handleLogout = async () => {
        await logoutFx('/users/logout')
        router.push('/')
    }

    return (
        <div className={styles.profile} ref={ref}>
            <button className={styles.profile__btn} onClick={toggleProfileDropDown}>
                <span className={styles.profile__span}><ProfileSvg />
                </span>
            </button>
            <AnimatePresence>
                {open && (<motion.ul
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className={`${styles.profile__dropdown} ${darkModeClass}`}
                    style={{ transformOrigin: 'right top' }}
                >
                    <li className={styles.profile__dropdown__user}>
                        <span className={`${styles.profile__dropdown__username} ${darkModeClass}`}>{user.username}</span>
                        <span className={`${styles.profile__dropdown__email} ${darkModeClass}`}>{user.email}</span>
                    </li>
                    <li className={styles.profile__dropdown__item}>
                        <button onClick={handleLogout} className={styles.profile__dropdown__item__btn}>
                            <span className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}>Выйти</span>
                            <span className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}><LogoutSvg /></span>
                        </button>
                    </li>
                </motion.ul>)}
            </AnimatePresence>
        </div >
    )
})

ProfileDropdown.displayName = 'profileDropDown'

export default withClickOutside(ProfileDropdown)