import { useEffect, useState } from "react";
import { CommentTableItem } from "../../components/admin/CommentTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

export const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const { axios } = useAppContext();
  
  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className="flex-1 pt-5 px-3 sm:px-5 sm:pl-16 sm:pt-12 bg-blue-50/50">
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-3xl gap-4 sm:gap-0">
        <h1>Comments</h1>
        <div className="flex gap-2 sm:gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-custom-sm border rounded-full px-3 sm:px-4 py-1 cursor-pointer text-[10px] sm:text-xs ${
              filter === "Approved" ? "text-primary" : "text-gray-700"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-custom-sm border rounded-full px-3 sm:px-4 py-1 cursor-pointer text-[10px] sm:text-xs ${
              filter === "Not Approved" ? "text-primary" : "text-gray-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        <table className="w-full text-[11px] sm:text-sm text-gray-500">
          <thead className="text-[10px] sm:text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 sm:px-6 py-3">
                Recipe Title&Comments
              </th>
              <th scope="col" className="hidden sm:table-cell px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-2 sm:px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) => {
                if (filter === "Approved") return comment.isApproved === true;
                return comment.isApproved === false;
              })
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
