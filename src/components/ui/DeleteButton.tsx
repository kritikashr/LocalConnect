"use client";

import React from "react";
import { Button } from "./button";
import { deleteNotice } from "@/lib/api";
import { DeleteButtonProps } from "@/lib/type";

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDeleted }) => {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this news post?")) return;

    try {
      const res = await deleteNotice(id);
      onDeleted();
    } catch (error) {
      alert("Error deleting.");
      console.error(error);
    }
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeleteButton;
