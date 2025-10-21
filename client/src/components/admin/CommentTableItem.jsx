import { FaTrash } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
export const CommentTableItem = ({ comment, fetchComments }) => {
  const { recipe, createdAt, _id } = comment;
  const recipeDate = new Date(createdAt);
  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this");
      if (!confirm) return;
      const { data } = await axios.post("/api/admin/delete-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <tr className="order-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Recipe</b>: {recipe.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b>: {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b>: {comment.content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {recipeDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <FaCircleCheck
              onClick={approveComment}
              className="w-5 cursor-pointer hover:scale-110 transition-all text-primary"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <FaTrash
            onClick={deleteComment}
            className="w-5 cursor-pointer hover:scale-110 transition-all text-primary"
          />
        </div>
      </td>
    </tr>
  );
};
