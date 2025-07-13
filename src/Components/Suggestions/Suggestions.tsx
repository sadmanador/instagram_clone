
const Suggestions = () => {
    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Suggestions for you</h2>
            <ul className="space-y-4">
                <li className="flex items-center justify-between">
                    <span>User1</span>
                    <button className="btn btn-primary btn-sm">Follow</button>
                </li>
                <li className="flex items-center justify-between">
                    <span>User2</span>
                    <button className="btn btn-primary btn-sm">Follow</button>
                </li>
                <li className="flex items-center justify-between">
                    <span>User3</span>
                    <button className="btn btn-primary btn-sm">Follow</button>
                </li>
            </ul>
        </div>
    );
};

export default Suggestions;