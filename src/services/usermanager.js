import instance from '@/plugins/axios';
import { toast } from '@/plugins/toast';
import { userManagerURL as URL } from '@/common/constants/path';

export const getProfile = async () => {
    try {
        const { data: profile } = await instance.get(`${URL}/profile`);
        return profile;
    } catch (error) {
        toast.error('دریافت اطلاعات کاربر با مشکل مواجه شد');
    }
};

export const login = async body => {
    try {
        const response = await instance.post(`${URL}/login`, body);

        return response.data;
    } catch (error) {
        switch (error?.response?.status) {
            case 400:
                toast.error('نام کاربری یا رمز عبور اشتباه است');
                break;
            case 404:
                toast.error('نام کاربری یا رمز عبور اشتباه است');
                break;
            default:
                toast.warning('ورود با مشکل مواجه شد');
                break;
        }
    }
    return false;
};

export const signup = async body => {
    try {
        const response = await instance.post(`${URL}/signUp`, body);
        toast.success('ثبت نام با موفقیت انجام شد');
        return response;
    } catch (error) {
        switch (error?.response?.status) {
            case 400:
                toast.error('داده های ورودی نامعتبرند');
                break;
            case 404:
                toast.error('داده های ورودی نامعتبرند');
                break;
            case 409:
                toast.warning('مشخصات کاربر تکراری است');
                break;
            default:
                toast.warning('ثبت نام با مشکل مواجه شده است');
                break;
        }
    }
    return false;
};
