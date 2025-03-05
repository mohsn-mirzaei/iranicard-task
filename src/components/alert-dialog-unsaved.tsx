import React from "react";
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

const AlertDialogUnsaved = ({
  showUnsavedDialog,
  setShowUnsavedDialog,
  cancelAction,
  confirmAction,
}: {
  showUnsavedDialog: boolean;
  setShowUnsavedDialog?: (open: boolean) => void;
  cancelAction: () => void;
  confirmAction: () => void;
}) => {
  return (
    <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>تغییرات ذخیره نشده</AlertDialogTitle>
          <AlertDialogDescription>
            شما تغییرات ذخیره نشده ای دارید. آیا مطمئن هستید که می‌خواهید بدون
            ذخیره کردن آن را ترک کنید؟
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancelAction}>لغو</AlertDialogCancel>
          <AlertDialogAction onClick={confirmAction}>
            حذف تغییرات
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogUnsaved;
