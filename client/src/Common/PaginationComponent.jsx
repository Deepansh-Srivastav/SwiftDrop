import * as React from 'react';
import Pagination from '@mui/material/Pagination';

export default function PaginationComponent() {
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        < Pagination count={5} page={page} onChange={handleChange} />
    );
};