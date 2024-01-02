export const button = {
    submit: {
        text: 'تایید',
        type: 'submit',
        kind: 'filled'
    },
    cancel: {
        text: 'لغو',
        type: 'button',
        kind: 'outline'
    }
};

export const registerWebAuthData = {
    title: 'آیا ورود بیومتریک اضافه شود؟',
    button: button
};

export const filterModal = {
    title: 'فیلتر ها',
    headerActivityType: 'نوع فعالیت',
    date: 'تاریخ',
    users: 'افراد',
    button: {
        cancel: button.cancel,
        submit: {
            text: 'اعمال فیلتر',
            type: 'submit',
            kind: 'filled'
        }
    }
};

export const modalActivityType = {
    title: 'انتخاب نوع فعالیت',
    button: {
        cancel: button.cancel,
        submit: button.submit
    }
};

export const removeActivity = {
    title: 'فعالیت حذف شود؟',
    button: {
        cancel: button.cancel,
        submit: {
            text: 'حذف فعالیت',
            type: 'submit',
            kind: 'warning'
        }
    }
};

