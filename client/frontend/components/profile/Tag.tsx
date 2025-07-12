
type TagsProps = {
  name: string | null;
};

export function Tag({ name }: TagsProps) {
  if (!name) return null;

  return (
    <li className="cursor-pointer rounded-lg border border-gray-500 px-2 py-1 text-xs font-bold">
      #{name}
    </li>
  );
}