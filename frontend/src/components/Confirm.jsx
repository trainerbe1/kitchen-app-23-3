export default function Confirm({
    cancelHandler,
    confirmHandler,
    title
}) {
    return(
        <div className="p-5">
            <div className="text-white font-bold mb-4 text-2xl">
                {title}
            </div>

            <div className="mt-5">
                <button onClick={cancelHandler} className="mr-4 rounded border px-2 py-1 text-slate-200">Cancel</button>
                <button onClick={confirmHandler} className="bg-blue-600 mr-4 rounded border px-2 py-1 text-slate-200">Yes</button>
            </div>
        </div>
    )
}