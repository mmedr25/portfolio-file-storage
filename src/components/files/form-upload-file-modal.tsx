import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import FileUploadForm from "@/components/forms/upload-file-form";

export const FormUploadFileModal = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Upload File</Button>
      </DrawerTrigger>
      <DrawerContent className="">
        <div className="md:w-[50%] md:mx-auto">
          <DrawerHeader>
            <DrawerTitle>Upload File</DrawerTitle>
            <DrawerDescription>You can upload a file to your workspace</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <FileUploadForm />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
