import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function UserAvatar({image}) {
    return (
        <Stack direction="row" spacing={2}>
            <Avatar alt="Remy Sharp" src={image} />
        </Stack>
    );
}