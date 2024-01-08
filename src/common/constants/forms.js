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
            name: 'firstname',
            type: 'text',
            headingIcon: 'iconPerson'
        },
        {
            label: 'نام خانوادگی',
            name: 'lastname',
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
    target: {
        name: 'target',
        label: 'هدف',
        type: 'text',
        headingIcon: 'iconNote'
    },
    unit: {
        name: 'unit',
        label: 'واحد هدف',
        type: 'text',
        headingIcon: 'iconNote'
    },
    note: {
        name: 'note',
        label: 'توضیحات',
        type: 'textArea',
        as: 'textArea',
        headingIcon: 'iconDescription'
    },
    date: {
        name: 'date',
        label: 'زمان شروع',
        type: 'text',
        kind: 'date',
        headingIcon: 'iconCalender'
    },
    dueDate: {
        name: 'dueDate',
        label: 'زمان اتمام',
        type: 'text',
        kind: 'date',
        headingIcon: 'iconClock'
    },
    activityType: {
        name: 'activityType',
        label: 'نوع فعالیت',
        type: 'text',
        disabled: true,
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
            name: 'title',
            label: 'نام نوع فعالیت',
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
    inputs: [createInfo.title, createInfo.note],
    time: {
        date: createInfo.date,
        dueDate: createInfo.dueDate
    },
    frequency: {
        name: 'frequency',
        label: 'زمان تکرار',
        type: 'select',
        headingIcon: 'iconNote',
        options: [
            {
                name: 'هر روز',
                value: '1'
            },
            {
                name: 'هر سه روز',
                value: '3'
            },
            {
                name: 'هر هفته',
                value: '7'
            },
            {
                name: 'هر ماه',
                value: '30'
            }
        ]
    },
    target: createInfo.target,
    unit: createInfo.unit,
    activityType: createInfo.activityType,
    button: button
};

export const actionForms = [activityTypeForm, activityForm];
