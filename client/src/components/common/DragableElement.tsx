import React, { useRef, useEffect } from "react";

interface DraggableElementProps {
  children: React.ReactNode;  // Accepts any JSX content passed to the component
}

export const DraggableElement: React.FC<DraggableElementProps> = ({ children }) => {
  const dragDivRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Add the custom styles when the component is mounted
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      #mydiv {
        position: absolute;
        z-index: 9;
        background-color: #f1f1f1;
        text-align: center;
        border: 1px solid #d3d3d3;
      }

      #mydivheader {
        padding: 10px;
        cursor: move;
        z-index: 10;
        background-color: #2196F3;
        color: #fff;
      }
    `;
    document.head.appendChild(style);

    // Cleanup when the component is unmounted
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const dragElement = (element: HTMLDivElement) => {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

      const header = headerRef.current;

      if (header) {
        // If a header exists, attach the mousedown event listener to it
        header.onmousedown = dragMouseDown;
      } else {
        // Otherwise, use the whole element
        element.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e: MouseEvent) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

      function elementDrag(e: MouseEvent) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = `${element.offsetTop - pos2}px`;
        element.style.left = `${element.offsetLeft - pos1}px`;
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    };

    // Copy the ref to a variable inside the effect
    const currentDiv = dragDivRef.current;
    if (currentDiv) {
      dragElement(currentDiv);
    }

    // Cleanup on component unmount or when the reference changes
    return () => {
      if (currentDiv) {
        currentDiv.onmousedown = null;
      }
    };
  }, []); // Empty dependency array to only run once on mount/unmount

  return (
    <div className="flex flex-col">
      <div
        id="mydiv"
        ref={dragDivRef}
        style={{ position: "absolute", cursor: "move" }}
      >
        <div id="mydivheader" ref={headerRef} style={{ cursor: "move" }}>
          Click here to move
        </div>
        {/* Render the children passed to the component */}
        <div>{children}</div>
      </div>
    </div>
  );
};
