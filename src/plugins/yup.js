import * as Yup from 'yup';

export const schemaLogin = Yup.object().shape({
    email: Yup.string().email('ایمیل معتبر نیست').required('ایمیل را وارد کنید'),
    password: Yup.string().required('رمز عبور را وارد نمایید')
});

export const schemaSignup = Yup.object().shape({
    firstname: Yup.string().required('نام خود را وارد کنید').min(3, 'نام حداقل سه حرف داشته باشد'),
    lastname: Yup.string()
        .required('نام خانوادگی خود را وارد کنید')
        .min(3, 'نام خانوادگی حداقل سه حرف داشته باشد'),
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
    target: Yup.string().required('نام هدف را وارد کنید'),
    unit: Yup.string().required('واحد هدف را وارد کنید'),
    note: Yup.string().required('توضیحات را وارد کنید'),
    date: Yup.string().required('زمان شروع را وارد کنید'),
    frequency: Yup.string().required('زمان تکرار را وارد کنید'),
    dueDate: Yup.string().required('زمان اتمام را وارد کنید'),
    activityType: Yup.string().required('نوع فعالیت را انتخاب کنید')
});

export const schemaActivityType = Yup.object().shape({
    title: Yup.string().required('نوع فعالیت را بنویسید')
});
