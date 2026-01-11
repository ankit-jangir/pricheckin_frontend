import toast from "react-hot-toast";

class ToastService {
  success(message) {
    toast.success(message || "Success");
  }

  error(message) {
    toast.error(message || "Something went wrong");
  }

  warn(message) {
    toast(message || "Warning");
  }

  info(message) {
    toast(message || "Info");
  }

  apiResponse(response) {
    if (!response) return;

    if (response.success) {
      toast.success(response.message || "Success");
    } else {
      toast.error(response.message || "Error");
    }
  }

  validation(message) {
    toast.error(message || "Invalid input");
  }
}

export default new ToastService();
