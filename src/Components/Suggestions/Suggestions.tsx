const Suggestions = () => {
  return (
    <div className="w-[320px] text-sm">
      {/* Current User Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/150?u=you"
            alt="your_username"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm">your_username</p>
            <p className="text-xs">Your Name</p>
          </div>
        </div>
        <button className="text-blue-500 text-xs font-semibold">Switch</button>
      </div>

      {/* Suggestions Header */}
      <div className="flex justify-between mb-4">
        <p className="text-sm font-semibold">Suggested for you</p>
        <button className="text-blue-500 text-xs font-medium">See All</button>
      </div>

      {/* Suggested Users List */}
      <ul className="space-y-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <li key={n} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={`https://i.pravatar.cc/150?u=${n}`}
                alt={`user_${n}`}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium">user_{n}</p>
                <p className="text-xs">Suggested for you</p>
              </div>
            </div>
            <button className="text-blue-500 text-xs font-semibold">Follow</button>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-6 text-[11px] leading-4">
        <p>About · Help · Press · API · Jobs · Privacy · Terms</p>
        <p>© 2025 FAKEGRAM</p>
      </div>
    </div>
  );
};

export default Suggestions;
