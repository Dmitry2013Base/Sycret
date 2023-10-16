import SelectCertificate from "../pages/SelectCertificate";
import UserContactForm from "../pages/UserContactForm";
import Payment from "../pages/Payment";

export const routes = [
    {
        path: '/',
        element: <SelectCertificate />
    },
    {
        path: '/form',
        element: <UserContactForm />
    },
    {
        path: '/payment',
        element: <Payment />
    },
]
