import Icon from "@material-tailwind/react/Icon";

import Document from "./Document";

import documentType from "../types/documentType";
import { QuerySnapshot, DocumentData } from "firebase/firestore";

interface IProps {
  userDocuments: QuerySnapshot<DocumentData>;
}

function DocumentsSection({ userDocuments }: IProps) {
  return (
    <section className="bg-white px-10 md:px-0 md:bg-black">
      <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
        <div className="flex items-center justify-between pb-5">
          <h2 className="font-medium flex-grow">My Documents</h2>
          <p className="mr-12">Date Created</p>
          <Icon name="folder" size="3xl" color="gray" />
        </div>

        {userDocuments?.docs.map((doc) => {
          const { name, createdAtSec: createdAt } = doc.data() as documentType;

          const createdAtString = new Date(
            createdAt * 1000
          ).toLocaleDateString();

          return (
            <Document
              key={doc.id}
              id={doc.id}
              name={name}
              createdAt={createdAtString}
            />
          );
        })}
      </div>
    </section>
  );
}

export default DocumentsSection;
