import { BsPinAngleFill } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import moment from "moment"
const NoteCard = ({title, date, tags, content, isPinned, onPinNote, onEdit, onDelete}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
        <div className="flex items-center justify-between">
            <div >
                <h6 className="text-md font-medium">{title}</h6>
                <span className="text-sm text-green-700 font-semibold">{moment(date).format("Do MMM YYYY")}</span>
            </div>
            <BsPinAngleFill className={`icon-btn hover:text-blue-700 ${isPinned ? "text-blue-700" : "text-slate-300"}`} 
            onClick={onPinNote}
            />
        </div>
        <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-slate-600">{tags.map((item) => `#${item} `)}</div>
          <div className="flex items-center gap-2 ">
              <TbEdit className="icon-btn hover:text-slate-500 text-blue-600"
              onClick={onEdit}
              />
              <RiDeleteBin6Line className="icon-btn hover:text-slate-500 text-red-600"
              onClick={onDelete}
              />
          </div>
        </div>
    </div>
  )
}

export default NoteCard