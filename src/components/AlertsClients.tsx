import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router";

interface Props {
  title: string;
  description: string;
  url: string;
}

function DangerAlert({ title, description, url }: Props) {
  return (
    <>
      <Link to={url && url}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Alert>
      </Link>
    </>
  );
}

export default DangerAlert;
