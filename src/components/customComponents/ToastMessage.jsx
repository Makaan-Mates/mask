const ToastMessage = ({ closeToast, toastProps, message }) => {
  return (
    <div>
      <div className="flex flex-col">
        {message} 
      </div>
    </div>
  );
};

export default ToastMessage;
