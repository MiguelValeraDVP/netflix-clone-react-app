import { toast } from "react-toastify";

export const TMDB_API_KEY = "6bf9a3697a9e5060bdebef5a44c3e38d";

export const TMBD_BASE_URL = "https://api.themoviedb.org/3";

export const notifySuccessToast = () =>
  toast.success("Login success!", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

export const notifyFailureToast = () =>
  toast.error("Credentials failed!", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

export const HelloToast = () =>
  toast.error("Hello! welcome to Miguel's Netflix Clone project", {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

export const WelcomeToast = () =>
  toast.info(
    "Do not forget to check about this project to know how it works, scroll to footer section",
    {
      position: "bottom-right",
      autoClose: 8000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    }
  );

export const movieAdded = () =>
  toast.success("Movie added to list", {
    position: "bottom-right",
    autoClose: 8000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

export const movieLiked = () =>
  toast.success("Movie liked", {
    position: "bottom-right",
    autoClose: 8000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

export const movieDisliked = () =>
  toast.success("Movie disliked", {
    position: "bottom-right",
    autoClose: 8000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

export const RegisterSuccessToast = () =>
  toast.success("User creater successfully", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

export const NotImplementedToast = () =>
  toast.error("Sorry, this feature have not been implemented yet.", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

export const moveIntoTopPage = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
