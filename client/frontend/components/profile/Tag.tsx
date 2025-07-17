
type TagsProps = {
  name?: string | any | null;
  src?: string;
};

export function Tag({ name }: TagsProps) {
  if (!name) return null;

  return (
    <li className="cursor-pointer rounded-lg border border-gray-500 px-2 py-1 text-xs font-bold list-none">
      #{name}
    </li>
  );
}

export function SkillCapsule({ name }: TagsProps) {
  if (!name) return null;

  return (
    <li className="cursor-pointer rounded-lg border border-gray-500 px-2 py-1 text-xs font-bold list-none">
      {name}
    </li>
  );
}

export function LogoCapsule({ src }: TagsProps) {
  if (!src) return null;

  return (
    <li className="cursor-pointer rounded-lg border border-gray-500 px-2 py-1 text-xs font-bold list-none">
      <img className='h-6 object-contain' src={src}/>
    </li>
  );
}