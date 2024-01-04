import { button } from './modal';
import { schemaActivity, schemaActivityType } from '../../plugins/yup';

export const loginForm = {
    title: 'ورود',
    inputs: [
        {
            label: 'ایمیل',
            name: 'email',
            type: 'text',
            headingIcon: 'iconPerson'
        },
        {
            label: 'رمزعبور',
            name: 'password',
            type: 'password',
            headingIcon: 'iconLock',
            leadingIcon: 'iconEye-slash'
        }
    ],
    button: {
        text: 'ورود',
        type: 'submit',
        kind: 'filled'
    }
};

export const signupForm = {
    title: 'ثبت نام',
    inputs: [
        {
            label: 'نام',
            name: 'firstName',
            type: 'text',
            headingIcon: 'iconPerson'
        },
        {
            label: 'نام خانوادگی',
            name: 'lastName',
            type: 'text',
            headingIcon: 'iconPerson'
        },
        {
            label: 'ایمیل',
            name: 'email',
            type: 'text',
            headingIcon: 'iconPerson'
        },
        {
            label: 'رمزعبور',
            name: 'password',
            type: 'password',
            headingIcon: 'iconLock',
            leadingIcon: 'iconEye-slash'
        }
    ],
    button: {
        text: 'ثبت نام',
        type: 'submit',
        kind: 'filled'
    }
};
const createInfo = {
    title: {
        name: 'title',
        label: 'نام فعالیت',
        type: 'text',
        headingIcon: 'iconNote'
    },
    description: {
        name: 'description',
        label: 'توضیحات',
        type: 'textArea',
        as: 'textArea',
        headingIcon: 'iconDescription'
    },
    date: {
        name: 'date',
        label: 'تاریخ',
        type: 'text',
        kind: 'date',
        headingIcon: 'iconCalender'
    },
    startTime: {
        name: 'startTime',
        label: 'از ساعت',
        type: 'text',
        kind: 'date',
        headingIcon: 'iconClock'
    },
    endTime: {
        name: 'endTime',
        label: 'تا ساعت',
        type: 'text',
        kind: 'date',
        headingIcon: 'iconClock'
    },
    activityType: {
        name: 'activityType',
        label: 'نوع فعالیت',
        type: 'select',
        headingIcon: 'iconActivityType'
    }
};

export const activityTypeForm = {
    name: 'نوع فعالیت',
    nameEn: 'activityType',
    schema: schemaActivityType,
    title: 'ایجاد نوع فعالیت',
    inputs: [
        {
            name: 'activityType',
            label: 'نوع فعالیت',
            type: 'text',
            headingIcon: 'iconActivityType'
        }
    ],
    button: button
};

export const activityForm = {
    name: 'فعالیت',
    nameEn: 'activity',
    schema: schemaActivity,
    title: 'ایجاد فعالیت',
    picture: true,
    inputs: [createInfo.title, createInfo.description],
    time: {
        date: createInfo.date,
        startTime: createInfo.startTime,
        endTime: createInfo.endTime
    },
    select: createInfo.activityType,
    button: button
};

export const actionForms = [activityTypeForm, activityForm];

export const webAuthForm = {
    title: 'احراز هویت',
    inputs: loginForm.inputs,
    button: button
};
