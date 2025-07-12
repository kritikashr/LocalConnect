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
import { useRouter } from "next/navigation"; // Import useRouter for redirection

interface AlertLoginProps {
  message?: string;
}

export default function AlertLogin({
  message = "You must be logged in to submit a request.",
}: AlertLoginProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Initialize the router

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

  // Handle redirect to login page when "Continue" button is clicked
  const handleContinue = () => {
    router.push("/login"); // Redirect to the login page
    closeDialog(); // Close the dialog
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Login Required</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
