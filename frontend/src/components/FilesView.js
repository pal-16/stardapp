import { DeleteIcon } from "./deleteIcon";
import { EditIcon } from "./editIcon";
import { ViewIcon } from "./viewIcon";

const FilesView = (props) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-start justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-3xl leading-normal">
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-3xl font-light">
                {props.photos.map((image, i) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100" key={image.uri}>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{image.filename}</span>
                      </div>
                    </td>
                    <td className="p-0 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-8 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <ViewIcon />
                        </div>
                        <div className="w-8 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <EditIcon />
                        </div>
                        <div className="w-8 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <DeleteIcon />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesView;
