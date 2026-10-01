import ManagementCard from "./ManagementCard";

type Management = {
  _id: string;
  name: string;
  designation: string;
  imageUrl: string;
  publicId: string;
  order: number;
};

type ManagementListProps = {
  management: Management[];
  onDelete: () => void;
  onEdit: (member: Management)=> void;
};



export default function ManagementList({
  management,
  onDelete,
  onEdit,
}: ManagementListProps) {
  if (management.length === 0) {
    return (
      <p className="mt-8 text-gray-500">
        No management members have been added yet.
      </p>
    );
  }

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {management.map((member) => (
        <ManagementCard
          key={member._id}
          management={member}
          onDelete={onDelete}
          onEdit={() => onEdit(member)}
        />
      ))}
    </div>
  );
}