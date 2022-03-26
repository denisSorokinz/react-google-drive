import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import { useRouter } from "next/router";

interface IProps {
  id: string;
  name: string;
  createdAt: string;
}

function Document({ id, name, createdAt }: IProps) {
  const router = useRouter();

  const openDocument = (id: string) => router.push(`/documents/${id}`)

  return (
    <div
      key={id}
      className="flex items-center px-2 py-4 hover:bg-gray-100 cursor-pointer rounded-lg"
      onClick={() => openDocument(id)}
    >
      <Icon name="article" size="4xl" color="blue" />
      <span className="ml-3">{name}</span>
      <span className="ml-auto pr-8">{createdAt}</span>
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="border-0"
      >
        <Icon name="more_vert" size="3xl" />
      </Button>
    </div>
  );
}

export default Document;
