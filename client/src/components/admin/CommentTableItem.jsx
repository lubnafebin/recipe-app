import { FaTrash } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
export const CommentTableItem = ({ comment, fetchComments }) => {
  const { recipe, createdAt, _id } = comment;
  const recipeDate = new Date(createdAt);
  fetchComments;
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
            <FaCircleCheck className="w-5 cursor-pointer hover:scale-110 transition-all text-primary" />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <FaTrash className="w-5 cursor-pointer hover:scale-110 transition-all text-primary" />
        </div>
      </td>
    </tr>
  );
};
