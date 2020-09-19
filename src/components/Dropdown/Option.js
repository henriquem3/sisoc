import React, { useContext, useEffect, useRef, useState } from 'react';
import {motion} from 'framer-motion';

import { useDimensions } from '../../hooks/dimensions.js';
import { MenuContext } from '../../hooks/menu';

let lastOptionId = 0;

export const DropdownOption = ({ name, content: Content }) => {
  const idRef = useRef(++lastOptionId);
  const id = idRef.current;

  const [optionHook, optionDimensions] = useDimensions();
  const [registered, setRegistered] = useState(false);

  const {
    registerOption,
    updateOptionProps,
    setTargetId,
    targetId,
  } = useContext(MenuContext);

  useEffect(() => {
    if (!registered && optionDimensions) {
      const WrappedContent = () => {
        const contentRef = useRef(null);

        useEffect(() => {
          const contentDimensions = contentRef.current?.getBoundingClientRect();
          updateOptionProps(id, { contentDimensions });
        }, []);

        return (
          <div ref={contentRef}>
            <Content />
          </div>
        );
      };

      registerOption({
        id,
        optionDimensions,
        optionCenterX: optionDimensions.x + optionDimensions.width / 2,
        WrappedContent,
        backgroundHeight: 0,
      });

      setRegistered(true);
    } else if (registered && optionDimensions) {
      updateOptionProps(id, {
        optionDimensions,
        optionCenterX: optionDimensions.x + optionDimensions.width / 2,
      });
    }
  }, [id, optionDimensions, registerOption, registered, updateOptionProps]);

  const handleOpen = () => setTargetId(id);
  const handleClose = () => setTargetId(null);

  const handleTouch = () => (window.isMobile = true);

  const handleClick = e => {
    e.preventDefault();

    return targetId === id ? handleClose() : handleOpen();
  }

  return (
    <div>
      <motion.button
        className="dropdown-option"
        ref={optionHook}
        onMouseDown={handleClick}
        onMouseEnter={() => !window.isMobile && handleOpen()}
        onMouseLeave={() => !window.isMobile && handleClose()}
        onTouchStart={handleTouch}
        onFocus={handleOpen}
        onBlur={handleClose}
      >
        {name}
      </motion.button>
    </div>
  );
};
