type Props = {
  title: string;
  currTab: string;
  switchTab: () => void;
  defaultChecked?: boolean;
};
export default function Switch({ title, currTab, switchTab }: Props) {
  // ---- HOOKS
  // ---- FUNCTIONS
  const isActive =
    currTab === title
      ? "bg-lime-500 text-lime-50"
      : "bg-gray-200 text-gray-400";
  // ---- JSX
  return (
    <button
      role={"button"}
      className={`${isActive} cursor-pointer p-3 rounded-sm flex-1`}
      onClick={switchTab}
    >
      {title}
    </button>
  );
}
