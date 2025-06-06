import React from "react";

const AppReviews: React.FC<{ project: any }> = () => (
  <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold text-slate-100 mb-4">
      Reviews & Comments (120)
    </h2>
    <div className="space-y-6">
      {/* Example review 1 */}
      <div className="border-b border-gray-700 pb-4">
        <div className="flex items-center mb-2">
          <img
            src="https://placehold.co/40x40/4A5568/E2E8F0?text=U1"
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold text-slate-200">TechExplorer</p>
            <div className="flex items-center text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className="icon h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-xs text-slate-400">(5.0)</span>
            </div>
          </div>
        </div>
        <p className="text-slate-300 text-sm">
          Fantastic project! Very well documented and easy to get started. The
          cloud integration works flawlessly. Highly recommended for anyone
          wanting to build a weather station.
        </p>
        <p className="text-xs text-slate-500 mt-2">Reviewed on: May 10, 2024</p>
      </div>
      {/* Example review 2 */}
      <div className="border-b border-gray-700 pb-4">
        <div className="flex items-center mb-2">
          <img
            src="https://placehold.co/40x40/4A5568/E2E8F0?text=U2"
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold text-slate-200">MakerJane</p>
            <div className="flex items-center text-yellow-400">
              {Array.from({ length: 4 }).map((_, i) => (
                <svg
                  key={i}
                  className="icon h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg
                className="icon h-4 w-4 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-xs text-slate-400">(4.0)</span>
            </div>
          </div>
        </div>
        <p className="text-slate-300 text-sm">
          Good base project. I had a little trouble with the SD card module
          initially, but the author was responsive on the forum. The web
          interface is a nice touch.
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Reviewed on: April 28, 2024
        </p>
      </div>
      {/* Review form (static, not functional) */}
      <div className="pt-6">
        <h3 className="text-xl font-semibold text-slate-100 mb-3">
          Leave a Review
        </h3>
        <form>
          <div className="mb-4">
            <label
              htmlFor="review-rating"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Your Rating
            </label>
            <div
              id="review-rating"
              className="flex space-x-1 text-yellow-400 text-2xl"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>&#9734;</span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="review-comment"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Your Comment
            </label>
            <textarea
              id="review-comment"
              name="review-comment"
              rows={4}
              className="w-full bg-gray-700 border-gray-600 text-slate-200 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2 text-sm"
              placeholder="Share your thoughts on this app..."
            ></textarea>
          </div>
          <button
            type="button"
            className="btn-primary px-6 py-2 rounded-lg text-sm font-semibold"
            disabled
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  </section>
);

export default AppReviews;
