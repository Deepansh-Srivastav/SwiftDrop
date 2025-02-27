import { toast } from "react-toastify";
import VerifiedIcon from '@mui/icons-material/Verified';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import AnnouncementIcon from '@mui/icons-material/Announcement';

const SuccessIcon = () => <VerifiedIcon style={{ color: "green" }} />;
const ErrorIcon = () => <GppMaybeIcon style={{ color: "red" }} />;
const WarningIcon = () => <AnnouncementIcon style={{ color: "var(--secondary-color)" }} />;

export const showSuccessToast = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        icon: <SuccessIcon />,
    });
};

export const showErrorToast = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        icon: <ErrorIcon />,
    });
};

export const showWarningToast = (message) => {
    toast.warn(message, {
        position: "top-right",
        autoClose: 2000,
        icon: <WarningIcon />,
    });
};