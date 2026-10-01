import TopperCard from "./TopperCard";

type Topper = {
  _id: string;
  imageUrl: string;
  year: number;
  publicId: string;
  order: number;
};

type TopperListProps = {
  toppers: Topper[];
  onDelete: () => void;
  onEdit: (topper: Topper) => void;
};

export default function TopperList({
  toppers,
  onDelete,
  onEdit,
}: TopperListProps) {
  if (toppers.length === 0) {
    return (
      <p className="mt-8 text-gray-500">
        No topper collages have been added yet.
      </p>
    );
  }

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {toppers.map((topper) => (
        <TopperCard
          key={topper._id}
          topper={topper}
          onDelete={onDelete}
          onEdit={() => onEdit(topper)}
        />
      ))}
    </div>
  );
}
