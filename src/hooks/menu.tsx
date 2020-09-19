import React, { createContext, useState, useCallback, useEffect } from 'react';

interface ContextData {
  registerOption(data: Option): void;
  updateOptionProps(optionId: number, props: Option): void;
  getOptionById(id: number): Option | undefined;
  hideOptionById(id: number): void;
  setTargetId: React.Dispatch<React.SetStateAction<number | null>>;
  targetId: number | null;
  cachedId: number | null;
  options: Option[];
}

export interface Option {
  id: number;
  optionDimensions: object;
  contentDimensions?: ClientRect;
  optionCenterX: number;
  backgroundHeight: number;
  WrappedContent: React.FC;
}

export const MenuContext = createContext<ContextData>({} as ContextData);

export const DropdownProvider: React.FC = ({ children }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [cachedId, setCachedId] = useState<number | null>(null);

  const registerOption = useCallback(
    ({
      id,
      optionDimensions,
      optionCenterX,
      backgroundHeight,
      WrappedContent,
    }) => {
      setOptions((items) => [
        ...items,
        {
          id,
          optionDimensions,
          optionCenterX,
          backgroundHeight,
          WrappedContent,
        },
      ]);
    },
    [setOptions]
  );

  const updateOptionProps = useCallback(
    (optionId, props) => {
      setOptions((items) =>
        items.map((item) => {
          if (item.id === optionId) {
            item = { ...item, ...props };
          }
          return item;
        })
      );
    },
    [setOptions]
  );

  const getOptionById = useCallback(
    (id) => options.find((item) => item.id === id),
    [options]
  );

  const hideOptionById = useCallback(
    (id) => {
      setOptions((items) => items.filter((item) => item.id !== id));
    },
    [setOptions]
  );

  useEffect(() => {
    if (targetId !== null) setCachedId(targetId);
  }, [targetId]);

  return (
    <MenuContext.Provider
      value={{
        registerOption,
        updateOptionProps,
        getOptionById,
        hideOptionById,
        setTargetId,
        targetId,
        cachedId,
        options,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
