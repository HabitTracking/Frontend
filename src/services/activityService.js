import { barjavandURL as URL } from '@/common/constants/path';
import { toast } from '@/plugins/toast';

import instance from '@/plugins/axios';

export const getActivity = async params => {
    console.log(params);
    return [
        {
            id: '1',
            data: {
                title: 'فعالیت',
                description: 'شیشنسئیشئس یشیشسیکشس ی شسیک شسیت',
                date: '12131212131',
                startTime: '12:20',
                endTime: '12:20',
                activityType: 'شنا'
            }
        }
    ];
    // try {
    //     const activities = await instance.get(URL, {
    //         params: params
    //     });
    //     return activities.data?.results;
    // } catch (error) {
    //     toast.error('فعالیت ها دریافت نشد');
    // }
};

export const postActivity = async body => {
    try {
        const responseActivity = await instance.post(URL, body);
        toast.success('فعالیت با موفقیت ساخته شد');
        return responseActivity.data;
    } catch (error) {
        toast.error('ساخت فعالیت با مشکل مواجه شد');
    }
};

export const editActivity = async body => {
    try {
        const editedActivity = await instance.put(URL, body);
        toast.success('فعالیت با موفقیت ویرایش شد');
        return editedActivity.data;
    } catch (error) {
        toast.error('ویرایش فعالیت با مشکل مواجه شد');
    }
};

export const deleteActivity = params => {
    try {
        instance.delete(URL, { params: params });
        toast.success('فعالیت با موفقیت حذف شد');
    } catch (error) {
        toast.error('حذف فعالیت با مشکل مواجه شد');
    }
};
