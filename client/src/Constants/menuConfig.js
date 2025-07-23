import {
    Person4Icon,
    ImportContactsIcon,
    ShoppingBasketIcon,
    DeleteIcon
} from "../Assets/Icons";

export const accountSideMenu = [
    {
        label: "My Profile",
        icon: Person4Icon,
        path: "profile",
    },
    {
        label: "Orders",
        icon: ShoppingBasketIcon,
        path: "orders",
    },
    {
        label: "Address",
        icon: ImportContactsIcon,
        path: "address",
    },
    {
        label: "Delete",
        icon: DeleteIcon,
        path: "delete",
    },
];