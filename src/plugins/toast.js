import { toast as toastify, updateGlobalOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

updateGlobalOptions({
    limit: 3,
    autoClose: 4000,
    transition: toastify.TRANSITIONS.FLIP,
    position: toastify.POSITION.TOP_CENTER,
    theme: toastify.THEME.COLORED,
    multiple: false
});

export const toast = {
    error: text => toastify.error(text),

    success: text => toastify.success(text),

    warning: text => toastify.warning(text),

    info: text => toastify.info(text)
};
