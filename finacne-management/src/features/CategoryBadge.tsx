interface CategoryBadgeProps {
  category: any;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const status: string = category;
  const categoryBadgeSuccess =
    "flex w-[90px] h-8 gap-1 rounded-2xl border-[1.5px] p-3 border-success-600 bg-green-100";
  const categoryBadgeFail =
    "flex w-[105px] h-8 gap-1 rounded-2xl border-[1.5px] p-3 border-red-600 bg-red-100";

  return (
    <div
      className={
        status === "Matched" ? categoryBadgeSuccess : categoryBadgeFail
      }
    >
      <div
        className={
          status === "Matched"
            ? "size-2 rounded-full bg-green-600"
            : "size-2 rounded-full bg-red-600"
        }
      >
        <span
          className={
            status === "Matched"
              ? "flex w-full ml-3 -mt-1.5 text-[12px] font-medium text-success-700"
              : "flex w-full ml-3 -mt-1.5 text-[12px] font-medium text-red-700"
          }
        >
          {category}
        </span>
      </div>
    </div>
  );
}
