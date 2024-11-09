import "toastify-js/src/toastify.css"
import Toastify from "toastify-js";

interface ToastOptions {
    message: string;
    type: "success" | "error";
}

export const showToast = (options: ToastOptions) => {
    const { message, type } = options;

    Toastify({
        text: message,
        duration: 4000,
        style:{
          background: getBackground(type),
          display: "flex",
          gap: "3px",
          height: "50px",
          alignItems: "center",
          justifyContent: "center",
        },
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
      }).showToast();
}


const getBackground = (type: "success" | "error") => {
    const backgrounds = {
        success: "linear-gradient(to right, #00b09b, #96c93d)",
        error: "linear-gradient(to right, #ff7575, #b00000)",
    }
    return backgrounds[type]
}