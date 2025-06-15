"use client";

import DeleteButton from "./DeleteButton";

export const DeleteButtonWrapper = ({ id }: { id: number }) => {
  const handleDeleted = () => {
    window.location.reload(); 
  };

  return <DeleteButton id={id} onDeleted={handleDeleted} />;
};