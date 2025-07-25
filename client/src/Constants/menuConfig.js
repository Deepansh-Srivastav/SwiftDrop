import {
    Person4Icon,
    ImportContactsIcon,
    ShoppingBasketIcon,
    DeleteIcon,
    DensitySmallIcon,
    CategoryIcon,
    LibraryAddIcon,
    Inventory2Icon,
} from "../Assets/Icons";

export const accountSideMenu = [
    {
        label: "My Profile",
        icon: Person4Icon,
        path: "profile",
        role:"User"
    },
    {
        label: "Category",
        icon: CategoryIcon,
        path: "category",
        role:"Admin"
    },
    {
        label: "Sub Category",
        icon: DensitySmallIcon,
        path: "sub-category",
        role: "Admin"
    }, {
        label: "Upload Product",
        icon: LibraryAddIcon,
        path: "upload-product",
        role: "Admin"
    }, {
        label: "All Products",
        icon: Inventory2Icon,
        path: "all-products",
        role: "Admin"
    },


    {
        label: "Orders",
        icon: ShoppingBasketIcon,
        path: "orders",
        role: "User"
    },
    {
        label: "Address",
        icon: ImportContactsIcon,
        path: "address",
        role: "User"
    },


    {
        label: "Delete",
        icon: DeleteIcon,
        path: "delete",
        role: "User"
    },
];