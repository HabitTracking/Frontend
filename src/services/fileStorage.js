import { toast } from '@/plugins/toast';
import instance from '@/plugins/axios';
import { fileStorageURL as URL } from '@/common/constants/path';

export const putFile = async files => {
    try {
        const response = await instance.putForm(URL, {
            files
        });
        console.log(response);
        return response.data;
    } catch (error) {
        toast.error('فایل ارسال نشد');
    }
};

export const getFile = async id => {
    try {
        const response = await instance.get(URL, {
            params: id,
            responseType: 'blob'
        });
        return response;
    } catch (error) {
        toast.error('فایل دریافت نشد');
    }
};
