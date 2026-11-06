export default function ChatMessage({ from, children }) {
  if (from === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-lake text-white px-4 py-3 text-sm">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex">
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-sky text-forest px-4 py-3 text-sm">
        {children}
      </div>
    </div>
  );
}
