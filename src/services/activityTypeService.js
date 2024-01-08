import instance from '@/plugins/axios';
import { toast } from '@/plugins/toast';

export const getActivityType = async () => {
    try {
        const activityTypes = await instance.get('/activityType');
        return activityTypes;
    } catch (error) {
        toast.error('نوع فعالیت ها دریافت نشد');
    }
    return;
};
export const postActivityType = async body => {
    try {
        const activityTypes = await instance.post('/activityType', body);
        toast.success('نوع فعالیت با موفقیت ساخته شد');
        return activityTypes;
    } catch (error) {
        toast.error('نوع فعالیت ها ایجاد نشد');
    }
    return;
};
