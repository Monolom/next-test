import { useEffect, useState } from "react";

const Modal = ({
  extraClass = `component_modal_container`,
  children,
  isVisible,
  onClose,
  bgColor = "transparent",
}) => {
  const [animationList, SetAnimationList] = useState({ opacity: 0, top: 40 });

  const closeEvent = (event) => {
    const key = event.key;

    if (key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("keydown", closeEvent, true);
      SetAnimationList({ opacity: 1 });
    } else {
      SetAnimationList({ opacity: 0 });
    }

    return function cleanup() {
      document.removeEventListener("keydown", closeEvent, true);
    };
  }, [isVisible]);

  const closeModal = () => {
    if (onClose !== undefined) {
      onClose();
    }
  };

  return (
    <>
      {isVisible && (
        <div
          style={{ ...animationList, backgroundColor: bgColor }}
          className={`component_modal_wrapper`}
          onClick={() => {
            closeModal();
          }}
        >
          <div
            className={extraClass}
            onClick={(e) => {
              if (e.target.localName !== "input") {
                e.preventDefault();
              }

              e.stopPropagation();
            }}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
