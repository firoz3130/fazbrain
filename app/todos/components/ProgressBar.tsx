'use client';

export default function ProgressBar({ completed, total, progress }: { completed: number; total: number; progress: number }) {
    return (
        <div className="mb-6">
            <p className="text-gray-700 font-medium mb-1">
                Progress: {completed} of {total} tasks completed ({progress}%)
            </p>
            <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
}   