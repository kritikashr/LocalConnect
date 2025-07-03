import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";

export default function ErrorAlert() {
  const [isOpen, setIsOpen] = useState(false);
  // Function to open the dialog
  const openDialog = () => {
    setIsOpen(true);
  };

  // Function to close the dialog
  const closeDialog = () => {
    setIsOpen(false);
  };

  // Trigger the dialog (e.g., for a login failure or some other condition)
  React.useEffect(() => {
    openDialog(); // Open the dialog when needed
  }, []);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">Error!!!</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
           Failed to submit your request. Please try again later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeDialog} className="bg-gray-100">Okay</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
