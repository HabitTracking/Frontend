import * as Yup from 'yup';

export const schemaLogin = Yup.object().shape({
    email: Yup.string().email('ایمیل معتبر نیست').required('ایمیل را وارد کنید'),
    password: Yup.string().required('رمز عبور را وارد نمایید')
});

export const schemaSignup = Yup.object().shape({
    firstName: Yup.string().required('نام خود را وارد کنید'),
    lastName: Yup.string().required('نام خانوادگی خود را وارد کنید'),
    email: Yup.string().email('ایمیل معتبر نیست').required('ایمیل را وارد کنید'),
    password: Yup.string()
        .required('رمز عبور را وارد نمایید')
        .matches(/[0-9]/, 'رمز عبور باید شامل عدد باشد')
        .matches(/[a-z]/, 'رمز عبور باید شامل حروف  کوچک باشد')
        .matches(/[A-Z]/, 'رمز عبور باید شامل حروف بزرگ باشد')
        .min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد')
});

export const schemaActivity = Yup.object().shape({
    title: Yup.string().required('عنوان را وارد کنید'),
    description: Yup.string().required('توضیحات را وارد کنید'),
    date: Yup.string().required('تاریخ را وارد کنید'),
    startTime: Yup.string().required('زمان شروع را وارد کنید'),
    endTime: Yup.string().required('زمان اتمام را وارد کنید'),
    activityType: Yup.string().required('نوع فعالیت را انتخاب کنید')
});

export const schemaActivityType = Yup.object().shape({
    activityType: Yup.string().required('نوع فعالیت را بنویسید')
});
